import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography
} from '@mui/material';

const ProductSoldItemsList = ({ data }) => {
  // //console.log(data)
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
  const totalCost = data?.reduce((sum, item) => sum + (item.total_price || 0), 0);
  const totalLoan = data?.reduce((sum, item) => sum + (item.loan_amount || 0), 0);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom style={{direction:'rtl'}}>
        ارډران
      </Typography>

      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>تاریخ</TableCell> 
              <TableCell align="right">عرضه کوونکی</TableCell>
              <TableCell align="right">بل</TableCell> 
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.product_id || index}>
                <TableCell>{item?.purchase_order_id} بل شمیره <br/>{item.created_at || 'N/A'} </TableCell>
                <TableCell>{item.created_at || 'N/A'}</TableCell>
                <TableCell>
                  {item.supplier_name}
                  {item.loan_amount > 0 && (
                    <>
                      <br />
                      <span style={{color:'red'}}>{item.loan_amount} پور</span>
                    </>
                  )}
                </TableCell>
                <TableCell align="right">{parseFloat(item.total_price)?.toFixed(2)}</TableCell>
                {/* <TableCell align="right">{item.loan_amount?.toFixed(2)}</TableCell> */}
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              <TableCell><strong>دټولو بلانو ټوټل </strong></TableCell>
              <TableCell align="right">—</TableCell> {/* Leave average blank or customize if needed */}
              <TableCell align="right">—</TableCell> {/* Leave average blank or customize if needed */}
              
              <TableCell align="right"><strong>{parseFloat(totalCost)?.toFixed(2)}</strong></TableCell>
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

export default ProductSoldItemsList;
