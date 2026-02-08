import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';


export default function CustomTable(props) {
  //console.log(props.data)
  const theme = useTheme();
  const style = theme.palette;
  // //console.log(style.sidemenutext.secondary)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 515 }} aria-label="caption table">
        <TableHead>
          <TableRow  sx={{background: style.primary.main}} id="thead">
            {props.data &&
              Object.keys(props.data[0]).map((key) => (
                <TableCell key={key} sx={{color:style.sidemenutext.color}}>{key == 'Month'? 'Month' : key == 'roll'? 'Roll Num.' 
                  :key == 'Srn'? 'Srn.' : key == 'Date'? 'Date' : key == 'Fees'? 'Fees': key == 'Discount'? 'Discount'
                  :key == 'StudentSrn'? 'Roll Number'
                  :key == 'StartDate'? 'Start Date'
                  :key == 'Comments'? 'Comments' 
                  :key == 'paidFees'? 'Paid Fees' //paidFees
                  :key == 'Description'? 'Description':key == 'Dues'? 'Dues':key == 'Paid Amount'? 'Paid Amount'
                  : key == 'NamePashto'? 'Name': key == 'FNamePashto'? 'Father Name': key == 'TellNo1'? 'Mobile'
                  : key == 'Ammount'? 'Amount' :null}
                </TableCell>
                // <TableCell key={key} sx={{color:style.sidemenutext.color}}>{key }</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data &&
            props.data.map((row, ind) => (
              row.Description == 'Total'?
              <TableRow key={ind}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}><b>{value}</b></TableCell>
                ))}
              </TableRow>
              :
              <TableRow key={ind}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
