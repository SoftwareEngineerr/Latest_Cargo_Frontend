import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  // { id: 'transaction_id', label: 'Invoice ID' },
  { id: 'customer_name', label: 'مشتري' },
  { id: 'created_at', label: 'تاریخ' },
  { id: 'quantity_sold', label: 'تعداد/مقدار' },
  { id: 'selling_price', label: 'قیمت' },
  { id: 'total_sale_amount', label: 'ټوټل' },
];

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

export default function SaleInvoiceTable({ rows }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('transaction_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    // transaction_id: '',
    customer_name: '',
    created_at: '',
    total_sale_amount: '',
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event, column) => {
    setFilters((prev) => ({ ...prev, [column]: event.target.value }));
  };

  const filteredRows = useMemo(() => {
    return (rows || [])
      .filter((row) =>
        Object.keys(filters).every((key) =>
          filters[key] ? row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase()) : true
        )
      )
      .sort(getComparator(order, orderBy));
  }, [rows, filters, order, orderBy]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totals = useMemo(() => {
    return filteredRows.reduce(
      (acc, row) => {
        acc.quantity += Number(row.quantity_sold || 0);
        acc.price += Number(row.selling_price || 0);
        acc.total += Number(row.total_sale_amount || 0);
        return acc;
      },
      { quantity: 0, price: 0, total: 0 }
    );
  }, [filteredRows]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 450   }} aria-labelledby="tableTitle" size={'medium'}>
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
              </TableRow> 
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={index}>
                  {/* <TableCell>{row.transaction_id}</TableCell> */}
                  <TableCell>{row.customer_name}</TableCell>
                  <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                  <TableCell>{`${row.quantity_sold}`}  </TableCell>
                  <TableCell>{` ${row.selling_price}`}</TableCell>
                  <TableCell>{` ${row.total_sale_amount}`}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>
                  ټوټل
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{parseFloat(totals.quantity).toFixed(2)}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{totals.total.toLocaleString()}</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
