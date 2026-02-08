import React, { useState, useMemo } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, TableSortLabel, TextField, Collapse, IconButton, Typography, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, InputAdornment,
  TableFooter
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const headCells = [
  { id: 'customer_id', label: 'شمیره' },
  { id: 'first_name', label: 'نوم' },
  { id: 'phone_number', label: 'د تلیفون شمیره' },
  { id: 'balance', label: 'باقي پيسې' },
];

export default function CustomerTransactionTable({ rows, setRefreshTrigger }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [printOpen, setPrintOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const api = useSelector((state) => state.Api);
  
  const [filters, setFilters] = useState({
    customer_id: '',
    first_name: '',
    phone_number: '',
    balance: '',
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Calculate balance for each customer and totals
  const { rowsWithBalance, totalReceivable } = useMemo(() => {
    let total = 0;
    const processedRows = rows.map(row => {
      const totalAmountIn = row.customer_bills.reduce((sum, bill) => sum + (bill.amount_in || 0), 0);
      const totalAmountOut = row.customer_bills.reduce((sum, bill) => sum + (bill.amount_out || 0), 0);
      const balance = totalAmountOut - totalAmountIn;
      
      // Only add to total if customer owes us (balance > 0)
      if (balance > 0) {
        total += balance;
      }
      
      return {
        ...row,
        balance,
        totalAmountIn,
        totalAmountOut,
      };
    });
    
    return { rowsWithBalance: processedRows, totalReceivable: total };
  }, [rows]);

  function descendingComparator(a, b, orderBy) {
    if (orderBy === 'balance') {
      return (b.balance || 0) - (a.balance || 0);
    }
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event, column) => {
    setFilters((prev) => ({ ...prev, [column]: event.target.value }));
  };

  // const toggleRowExpand = (customerId) => {
  //   setExpandedRows(prev => 
  //     prev.includes(customerId) 
  //       ? prev.filter(id => id !== customerId) 
  //       : [...prev, customerId]
  //   );
  // };
const toggleRowExpand = (customerId) => {
  setExpandedRowId(prev => (prev === customerId ? null : customerId));
};

  const filteredRows = useMemo(() => {
    return rowsWithBalance
      .filter((row) =>
        Object.keys(filters).every((key) => {
          if (key === 'balance') {
            if (!filters[key]) return true;
            const balanceStr = row.balance.toString();
            return balanceStr.includes(filters[key]);
          }
          return row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        })
      )
      .sort(getComparator(order, orderBy));
  }, [rowsWithBalance, filters, order, orderBy]);

  const handleRowClick = (transaction) => {
    setPrintOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleBalanceClick = (customer) => {
    if (customer.balance > 0) {
      setSelectedCustomer(customer);
      setPaymentAmount('');
      setPaymentDialogOpen(true);
    }
  };

  const handlePaymentSubmit = async () => {
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
    const payload = {
      customer_id: selectedCustomer.customer_id,
      customerName: selectedCustomer.first_name,
      transaction_id: selectedCustomer?.customer_bills[0]?.transaction_id || 0,
      amount: paymentAmount,
      payment_method: 'CASH_ADJUST'
    }
    //console.log(payload)
    // return false
    try {
      const response = await axios.post(api.customerPayLoan, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (response.status === 200) {
        setRefreshTrigger(prev => !prev); // This should trigger parent's useEffect
        setPaymentDialogOpen(false);
        setPaymentAmount('');
        setSelectedCustomer(null);
      }
    } catch (err) {
      console.error('Error processing payment:', err);
    }
  };
  

  const printBill = () => {
    setPrintOpen(false);
  };

  // Format balance with color coding
  const renderBalance = (balance, customer) => {
    if (balance > 0) {
      return (
        <Chip 
          label={`${balance.toFixed(2)} (ته اړیږي)`} 
          color="error" 
          onClick={() => handleBalanceClick(customer)}
          sx={{ cursor: 'pointer' }}
        />
      );
    } else if (balance < 0) {
      return <Chip label={`${Math.abs(balance)} (موږ اړ یو)`} color="success" />;
    }
    return <Chip label="صفر" color="default" />;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
                <TableCell />
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell />
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TextField
                      variant="standard"
                      size="small"
                      fullWidth
                      value={filters[headCell.id]}
                      onChange={(event) => handleFilterChange(event, headCell.id)}
                      placeholder={`لټون ${headCell.label}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <React.Fragment key={row.customer_id}>
                  <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRowExpand(row.customer_id)}
                      >
                        {expandedRowId === row.customer_id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}

                      </IconButton>
                    </TableCell>
                    <TableCell>{row.customer_id}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.phone_number}</TableCell>
                    <TableCell>
                      {renderBalance(row.balance, row)}
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={expandedRowId === row.customer_id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          {/* <Typography variant="subtitle1" textAlign={'right'} gutterBottom>
                            د حساب لنډیز: 
                            <Box component="span" sx={{ ml: 2 }}>
                              {renderBalance(row.balance, row)}
                            </Box>
                          </Typography> */}
                          
                          {/* Sales Transactions Section */}
                          <Typography variant="h6" gutterBottom textAlign={'right'} component="div">
                            د خرڅلاو تاریخچه
                          </Typography>
                          {/* <Table size="small" aria-label="sales-transactions">
                            <TableHead>
                              <TableRow>
                                <TableCell>نمبر</TableCell>
                                <TableCell>نیټه</TableCell>
                                <TableCell>مبلغ</TableCell>
                                <TableCell>د پرداخت ډول</TableCell>
                                <TableCell>حالت</TableCell>
                                <TableCell>کړنې</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.sales_transactions.map((transaction) => (
                                <TableRow key={transaction.transaction_id}>
                                  <TableCell>{transaction.transaction_id}</TableCell>
                                  <TableCell>{new Date(transaction.transaction_date).toLocaleDateString()}</TableCell>
                                  <TableCell>{transaction.total_amount}</TableCell>
                                  <TableCell>{transaction.payment_method}</TableCell>
                                  <TableCell>{transaction.payment_status}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => handleRowClick(transaction)}>
                                      <span>چاپ</span>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table> */}

                          {/* Customer Bills Section */}
                          {/* <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3 }}>
                            د پرداخت تاریخچه
                          </Typography> */}
                          <Table size="small" aria-label="customer-bills" style={{direction:'rtl'}}>
  <TableHead>
    <TableRow>
      <TableCell>نمبر</TableCell>
      <TableCell>نیټه</TableCell>
      <TableCell>د پرداخت ډول</TableCell>
      <TableCell>مبلغ دننه</TableCell>
      <TableCell>مبلغ بهر</TableCell>
      <TableCell>بیلانس</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {row.customer_bills.map((bill, index, bills) => {
      // Convert amounts to numbers safely
      const amountIn = Number(bill.amount_in) || 0;
      const amountOut = Number(bill.amount_out) || 0;
      
      // Calculate running balance
      const balance = bills.slice(0, index + 1).reduce((acc, curr) => {
        const currIn = Number(curr.amount_in) || 0;
        const currOut = Number(curr.amount_out) || 0;
        return acc + currOut - currIn;
      }, 0);

      return (
        <TableRow key={bill.bill_id}>
          <TableCell> {bill.bill_id} </TableCell>
          <TableCell>{new Date(bill.created_at).toLocaleDateString()}</TableCell>
          <TableCell>{bill.payment_method === 'LOAN' ? 'بوربل' : bill.payment_method === 'CASH' ? 'نغد بل' : bill.payment_method === 'LOAN_ADJUST' ? 'واپسی' : bill.payment_method === 'CASH_ADJUST' ? 'نغد' : 'نور'} </TableCell>
          <TableCell>{amountIn.toFixed(2)}</TableCell>
          <TableCell>{amountOut.toFixed(2)}</TableCell>
          <TableCell>{balance.toFixed(2)}</TableCell>
        </TableRow>
      );
    })}
    
    {/* Total Row */}
    <TableRow style={{fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>
      <TableCell colSpan={3}>مجموعه</TableCell>
      <TableCell>
        {row.customer_bills.reduce((sum, bill) => sum + (Number(bill.amount_in) || 0), 0).toFixed(2)}
      </TableCell>
      <TableCell>
        {row.customer_bills.reduce((sum, bill) => sum + (Number(bill.amount_out) || 0), 0).toFixed(2)}
      </TableCell>
      <TableCell>
        {row.customer_bills.reduce((acc, curr) => {
          const currIn = Number(curr.amount_in) || 0;
          const currOut = Number(curr.amount_out) || 0;
          return acc + currOut - currIn;
        }, 0).toFixed(2)}
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>

            {/* Totals Footer */}
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    ټول د رسیدو وړ پیسې:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`افغانی ${totalReceivable.toFixed(2)}`} 
                    color="error" 
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
 

      {/* Payment Collection Dialog */}
      <Dialog fullWidth   sx={{
    maxWidth: '400px', // Custom width
    margin: 'auto',    // Ensures the Dialog stays centered
  }}open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)}>
        <DialogTitle>د پیسو راټولول</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedCustomer.first_name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                د تلیفون: {selectedCustomer.phone_number}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                ټول د رسیدو وړ پیسې: <Chip label={selectedCustomer?.balance?.toFixed(2)} color="error" />
              </Typography>

              <TextField
                fullWidth
                label="د پیسو اندازه"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">AFN</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: selectedCustomer.balance,
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>بندول</Button>
          <Button 
            onClick={handlePaymentSubmit}
            variant="contained"
            color="primary"
            disabled={!paymentAmount || paymentAmount <= 0 || paymentAmount > selectedCustomer?.balance}
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}