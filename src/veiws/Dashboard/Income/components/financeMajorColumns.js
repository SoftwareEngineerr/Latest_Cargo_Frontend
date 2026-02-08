import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography
} from '@mui/material';

const FinanceMajorColumns = ({ data }) => {
  // //console.log(data)

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom style={{direction:'rtl'}}>
عمومي کتنه
      </Typography>

      <TableContainer>
        <Table className='majorColumns'> 

          <TableBody>
            {/* {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => ( */}
              <TableRow key={data.product_id }>
                <TableCell>{data.Investment || 'N/A'}</TableCell>
                <TableCell>ټوله پانګونه</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.total_purchases || 'N/A'}</TableCell>
                <TableCell>ټوله خرید</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.total_sales || 'N/A'}</TableCell>
                <TableCell>ټوله فروش/خرڅلاو</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.RemainigProdcutsCost || 'N/A'}</TableCell>
                <TableCell>پاته جنس /ګدام</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.Rroznamcha || 'N/A'}</TableCell>
                <TableCell>موجود دخل</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.Expense || 'N/A'}</TableCell>
                <TableCell>ټوله مصرف (معاشیات اونورو سره)</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.totalGivenLoan * -1 || 'N/A'}</TableCell>
                <TableCell >ټوله پر مشتریانو پاته پور</TableCell>  
              </TableRow>
              <TableRow>
                <TableCell>{data.totalTakenLoan * -1 || 'N/A'}</TableCell>
                <TableCell>ټوله پر مونږ پاته پور</TableCell>  
              </TableRow>
            {/* ))} */}

            {/* Total Row */}
            
          </TableBody>
        </Table>
      </TableContainer> 
    </Paper>
  );
};

export default FinanceMajorColumns;
