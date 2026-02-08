import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip } from "@mui/material";
import { useSelector } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import BranchSelector from "./branchPayment";
const Roznamcha = () => {
    const [payments, setPayments] = useState([]);
    const [otherPayments, setOtherPayments] = useState([]);
    const api = useSelector((state) => state.Api);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const initialRoz = useRef(false)
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async (date) => {
        const fetchDate = date; 
        if(initialRoz.current) return
        initialRoz.current = true
        const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.post(api.DailyCash,  {selectedDate: fetchDate},   {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                //console.log(response.data)
                setPayments(response.data.today_payments);
                setOtherPayments(response.data.till_yesterday)
            }
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };

    let cumulativeIn = 0//otherPayments?.balance;
    let cumulativeOut = 0;

    // Function to handle date selection
    const handleDateChange = (date) => {
        initialRoz.current = false
        setSelectedDate(date);
        //console.log("Selected Date:", date.format("YYYY-MM-DD"));
        fetchPayments(date)
    };

    const handlePrintClick = () => {
    setOpenOrderModal(true)
    // //console.log(order)
  }

    return (
        <>
        <TableContainer component={Paper} style={{ marginTop: "20px", marginBottom: '30px' }}>
            <Grid item lg={12}>
                <Grid lg={3}>
                    <Chip sx={{ fontWeight: 600, mb: 1, backgroundColor: '#daffe04b', border: '2px solid #2E7D32' }} onClick={(e) => handlePrintClick()} label={'   Branch Payment   '} />
                </Grid>
                <Grid lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            views={["year", "month", "day"]}
                            shouldDisableDate={(date) => dayjs(date).isAfter(dayjs(), 'day')} // Disable future dates
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid lg={3}></Grid>
            </Grid>
                
            <Table style={{marginBottom: '10px'}}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{ width:"50%", textAlign: "center", fontWeight: "bold", fontSize: "18px", backgroundColor: "rgb(255 233 206)" }}>بورد ګی</TableCell>
                        <TableCell colSpan={2} style={{ width:"50%", textAlign: "center", fontWeight: "bold", fontSize: "18px", backgroundColor: "#dff0d8" }}>امد</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', padding: '4px', backgroundColor: "rgb(255 233 206)" }}>بوردګی </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', padding: '4px', backgroundColor: "rgb(255 233 206)" }}>تفصیل</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', padding: '4px', backgroundColor: "#dff0d8" }}>امد </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px', padding: '4px', backgroundColor: "#dff0d8"}}>تفصیل</TableCell>
                    </TableRow> 
                    {payments?.map((payment, index) => {
                        cumulativeIn +=  payment.amount_in || 0;
                        cumulativeOut += payment.amount_out || 0;
                        return (
                            <TableRow key={index}>
                                {/* Outgoing */}
                                <TableCell sx={{ padding: "4px" }}>{payment.amount_out ? payment?.amount_out?.toFixed(2) : ""}</TableCell>
                                <TableCell sx={{ padding: "4px" }}>{payment.amount_out ? payment.description : ""}</TableCell>

                                {/* Incoming */}
                                <TableCell sx={{ padding: "4px" }}>{payment.amount_in ? payment?.amount_in?.toFixed(2) : ""}</TableCell>
                                <TableCell sx={{ padding: "4px" }}>{payment.amount_in ? payment.description : ""}</TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow>
                        <TableCell sx={{ padding: "4px", fontWeight: 'bold' }}>{cumulativeOut?.toFixed(2)}</TableCell>
                        <TableCell sx={{ padding: "4px", fontWeight: 'bold', fontSize: '16px' }} >ټوټل بورد ګی</TableCell> 

                        <TableCell sx={{ padding: "4px", fontWeight: 'bold' }}>{cumulativeIn?.toFixed(2)}</TableCell>
                        <TableCell sx={{ padding: "4px", fontWeight: 'bold', fontSize: '16px' }} >ټوټل امد</TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ padding: "4px", fontWeight: 'bold' }}> </TableCell>
                        <TableCell sx={{ padding: "4px", fontWeight: 'bold', fontSize: '16px' }} ></TableCell> 

                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', padding: '4px' }}>{otherPayments?.balance?.toFixed(2)}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px', padding: '4px'}}>د پرون بیلانس</TableCell>
                    </TableRow>
                    <TableRow> 
                        <TableCell style={{fontSize: '20px', fontWeight:'bold', padding: '4px'}}> </TableCell>
                        <TableCell style={{fontSize: '20px', fontWeight:'bold', padding: '4px'}}> </TableCell>
                        <TableCell style={{fontSize: '20px', fontWeight:'bold', padding: '4px'}}>{((cumulativeIn - cumulativeOut) + (otherPayments?.balance))?.toFixed(2)}  </TableCell>
                        <TableCell style={{fontSize: '20px', fontWeight:'bold', padding: '4px'}}>: دخل </TableCell>
    
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
                open={openOrderModal}
                onClose={() => setOpenOrderModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        width: '95%',
                        maxWidth: 850,
                        maxHeight: '90vh',   // ✅ height limit
                        overflowY: 'auto',   // ✅ enable scrolling
                    }}
                >
                    <BranchSelector />
                    {/* <OrderDetailView data={1} currentValues={[selectedOrder]} /> */}
                </Box>
            </Modal>
        </>
    );
};

export default Roznamcha;
