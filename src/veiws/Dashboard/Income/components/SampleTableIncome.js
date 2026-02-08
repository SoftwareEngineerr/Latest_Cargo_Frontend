import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Converts one row from the API to table format
function mapApiItemToRow(item) {
  const others =
    item.Others && typeof item.Others === 'object'
      ? Object.entries(item.Others).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return {
              label: key,
              description: value.Description || '',
              descriptionPashto: value.DescriptionPashto || '',
              amount: parseInt(value.payment) || 0,
            };
          } else {
            return {
              label: key,
              description: '',
              descriptionPashto: '',
              amount: parseInt(value) || 0,
            };
          }
        })
      : [];

  return {
    name: item.Description,
    pName: item.DescriptionPashto,
    calories: parseInt(item.Payment) || 0,
    price: 1,
    history: others.length > 0 ? others : [],
  };
}



function Row(props) {
  // //console.log(props)
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // Only make collapsible for "Fees Income" row
  const isCollapsible = row.name === 'Fees' || row.name === 'Expense';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {isCollapsible && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name} <span style={{fontSize:'16px'}}>{row.pName}</span>
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
      </TableRow>
      {isCollapsible && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                
                <Table size="small" style={{marginLeft: '50%', width: '50%'}} aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell></TableCell> */}
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                      {/* <TableCell align="right">Total price ($)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow?.label}>
                      <TableCell>
                        {historyRow.label}
                        {/* {historyRow.description && ` — ${historyRow.description}`} */}
                        <span style={{fontSize:'16px'}}>{historyRow.descriptionPashto && ` (${historyRow.descriptionPashto})`}</span>
                      </TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};


// Main component expects `data` prop
export default function CollapsibleTable({ data }) {
  // //console.log(data)
  if (!data) {
    return <div>No data available</div>;
  }

  const rows = data?.map(mapApiItemToRow);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Description <span style={{fontSize:'16px'}}> تفصیل</span></TableCell>
            <TableCell align="right">Payment<span style={{fontSize:'16px'}}>  تادیه</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
