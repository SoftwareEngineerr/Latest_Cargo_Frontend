import React, { useState, useMemo } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, TableSortLabel, TextField, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import  PrintBillDialog  from "../../sale/component/printBillDialog";
// import  PrintBillDialog  from "../../sale/component/printBillDialogQareeb";

const headCells = [
  { id: 'transaction_id', label: 'شمیره' },
  { id: 'customer_name', label: 'نوم' },
  { id: 'customer_contact', label: 'د تلیفون شمیره' },
  { id: 'discount_amount', label: 'تخفبف' },
  { id: 'total_amount', label: 'ټوټل' },
];

export default function SupplierTable({ rows }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('transaction_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const [printOpen, setPrintOpen] = useState(false); // To keep the original product data
  const [filters, setFilters] = useState({
    transaction_id: '',
    customer_name: '',
    customer_contact: '',
    discount_amount: '',
    total_amount: '',
  });

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Sorting & Filtering Logic
  const handleRequestSort = (event, property) => {
    //console.log(printOpen)
    // setPrintOpen(true)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event, column) => {
    setFilters((prev) => ({ ...prev, [column]: event.target.value }));
  };

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) =>
        Object.keys(filters).every((key) =>
          row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        )
      )
      .sort((a, b) =>
        order === 'asc'
          ? a[orderBy] < b[orderBy] ? -1 : 1
          : a[orderBy] > b[orderBy] ? -1 : 1
      );
  }, [rows, filters, order, orderBy]);

  // Handle Click on Row
  const handleRowClick = (transaction) => {
    //console.log(transaction)
    setPrintOpen(true)
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const printBill = () => {
    setPrintOpen(false)
    
}
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
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
                 {/* <TableCell>کړنې</TableCell> */}
              </TableRow>
              {/* Search Input Row */}
              <TableRow>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow 
                  hover 
                  key={row.transaction_id} 
                  onClick={() => handleRowClick(row)} 
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.transaction_id}</TableCell>
                  <TableCell>{row.customer_name}</TableCell>
                  <TableCell>{row.customer_contact}</TableCell>
                  <TableCell>{row.discount_amount}</TableCell>
                  <TableCell
                    style={{ color: row.payment_method === 'LOAN' ? 'red' : 'inherit' }}
                  >
                    {row.payment_method === 'LOAN'
                      ? `-${row.total_amount} `
                      : `${row.total_amount} `}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
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
      <PrintBillDialog  open={printOpen} onClose={printBill} paymentData={selectedTransaction} />
    
      {/* Print Dialog */}
      {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>د رسید چاپ</DialogTitle>
        <DialogContent>
          {selectedTransaction && <PrintBillDialog  open={printOpen} onClose={printBill} paymentData={selectedTransaction} />}
        </DialogContent>
      </Dialog> */}
    </Box>
  );
}
