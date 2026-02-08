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
import { TextField, IconButton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells = [
    { id: 'supplier_name', label: 'دکاندار' },
    { id: 'created_at', label: 'تاریخ' },
  { id: 'quantity_ordered', label: 'مقدار/تعداد' },
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

export default function SupplierRefundTable({ rows }) {
    //console.log(rows[0])
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('purchase_order_id'); // ✅ Correct
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    supplier_name: '',
    created_at: '',         // ✅ Correct
    quantity_ordered: '',   // ✅ Correct
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
    return (rows || []) // Ensure `rows` is always an array
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
         acc.quantity += Number(row.quantity_ordered || 0); 
         acc.total += Number((row.refund_amount ) || 0);
         return acc;
       },
       { quantity: 0, total: 0 }
     );
   }, [filteredRows]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-labelledby="tableTitle" size={'medium'}>
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
              {/* <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TextField
                      variant="standard"
                      size="small"
                      fullWidth
                      value={filters[headCell.id]}
                      onChange={(event) => handleFilterChange(event, headCell.id)}
                      placeholder={`Search ${headCell.label}`}
                    />
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={index}>
                <TableCell>{row.supplier_name}</TableCell>
                <TableCell>{row.created_at}</TableCell> {/* Adjust field name */}
                <TableCell>{`${row?.quantity_ordered}`}</TableCell> {/* Adjust field name */}
                <TableCell>{`${row?.refund_amount / row?.quantity_ordered}`}</TableCell> {/* Adjust field name */}
                <TableCell>{`${row?.refund_amount}`}</TableCell> {/* Adjust field name */}
                </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>
                ټوټل
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{parseFloat(totals.quantity)}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{totals.total.toLocaleString()}</TableCell>
            </TableRow>
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10,  25]}
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
