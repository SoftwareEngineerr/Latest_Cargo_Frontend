import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import JsBarcode from 'jsbarcode';  // Import JsBarcode library
import Button from '@mui/material/Button';
import BarcodePrint from './BarcodePrint';
// import './../barcode.css'
const headCells = [
  { id: 'imagePath', label: 'نوم' },
  // { id: 'product_name', label: 'نوم' },
  { id: 'product_code', label: ' فارمول' },
  { id: 'batchnumber', label: 'بیچ نمبر' },
  { id: 'barcode', label: 'بارکوډ' },
];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  //console.log(order, orderBy)
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function SupplierTable({ rows, onDelete, updateBarcode, generateBarcode, deleteBarcode, printBarcode }) {
  //console.log(rows)
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('product_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const api = useSelector((state) => state.Api);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const barcodeRefs = useRef({});

  const [filters, setFilters] = useState({
    imagePath: '',
    // product_name: '',
    product_code: '',
    batchnumber: '',
    barcode: '',
  });

  const [editingBarcode, setEditingBarcode] = useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle Filtering
  const handleFilterChange = (event, column) => {
    setFilters((prev) => ({ ...prev, [column]: event.target.value }));
  };

  // Filter and Sort Rows
  const filteredRows = useMemo(() => {
    return rows.sort(getComparator(order, orderBy));

  }, [rows, filters, order, orderBy]);

  // Handle Pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleUpdateBarcode = (productId, barcode) => {
    //console.log(barcode)
    if (updateBarcode) {
      updateBarcode(productId, barcode);
    }
  };

  const printingBarcode = (barcode, productId) => {
    setSelectedBarcode(barcode);
    setSelectedProduct(productId);
    //console.log(barcode, productId)
  }
  const handleGenerateBarcode = (productId) => {
    //console.log(generateBarcode)
    if (generateBarcode) {
      const generatedBarcode = Math.floor(Math.random() * 1000000000);  // Random 9-digit number
      generateBarcode(productId, generatedBarcode);
      // //console.log(generatedBarcode)
      // setEditingBarcode({ ...editingBarcode, [productId]: null });
    }
  };

  const handleDeleteBarcode = (productId) => {
    if (deleteBarcode) {
      deleteBarcode(productId);
    }
  };
  // Initialize JsBarcode for each product barcode
  useEffect(() => {
    //console.log(filteredRows)
    // Loop through each row and render barcode if product_id and barcode are present
    rows.forEach((row) => {
      // Ensure the barcode and product_id exist and target the correct element
      const barcodeElement = document.getElementById(`barcode-${row.barcode}`);
      if (row.barcode && barcodeElement) {
        // Pass the barcode value explicitly as a string or number
        JsBarcode(barcodeElement, row.barcode, {
          format: 'CODE128',
          width: 2,
          height: 40,
          displayValue: true, // Display the value below the barcode
        });
      }
    });
  }, [rows, page, updateBarcode]); // Run this whenever the rows change


  const handlePrintBarcode = (productId) => {
    const content = barcodeRefs.current[productId]?.outerHTML;
  
    if (content) {
      const printWindow = window.open('', '', 'width=400,height=300');
      printWindow.document.write(`
        <html>
          <head><title>Print Barcode</title></head>
          <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } else {
      console.error('No content to print.');
    }
  };
  

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
                <TableCell>کړنې</TableCell>
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
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    {row.product_id}){row.product_name}<br />
                    {row.imagePath ? (
                      <img src={`${api.images}${row.imagePath}`} alt="product" style={{ width: '50px', height: '50px' }} />
                    ) : (
                      'No Image'
                    )}
                    <br />

                  </TableCell>
                  {/* <TableCell>{row.product_name}</TableCell> */}
                  <TableCell>{row.product_code}</TableCell>
                  <TableCell>{row.batchnumber}</TableCell>

                  <TableCell>
                    {row.barcode ? (
                      <>
                        {/* Display Barcode as SVG */}
                        <svg
                          ref={(el) => (barcodeRefs.current[row.product_id] = el)}
                          id={`barcode-${row.product_id}`}
                          style={{ height: '50px', width: 'auto' }}
                        ></svg>
                      </>
                    ) : (
                      <TextField
                        variant="standard"
                        size="small"
                        value={editingBarcode[row.product_id] || ''}
                        onChange={(e) => setEditingBarcode({ ...editingBarcode, [row.product_id]: e.target.value })}
                        placeholder="Enter barcode"
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    {row.barcode ?
                      <>
                        <Button onClick={() => handleDeleteBarcode(row.product_id)} variant="contained">Delete Barcode</Button>
                        {/* <Button onClick={() => printingBarcode(row.barcode, row.product_id)} variant="contained">Print Barcode</Button> */}
                        <Button onClick={() => handlePrintBarcode(row.product_id)} variant="contained">Print Barcode</Button>
                      </>

                      :
                      <>

                        <Button onClick={() => handleUpdateBarcode(row.product_id, editingBarcode[row.product_id])} variant="contained">Update Barcode</Button>

                        <br />

                        <Button onClick={() => handleGenerateBarcode(row.product_id)} variant="contained">Generate Barcode</Button>


                      </>

                    }

                  </TableCell>
                </TableRow>
              ))}
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
        {selectedBarcode && (
          <BarcodePrint
            barcode={selectedBarcode}
            productName={selectedProduct}
            onClose={() => setSelectedBarcode(null)}
          />
        )}
      </Paper>
    </Box>
  );
}
