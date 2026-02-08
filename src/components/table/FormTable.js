import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';


export default function FormTable(props) {
  const theme = useTheme();
  const style = theme.palette;
  const tableStyle = theme.palette.Main.tableStyle;
  // //console.log(style.primary.light)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow  sx={{background: style.primary.light}} id="thead">
            {props.data &&
              Object.keys(props.data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data &&
            props.data.map((row, ind) => (
                <TableRow key={ind}>
                    <TableCell colSpan={11}  sx={ tableStyle }>
                        <form style={{width:'100%'}}>
                          <Table>
                            <TableBody id="multiRows">
                            <TableRow>
                              {Object.values(row).map((value, index) => (
                              <TableCell key={index}>{value}</TableCell>
                              ))}
                              </TableRow>
                              </TableBody>
                            </Table>
                        </form>

                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
