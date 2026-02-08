import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography
} from '@mui/material';

const MostSoldItemsTable = ({ data }) => {
    //console.log(data)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Most Sold Items
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              {/* <TableCell>Product Code</TableCell> */}
              {/* <TableCell>Brand</TableCell> */}
              {/* <TableCell>Category</TableCell> */}
              <TableCell align="right">Units Sold</TableCell>
              <TableCell align="right">Avg. Selling Price</TableCell>
              <TableCell align="right">Total Revenue</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.product_name || index}>
                {/* <TableCell>{item.product_name}</TableCell> */}
                {/* <TableCell>{item.product_code}</TableCell> */}
                {/* <TableCell>{item.brand_name}</TableCell> */}
                <TableCell>{item.category_name}</TableCell>
                <TableCell align="right">{item.total_units_sold}</TableCell>
                <TableCell align="right">{item.average_selling_price.toFixed(2)}</TableCell>
                <TableCell align="right">{item.total_revenue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
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

export default MostSoldItemsTable;
