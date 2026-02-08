import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography
} from '@mui/material';

const ProductPurchasedAverageCost = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate totals
  const totalQuantity = data?.reduce((sum, item) => sum + (item.quantity_left || 0), 0);
  const totalValue = data?.reduce((sum, item) => sum + (item.total_value || 0), 0);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom style={{direction:'rtl'}}>
        ټوله پاته جنس ، مقدار/تعداد ، اوسط اوټوټل 
      </Typography>

      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>جنس</TableCell> 
              <TableCell align="right">اوسط  </TableCell>
              <TableCell align="right">پاته تعداد/مقدار</TableCell>
              <TableCell align="right">ټوټل</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.product_id || index}>
                <TableCell>{item.product_name || 'N/A'}</TableCell>
                <TableCell align="right">{parseFloat(item.latest_average_price)?.toFixed(2)}</TableCell>
                <TableCell align="right">{parseFloat(item.quantity_left)?.toFixed(2)}</TableCell>
                <TableCell align="right">{parseFloat(item.total_value)?.toFixed(2)}</TableCell>
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              <TableCell><strong>دټولو جنسو ټوټل </strong></TableCell>
              <TableCell align="right">—</TableCell> {/* Leave average blank or customize if needed */}
              <TableCell align="right">
               — {/* <strong>{totalQuantity?.toFixed(2)}</strong> */}
                </TableCell>
              <TableCell align="right"><strong>{parseFloat(totalValue)?.toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductPurchasedAverageCost;
