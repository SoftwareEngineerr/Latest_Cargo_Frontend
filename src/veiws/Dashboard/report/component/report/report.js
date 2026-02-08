import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip, Tooltip, Card, CardContent, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import PrintIcon from '@mui/icons-material/ArrowDropDown';
import { ShowLoader } from '../../../../../redux/actions/loader';

const DailyReport = () => {
    const [payments, setPayments] = useState([]);
    const [otherPayments, setOtherPayments] = useState([]);
    const api = useSelector((state) => state.Api);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [receivedOrders, setReceivedOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [ShirkatPayments, setShirkatPayments] = useState();
    const [othereDetails, setOthereDetails] = useState();
    const [paytypeMap, setPaytypeMap] = useState();
    const dispatch = useDispatch();

 
    const initialRoz = useRef(false)
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async (date) => {
        const fetchDate = date;
        if (initialRoz.current) return
        initialRoz.current = true
        const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token || undefined;
        try {
            dispatch(ShowLoader('1'))
            const response = await axios.post(api.dailyBranchReport, { selectedDate: fetchDate }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                //console.log(response.data)
                setPayments(response?.data?.today_payments);
                setOtherPayments(response?.data?.till_yesterday)
                setCustomerOrders(response?.data?.customer_orders || []);
                setReceivedOrders(response?.data?.delivered_hold_orders || []);
                setShirkatPayments(response?.data?.shirkatpayments[0] || []);
                setOthereDetails(response?.data?.paytype_summary || []);

                const paytypeData = response?.data?.paytype_summary || [];
                const othereDetailsPayment = paytypeData.reduce((acc, item) => {
                acc[item.paytype] = item;
                return acc;
                }, {});
                console.log(othereDetailsPayment)
                setOthereDetails(othereDetailsPayment)
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            dispatch(ShowLoader('0'))
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
                    <Grid lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={handleDateChange}
                                views={["day", "month", "year"]}
                                shouldDisableDate={(date) => dayjs(date).isAfter(dayjs(), 'day')} // Disable future dates
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid lg={3}></Grid>
                </Grid>

                
                        {/* <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#2196f3', color:'white !important', lineHeight:'1.2', textAlign:'center' }}>
                                    <TableCell sx={{ backgroundColor: '#297a91', color: 'white', fontWeight: 'bold' }}>دخل</TableCell>
                                    <TableCell sx={{ backgroundColor: '#297a91', color: 'white', fontWeight: 'bold' }}>ټوټل دمشتری </TableCell>
                                    <TableCell sx={{ backgroundColor: '#297a91', color: 'white', fontWeight: 'bold' }}>کرایه</TableCell>
                                    <TableCell sx={{ backgroundColor: '#297a91', color: 'white', fontWeight: 'bold' }}>شرکت</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>دبرانچو څخه وصولی</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>برانچو ته توضیع</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نغد وصول</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ډیلیوری</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تنخوا</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اډوانس</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>مصارف</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>شرکتو ته توضیع</TableCell>
                                </TableHead>
                                <TableRow  sx={{ backgroundColor: '#ecececff',lineHeight:'1.2', textAlign:'center'}}>
                                    <TableCell>{otherPayments?.balance}</TableCell>
                                    <TableCell>{ShirkatPayments?.TotalOrdersCustomerPayments}</TableCell>
                                    <TableCell>{ShirkatPayments?.ourRentsCollections}</TableCell>
                                    <TableCell>{ShirkatPayments?.TotalOrdersShirkatPayments}</TableCell> 
                                    <TableCell>{othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0}</TableCell> 
                                    <TableCell>{othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0}</TableCell> 
                                    <TableCell>{othereDetails?.CASH?.total_pay_in || 0}</TableCell> 
                                    <TableCell>{othereDetails?.DELIVERY_PAYMENT?.total_pay_in || 0}</TableCell> 
                                    <TableCell>{othereDetails?.EMP_SALARY?.total_pay_out || 0}</TableCell> 
                                    <TableCell>{othereDetails?.EMP_ADVANCED?.total_pay_out || 0}</TableCell> 
                                    <TableCell>{othereDetails?.EXPENSE?.total_pay_out || 0}</TableCell> 
                                    <TableCell>{othereDetails?.SHIRKAT?.total_pay_out || 0}</TableCell> 
                                </TableRow>
                            </Table>
                        </TableContainer> */}
                <br/>
                <br/>
                {customerOrders.length > 0 ?
                    <Grid item lg={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                📦 جوړ سوی پارسلونه ({customerOrders.length})
                            </Typography>
                            <Typography>
                                {selectedDate
                                ? new Intl.DateTimeFormat("fa-AF-u-ca-persian", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).format(selectedDate.toDate())
                                : "No date selected"}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {/* Print Button */}
                                <Tooltip title="Print Orders">
                                    <Button
                                        variant="contained"
                                        startIcon={<PrintIcon />}
                                        onClick={() => {
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
                                        <h1>${JSON.parse(localStorage.getItem('BranchDetails')).address}</h1>
                                        <h1>${JSON.parse(localStorage.getItem('BranchDetails')).phone1} ${JSON.parse(localStorage.getItem('BranchDetails')).username}</h1>
                                        <p><strong>Date:</strong>
                                            ${new Date().toLocaleDateString()}<br/>
                                            ${new Date().toLocaleDateString("fa-AF-u-ca-persian")} </p>
                                        <p><strong>Total Orders:</strong> ${customerOrders.length}</p>
                                        
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>دخل</th>
                                                    <th>ټوټل دمشتری </th>
                                                    <th>کرایه</th>
                                                    <th>شرکت</th>
                                                    <th>دبرانچو څخه وصولی</th>
                                                    <th>برانچو ته توضیع</th>
                                                    <th>نغد وصول</th>
                                                    <th>ډیلیوری</th>
                                                    <th>تنخوا</th>
                                                    <th>اډوانس</th>
                                                    <th>مصارف</th>
                                                    <th>شرکت ته توضیع</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                <tr>
                                                        <td colspan='2'>Total</td>
                                                        <td> ${customerOrders.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()} </td> 
                                                        <td> ${customerOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                        <td colspan='5'>${customerOrders.reduce((sum, order) => sum + (order.total_fees || 0) + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                    </tr>
                                            </tbody>
                                        </table>


                                        <table>
                                            <thead>
                                                <tr>
                                                                
                                                    <th>ارسال به</th>
                                                    <th>تریک نمره</th>
                                                    <th>کرایه</th>
                                                    <th>ارزش فروشګاه</th>
                                                    <th>جمله قیمت</th>
                                                    <th>اسم جنس</th>
                                                    <th>اسم فروشګاه</th>
                                                    <th>حالت</th>
                                                    <th>نمره.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${customerOrders.map((order, index) => `
                                                    <tr>
                                                        <td>${order.parcel_destination || 'N/A'}</td>
                                                        <td>${order.track_number || 'N/A'}</td>
                                                        <td>${order.total_fees?.toLocaleString() || 0} </td>
                                                        <td>${order.shirkat_charges?.toLocaleString() || 0} </td>
                                                        <td>${order.total_customer_charge?.toLocaleString() || 0} </td>
                                                        <td>${order.parcel_details || 'N/A'}</td>
                                                        <td>${order.shirkat_name || 'N/A'}</td>
                                                        <td>${order.status || 'Pending'}</td>
                                                        <td>${index + 1 || ''}</td>
                                                    </tr>
                                                `).join('')}

                                                <tr>
                                                        <td colspan='2'>Total</td>
                                                        <td> ${customerOrders.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()} </td> 
                                                        <td> ${customerOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                        <td colspan='5'>${customerOrders.reduce((sum, order) => sum + (order.total_fees || 0) + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </body>
                                </html>
                            `);
                                            printWindow.document.close();
                                            setTimeout(() => {
                                                printWindow.print();
                                            }, 250);
                                        }}
                                        sx={{
                                            backgroundColor: '#ffa800',
                                            '&:hover': { backgroundColor: '#1565c0' }
                                        }}
                                    >
                                        Print
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>


                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead sx={{ backgroundColor: '#ffa800', color:'white', textAlign:'center' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ارسال به</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تریک نمره</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>کرایه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ارزش فروشګاه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>جمله قیمت</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم جنس</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم فروشګاه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>حالت</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نمره.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customerOrders.map((order, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f5f5f5' },
                                                '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                                            }}
                                        >
                                            <TableCell>{order.parcel_destination}</TableCell>
                                            <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                                                {order.track_number}<br/>
                                                {/* {order.date_time} */}
                                            </TableCell>
                                            <TableCell sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
                                                {order.total_fees?.toLocaleString()}
                                            </TableCell>
                                            <TableCell sx={{ color: '#ed6c02', fontWeight: 'medium' }}>
                                                {order.shirkat_charges?.toLocaleString()}
                                            </TableCell>
                                            <TableCell sx={{ color: '#ed6c02', fontWeight: 'medium' }}>
                                                {order.total_customer_charge?.toLocaleString()}
                                            </TableCell>
                                            <TableCell>{order.parcel_details}</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {order.shirkat_name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.status || 'Pending'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: order.status === 'Delivered' ? '#4caf50' :
                                                            order.status === 'OrderCreate' ? '#2196f3' : '#ff9800',
                                                        color: 'white'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {index + 1}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* Totals Row */}
                                    <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            <strong>Totals:</strong>
                                        </TableCell>
                                        <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {customerOrders.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {customerOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {customerOrders.reduce((sum, order) => sum + (order.total_customer_charge || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell colSpan={5} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px', textAlign: 'center' }}>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Summary Card */}

                    </Grid>
                    : null}
                <br />


                {receivedOrders.length > 0 ?
                    <Grid item lg={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                📦 رارسیدلي پارسلونه ({receivedOrders.length})
                            </Typography>
                            <Typography>
                                {selectedDate
                                ? new Intl.DateTimeFormat("fa-AF-u-ca-persian", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).format(selectedDate.toDate())
                                : "No date selected"}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {/* Print Button */}
                                <Tooltip title="Print Orders">
                                    <Button
                                        variant="contained"
                                        startIcon={<PrintIcon />}
                                        onClick={() => {
                                            const printWindow = window.open('', '_blank');
                                            printWindow.document.write(`
                                <html>
                                    <head>
                                        <title>Orders Report</title>
                                        <style>
                                            body { font-family: Arial, sans-serif; padding: 20px; }
                                            h1 { text-align: center; color: #06d8d8ff; margin:5px; }
                                            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                                            th { background-color: #06d8d8ff; color: white; padding: 5px; text-align: left; }
                                            td { padding: 5px; border: 1px solid #ddd; font-size: 14px; }
                                            tr:nth-child(even) { background-color: #f9f9f9; }
                                            .totals { margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px; }
                                            .total-row { font-weight: bold; background-color: #e8f5e8; }
                                            .summary { margin-top: 30px; padding: 20px; border-top: 2px solid #06d8d8ff; }
                                        </style>
                                    </head>
                                    <body>
                                        <h1>${JSON.parse(localStorage.getItem('BranchDetails')).address}</h1>
                                        <h1>${JSON.parse(localStorage.getItem('BranchDetails')).phone1} ${JSON.parse(localStorage.getItem('BranchDetails')).username}</h1>
                                        <p><strong>Date:</strong>
                                            ${new Date().toLocaleDateString()}<br/>
                                            ${new Date().toLocaleDateString("fa-AF-u-ca-persian")} </p>                                        <p><strong>Total Orders:</strong> ${receivedOrders.length}</p>
                                        
                                        <table>
                                            <thead>
                                                <tr>
                                                                
                                                    <th>ارسال به</th>
                                                    <th>تریک نمره</th>
                                                    <th>کرایه</th>
                                                    <th>ارزش فروشګاه</th>
                                                    <th>جمله قیمت</th>
                                                    <th>اسم جنس</th>
                                                    <th>اسم فروشګاه</th>
                                                    <th>حالت</th>
                                                    <th>نمره.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${receivedOrders.map((order, index) => `
                                                    <tr>
                                                        <td>${order.parcel_destination || 'N/A'}</td>
                                                        <td>${order.track_number || 'N/A'}</td>
                                                        <td>${order.total_fees?.toLocaleString() || 0} </td>
                                                        <td>${order.shirkat_charges?.toLocaleString() || 0} </td>
                                                        <td>${order.total_customer_charge?.toLocaleString() || 0} </td>
                                                        <td>${order.parcel_details || 'N/A'}</td>
                                                        <td>${order.shirkat_name || 'N/A'}</td>
                                                        <td>${order.status || 'Pending'}</td>
                                                        <td>${index + 1 || ''}</td>
                                                    </tr>
                                                `).join('')}

                                                <tr>
                                                        <td colspan='2'>Total</td>
                                                        <td> ${receivedOrders.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()} </td> 
                                                        <td> ${receivedOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                        <td colspan='5'>${receivedOrders.reduce((sum, order) => sum + (order.total_fees || 0) + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </body>
                                </html>
                            `);
                                            printWindow.document.close();
                                            setTimeout(() => {
                                                printWindow.print();
                                            }, 250);
                                        }}
                                        sx={{
                                            backgroundColor: '#06d8d8ff',
                                            '&:hover': { backgroundColor: '#1565c0' }
                                        }}
                                    >
                                        Print
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>

                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead sx={{ backgroundColor: '#06d8d8ff' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ارسال به</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تریک نمره</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>کرایه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ارزش فروشګاه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>جمله قیمت</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم جنس</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم فروشګاه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>حالت</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نمره.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {receivedOrders.map((order, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f5f5f5' },
                                                '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                                            }}
                                        >
                                            <TableCell>{order.parcel_destination}</TableCell>
                                            <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                                                {order.track_number}<br/>
                                                {/* {order.delivery_date} */}
                                            </TableCell>
                                            <TableCell sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
                                                {order.total_fees?.toLocaleString()}
                                            </TableCell>
                                            <TableCell sx={{ color: '#ed6c02', fontWeight: 'medium' }}>
                                                {order.shirkat_charges?.toLocaleString()}
                                            </TableCell>
                                            <TableCell sx={{ color: '#ed6c02', fontWeight: 'medium' }}>
                                                {order.total_customer_charge?.toLocaleString()}
                                            </TableCell>
                                            <TableCell>{order.parcel_details}</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {order.shirkat_name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.status || 'Pending'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: order.status === 'Delivered' ? '#4caf50' :
                                                            order.status === 'OrderCreate' ? '#2196f3' : '#ff9800',
                                                        color: 'white'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {index + 1}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* Totals Row */}
                                    <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            <strong>Totals:</strong>
                                        </TableCell>
                                        <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {receivedOrders.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {receivedOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            {receivedOrders.reduce((sum, order) => sum + (order.total_customer_charge || 0), 0).toLocaleString()}
                                        </TableCell>
                                        <TableCell colSpan={5} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px', textAlign: 'center' }}>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Summary Card */}

                    </Grid>
                    : null}
                <br />



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
                    {/* <BranchSelector /> */}
                    {/* <OrderDetailView data={1} currentValues={[selectedOrder]} /> */}
                </Box>
            </Modal>
        </>
    );
};

export default DailyReport;
