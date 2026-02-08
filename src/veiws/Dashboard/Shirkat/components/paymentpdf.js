import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip, Tooltip, Card, CardContent, Button, TablePagination } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import PrintIcon from '@mui/icons-material/ArrowDropDown';
import { formatAfghanDate } from "../../../../components/Date/afghandate";
 
export default function PaymentPdf(props) {

const msg = props.message;
const records = props.records

const dtFrom = formatAfghanDate(props.dateFrom);
const dtTo   = formatAfghanDate(props.dateTo); 
    console.log(dtFrom, dtTo , props.records)
    // const data = props.records.filter((order , index)=> !order.pay_out).sort((order)=>order.status == "OLD_Dues")
    const data = (props.records || []).filter(order =>
  order.pay_out || order.status == "return"
);
    // .sort((a, b) => {
    //     if (a.status !== "OLD_Dues" && b.status == "OLD_Dues") return -1;
    //     if (a.status == "OLD_Dues" && b.status !== "OLD_Dues") return 1;
    //     return 0;
    // });

     console.log(data)

     const Total = useMemo(()=>{
        if(!props.records){
            return false
        }
        return {
            Total : data
            .reduce((acc, order)=>order.pay_out ? acc + parseFloat(order.pay_out) : acc + parseFloat(order.total_fees),0),

            OurFees : props.records
            // .filter((order , index)=> order.paytype !== "RETURN" && order.paytype !== "SHIRKAT")
            .reduce((acc, order)=>order.total_fees ? acc + parseFloat(order.total_fees) : acc,0),
            
             ShirkatCharges :  props.records.reduce((acc, order) => {
    if (order.paytype !== "RETURN" && order.paytype !== "SHIRKAT") {
        return order.shirkat_charges
            ? acc + parseFloat(order.shirkat_charges)
            : acc;
    }
    return acc;
}, 0)
            
        }
    })


    const findBranch = (srn) => {
        const getitem = JSON.parse(sessionStorage.getItem('branchItems')).filter((order)=>order.srn == srn)
        console.log(getitem)
        // return getitem[0]?.address
        if(getitem.length > 0){
            return getitem[0]?.address ? getitem[0]?.address : ""
        }
        else{
            const raw = sessionStorage.getItem('User_Data');
            const userData = JSON.parse(raw);
            console.log(userData)

            const branchdata = userData?.branch?.srn == srn;
            console.log(branchdata ,  userData?.branch?.srn , srn , )
            if(branchdata){
                return userData?.branch?.address
            }
            else{
                return '--'
            }
            // return branchdata[0]?.address;

        }
    }
    


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(-1);
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
    
    

    
    const myfunc = () => {
        const tableHTML = document.getElementById("print-table").outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Orders Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; color: #ffa800; margin:5px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th { background-color: #ffa800; color: white; padding: 5px; text-align: left; }
                        td { padding: 5px; border: 1px solid #ddd; font-size: 14px; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                        .totals { margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px; }
                        .total-row { font-weight: bold; background-color: #e8f5e8; }
                        .summary { margin-top: 30px; padding: 20px; border-top: 2px solid #ffa800; }
                    </style>
                </head>
                <body>
                    <h1>${JSON.parse(sessionStorage.getItem('BranchDetails')).address}</h1>
                    <h1>${JSON.parse(sessionStorage.getItem('BranchDetails')).phone1} ${JSON.parse(sessionStorage.getItem('BranchDetails')).username}</h1>
                    <h1>${props.data.shirkat_name}</h1>
                    <p><strong>Date:</strong>
                        ${new Date().toLocaleDateString()}<br/>
                        ${new Date().toLocaleDateString("fa-AF-u-ca-persian")} </p>
                    <p><strong>Total:</strong> ${paginatedRecords.length}</p>
                    ${tableHTML}
                   
                </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 250);

         
    }
    useEffect(()=>{
        if(props.counter > 0){
            myfunc()
        }
    },[props.counter])
    

  return (
    <>

                <TableContainer sx={{opacity: 0 , display:"none"}} component={Paper} id="print-table">
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
                                colSpan={3}
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
                                 <h3>
                                    {totals.totalFees.toLocaleString()}
                                 </h3>
                                </Typography>
                                </TableCell>

                                <TableCell>
                                <Typography variant="strong" color="text.secondary">
                                    Order Cash:
                                </Typography>
                                <Typography variant="h6" color="#ff9800">
                                 <h3>
                                    {totalDelivered.toLocaleString()}
                                 </h3>
                                </Typography>
                                </TableCell>

                                <TableCell>
                                <Typography variant="strong" color="text.secondary">
                                    Payouts:
                                </Typography>
                                <Typography variant="h6" color="error.main">
                                 <h3>
                                    {totalPayOut.toLocaleString()}
                                 </h3>
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
                                <Typography variant="h6" sx={{fontSize:"20px"}} color="primary">
                                    <h3>
                                    { (totalDelivered - totalPayOut).toLocaleString() }
                                    </h3>

                                                        {/* {(parseInt(totalDelivered.toLocaleString())) - (parseInt(totalPayOut.toLocaleString()))} */}

                                </Typography>
                                </TableCell>
                            </TableRow>

                    </TableBody>
                    </Table>

                    {/* Pagination */}
                    {/* <TablePagination
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
                    /> */}
                </TableContainer>
         
    </>             
  )
}

