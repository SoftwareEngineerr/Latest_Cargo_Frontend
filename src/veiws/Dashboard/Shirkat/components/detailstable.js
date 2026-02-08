import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
  Chip,
  TableFooter,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slide
} from "@mui/material";
import { formatAfghanDate } from "../../../../components/Date/afghandate";
import { CustomBtn } from "../../../../components/button/button";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import UpdateState from "../../../../redux/reducer/state/state";
import { UpdateOwnState } from "../../../../redux/actions/state/state";
import { Input } from "../../../../components/input/input";
import AllPdf from "./Allpdf";
import PaymentPdf from "./paymentpdf";

export default function ShirkatRecords({ data , records }) {
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(25);
const [trackFilter, setTrackFilter] = useState("");
const dispatch = useDispatch();
const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;
const url = useSelector((state) => state.Api);
const [ counter , setCounter ] = useState(0)
const [ counter1 , setCounter1 ] = useState(0)




  // ✅ Totals
  const totals = useMemo(() => {
    const totalFees = records
      .filter((r) => r.type === "order" && (r.status === "delivered" || r.status === "OLD_Dues") || r.status === "return")
      // .reduce((sum, r) => sum + (Number(r.total_fees) || 0), 0);
      .reduce((sum, r) => sum + (r.pay_out ? Number(r.pay_out) : r.total_fees ), 0);

    const totalPayout = records
      .filter((r) => r.type === "payment" || r.status === "return")
      .reduce((sum, r) => sum + (r.pay_out ? Number(r.pay_out) : r.total_fees ), 0);
    return { totalFees, totalPayout };
  }, [records]);


  // Calculate totals
const totalPending = records
  .filter(r => r.type === "order" && r.status !== "delivered")
  .reduce((sum, r) => sum + (Number(r.shirkat_charges) || 0), 0);

const totalDelivered = records
  .filter(r => r.type === "order" && (r.status === "delivered" || r.status === "OLD_Dues" ))
  .reduce((sum, r) => sum + (Number(r.shirkat_charges) || 0), 0);

const totalPayOut = records
  .filter(r => r.type === "payment"  || r.status === "return")
  .reduce((sum, r) => sum + (r.pay_out ? Number(r.pay_out) : r.total_fees), 0);


// ✅ FINAL + ONLY balance calculation (CORRECT)
const finalRecords = useMemo(() => {
  if (!records?.length) return [];

  // 1️⃣ keep only orders (delivered/OLD_Dues) + payments
  const validRecords = records.filter(r =>
    (r.type === "order" && (r.status === "delivered" || r.status === "OLD_Dues"  || r.status === "return")) ||
    r.type === "payment"
  );

  // 2️⃣ sort OLDEST → NEWEST
  const sortedAsc = [...validRecords].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 3️⃣ running balance
  let runningBalance = 0;

  const withBalance = sortedAsc.map(r => {
    if (r.status === "return") {
      runningBalance -= Number(r.total_fees || 0);
    }
    else if (r.type === "order") {
      runningBalance += Number(r.shirkat_charges || 0);
    } else if (r.type === "payment") {
      runningBalance -= Number(r.pay_out || 0);
    }

    return {
      ...r,
      balance: runningBalance
    };
  });

  // 4️⃣ show latest first
  return withBalance.reverse();
}, [records]);


const filteredRecords = useMemo(() => {
  if (!trackFilter) return finalRecords;

  return finalRecords.filter(r =>
    r.type === "order" &&
    r.track_number?.toLowerCase().includes(trackFilter.toLowerCase())
  );
}, [finalRecords, trackFilter]);


// ✅ Pagination (SAFE)
const paginatedRecords = useMemo(() => {
  if (rowsPerPage === -1) return filteredRecords;
  const start = page * rowsPerPage;
  return filteredRecords.slice(start, start + rowsPerPage);
}, [filteredRecords, page, rowsPerPage]);





  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(data?.phone1);
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setPhone("");
    setError(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    const phoneRegex = /^[0-9]{10,15}$/; // basic phone validation
    if (!phoneRegex.test(phone)) {
      setError(true);
      return;
    }
    console.log("Updated Phone:", phone); // Call your API here

    const payload = {
      phone,
      srn: data?.shirkat_srn 
    }
    dispatch(PostRequest(url.UpdateShirkatPhone , userToken , payload))
    dispatch(UpdateOwnState(Math.floor(Math.random() * 101204)))
    handleClose();
  };
useEffect(() => {
  // Run when counter or counter1 changes
  setTimeout(() => {
    // Focus the window
    window.focus();
    
    // Ensure the body is focused
    document.body.focus();

    // Blur any active element if needed
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }, 300); // delay to allow any DOM updates
}, [counter, counter1]);

useEffect(() => {
  const handleVisibility = () => {
    if (!document.hidden) {
      console.log("Tab is active again");
      document.body.focus(); // safe, at least focuses body
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  return () => document.removeEventListener("visibilitychange", handleVisibility);
}, []);


      





  return (
    <Container sx={{ mt: 4 }}>
      <AllPdf data={data} counter={counter} records={records} />
      <PaymentPdf data={data} counter={counter1} records={records} />

        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Phone Number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
            helperText={error ? "Please enter a valid phone number" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" gutterBottom>
        Shirkat Records
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Input
          type="text"
          placeholder="Search by Track Number"
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          style={{
            padding: "8px",
            maxWidth: "300px"
          }}
        />

          <Box sx={{
            // maxWidth:"200px" ,
            float:"right",
            width: "691px",
            display: "flex",
            alignItems:"center",
            marginTop: "14px"
            
           }}>
            <CustomBtn data="View All Data" style={{
              background:"#c232ffd9",
              boxShadow: "0px 1px 9px rgb(194 50 255)",
              }}  click={()=>setCounter((old)=>old+1)} />
            /
            <CustomBtn data="Update Phone Number"  click={handleOpen} />
            /
            <CustomBtn data="View Payment"
            style={{
              background:"#c232ffd9",
              boxShadow: "0px 1px 9px rgb(194 50 255)",
            }}
            // click={handleOpen} 
            click={()=>setCounter1((old)=>old+1)}
            />
          </Box>
         
      </Box>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Details</TableCell>
              {/* <TableCell align="right">Parcel</TableCell> */}
              <TableCell align="right">Cash</TableCell>
              <TableCell align="right">Payout</TableCell>
              <TableCell align="right">Balance</TableCell>
              {/* <TableCell align="right">Amount</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Chip
                    label={record.type === "order" ? "Order" : "Payment"}
                    // color={
                    //     record.type === "order"
                    //     ? record.status === "delivered"
                    //         ? "default"
                    //         : record.status === "return"
                    //         ? "alert"
                    //         : "success"
                    //     : "success"
                    // }
                    color={
                      record.type === "order"
                        ? record.status === "delivered"
                          ? "success"
                          : record.status === "return"
                          ? "error"
                          : "primary"
                        : "success"
                    }

                    size="small"
                    sx={{
                        backgroundColor:
                        record.type === "order" && record.status === "delivered"
                            ? "#c232ff"
                            : undefined,
                        color:
                        record.type === "order" && record.status === "delivered"
                            ? "white"
                            : undefined,
                    }}
                />
                <br />
                        {/* <strong>Origin:</strong>  */}
                        {
                          // record.type == "Payment" ?
                          record.type === "payment" ?
                          <>
                          {
                          record.address
                          }
                          </>
                            :
                          record.origin
                        }
                        <br />
                        
                         {record.track_number} <br />
                

                </TableCell>
                <TableCell>
                  {formatAfghanDate(record.date).toLocaleString()}<br />
                  {
                     record.type === "order" ? 
                     <>
                        {record.status}<br />
                      </>
                      :
                      null
                    }
                </TableCell>
                <TableCell>
                  {record.type === "order" ? (
                    <>
                      <strong>Our Fees:</strong>{record.total_fees}<br />
                    <strong>Shirkat Fees:</strong> {record.shirkat_charges}<br />
                    <strong>Fees From Customer:</strong> {record.total_customer_charge}
                    </>
                  ) : (
                    record.description || "Payment"
                  )}
                </TableCell>
                {/* <TableCell align="right">
                    {record.type === "order"
                    ? 
                    record.status != "delivered" ?  `${record.shirkat_charges || 0}`
                    :
                    null
                    : null}
                </TableCell> */}
                 <TableCell align="right">
                  {record.type === "order"
                    ? 
                    record.status == "delivered" ?  `${record.shirkat_charges || 0}`
                    :
                    0
                    : 0}
                </TableCell>
                 <TableCell align="right">
                  {record.type === "payment"
                    ? `${record.pay_out || 0} ` :
                  record.status === "return" 
                    ? `${record.total_fees || 0} ` :
                    
                    0}
                </TableCell>
                <TableCell align="right">
                  {
                  
                    // checkpayment(record.pay_out , record.delivery_date , record.type)
                    
                    // datafilter()
                    }
                    {record.balance?.toLocaleString() || 0}
                </TableCell>
              </TableRow>
            ))}
              
                <TableRow
                    sx={{
                    backgroundColor: "#f7f7f9",
                    "&:hover": { backgroundColor: "#f0f0f5" },
                    }}
                >
                    {/* <TableCell></TableCell> */}
                    <TableCell
                     colSpan={2}
                     align="center">
                        <Typography variant="h4">
                            Total : 
                        </Typography>
                    </TableCell>

                    <TableCell>
                    <Typography variant="strong" color="text.secondary">
                        Our Fees:
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {totals.totalFees.toLocaleString()}
                    </Typography>
                    </TableCell>
                     <TableCell>
                    </TableCell>

                    <TableCell>
                    <Typography variant="strong" color="text.secondary">
                        Order Cash:
                    </Typography>
                    <Typography variant="h6" color="#ff9800">
                        {totalDelivered.toLocaleString()}
                    </Typography>
                    </TableCell>

                    <TableCell>
                    <Typography variant="strong" color="text.secondary">
                        Payouts:
                    </Typography>
                    <Typography variant="h6" color="error.main">
                        {totalPayOut.toLocaleString()}
                    </Typography>
                    </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                      backgroundColor: "#f7f7f9",
                      "&:hover": { backgroundColor: "#f0f0f5" },
                      }}
                >
                  <TableCell
                    colSpan={4}
                   >
                    </TableCell>
                    <TableCell
                    colSpan={2}
                    sx={{ textAlign: 'center',
                      borderTop: "2px solid red"
                     }}
                   >
                    <Typography variant="strong" color="text.secondary">
                        Cash:
                    </Typography>
                    <Typography variant="h6" color="primary">
                        { (totalDelivered - totalPayOut).toLocaleString() }

                                              {/* {(parseInt(totalDelivered.toLocaleString())) - (parseInt(totalPayOut.toLocaleString()))} */}

                    </Typography>
                    </TableCell>
                </TableRow>

          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          // count={records.length}
          count={filteredRecords.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[25 , 100 , 200 , 500 , { label: 'All', value: -1 }]}
        />
      </TableContainer>

      {/* Totals */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          p: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
        }}
      >
      </Box>
    </Container>
  );
}
