import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip, Tooltip, Card, CardContent, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import PrintIcon from '@mui/icons-material/ArrowDropDown';
import { ShowLoader } from '../../../../../redux/actions/loader';
import { FullDate } from "../../../../../components/Date/FullDate";
import { CustomBtn } from "../../../../../components/button/button";
import DetailsTable from "./detailsTable";
import DetailsTableSend from "./detailsTableSend";
import { ArrowUpward, Download, Upload } from "@mui/icons-material";
import BranchOrders from "./component/branchOrders";
import ReturnDetailsTable from "./component/returnDetailsTable";
import StateBox from "./statebox";


const DetailBranchReportDateWise = () => {
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
    const [endDate, setEndDate] = useState()
    const [startDate, setStartDate] = useState()
    const [branchOrders , setBranchOrders ] = useState()
    
    // Add state to track if filter has been applied
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    
    // Add state to store filtered data for child components
    const [filteredData, setFilteredData] = useState({
        deliveredCustomerOrders: [],
        returnCustomerOrders: [],
        pendingCustomerOrders: [],
        deliveredReceivedOrders: [],
        returnReceivedOrders: [],
        pendingReceivedOrders: [],
    });
 
    const initialRoz = useRef(false)
     
    const fetchPayments = async () => { 
        const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token || undefined;
        try {
            dispatch(ShowLoader('1'))
            const response = await axios.post(api.dailyBranchReportDateWise, { startDate, endDate }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                setPayments(response?.data?.today_payments);
                setOtherPayments(response?.data?.till_yesterday)
                setCustomerOrders(response?.data?.customer_orders || []);
                setReceivedOrders(response?.data?.delivered_hold_orders || []);
                setShirkatPayments(response?.data?.shirkatpayments[0] || []);
                setBranchOrders(response?.data?.branchOrders || [])
                
                
                const paytypeData = response?.data?.paytype_summary || [];
                const othereDetailsPayment = paytypeData.reduce((acc, item) => {
                    acc[item.paytype] = item;
                    return acc;
                }, {});
                console.log(othereDetailsPayment)
                setOthereDetails(othereDetailsPayment)
                
                // Mark filter as applied
                setIsFilterApplied(true);
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            dispatch(ShowLoader('0'))
            console.error("Error fetching suppliers:", err);
        }
    };

    // Memoize filtered data calculations
    const processedData = useMemo(() => {
        if (!isFilterApplied) {
            return filteredData;
        }
        
        return {
            deliveredCustomerOrders: customerOrders
                .filter(item => item.status == 'delivered')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            returnCustomerOrders: customerOrders
                .filter(item => item.status == 'return')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            pendingCustomerOrders: customerOrders
                .filter(item => item.status !== 'return' && item.status !== 'delivered')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),

            receivedReturnOrdersValue:  customerOrders.filter(item => item.status == 'return').reduce((sum, order) => sum + (order.total_customer_charge || 0), 0).toLocaleString(),
                

            deliveredReceivedOrders: receivedOrders
                .filter(item => item.status == 'delivered')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            returnReceivedOrders: receivedOrders
                .filter(item => item.status == 'return')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            pendingReceivedOrders: receivedOrders
                .filter(item => item.status !== 'return' && item.status !== 'delivered')
                 .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
        };
    }, [customerOrders, receivedOrders, isFilterApplied]);

    // Update filtered data when processedData changes and filter is applied
    useEffect(() => {
        if (isFilterApplied) {
            setFilteredData(processedData);
        }
    }, [processedData, isFilterApplied]);

    // Function to handle date selection
    const handleDateChange = (date) => {
        initialRoz.current = false;
        setSelectedDate(date);
        // Reset filter applied state when dates change
        setIsFilterApplied(false);
    };

    const handlePrintClick = () => {
        setOpenOrderModal(true);
    }

    const handleFilterClick = () => {
        console.log(startDate, endDate);
        if (!startDate) {
            alert('غلط تاریخ شروع');
            return;
        }

        if (!endDate) {
            alert('غلط تاریخ اخیر');
            return;
        }         
        fetchPayments();
    };

    // Add a reset function
    const handleDateClear = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setIsFilterApplied(false);
    };

    const customerDelivered = isFilterApplied
  ? filteredData.deliveredCustomerOrders || []
  : [];

const receivedDelivered = isFilterApplied
  ? filteredData.deliveredReceivedOrders || []
  : [];

const sumColumn = (arr, key) =>
  arr.reduce((sum, item) => sum + (item[key] || 0), 0);

// Row 1
const custFees = sumColumn(customerDelivered, 'total_fees');
const custShirkat = sumColumn(customerDelivered, 'shirkat_charges');
const custTotal = sumColumn(customerDelivered, 'total_customer_charge');

// Row 2
const recvFees = sumColumn(receivedDelivered, 'total_fees');
const recvShirkat = sumColumn(receivedDelivered, 'shirkat_charges');
const recvTotal = sumColumn(receivedDelivered, 'total_customer_charge');

// ✅ Grand totals (3rd row)
const grandFees = custFees - recvFees;
const grandShirkat = custShirkat - recvShirkat;
const grandTotal = custTotal - recvTotal;

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: "20px", marginBottom: '30px' }}>
               
{/* 
                <TableContainer>
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
                <StateBox />



<br/>
      <br />

                    <Grid container >
                        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
                            <FullDate
                                getprops={{ name: "From", value: startDate }}
                                onChange={(e) => {
                                    setStartDate(e);
                                    setIsFilterApplied(false); // Reset when date changes
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
                            <FullDate
                                getprops={{ name: "To", value: endDate }}
                                onChange={(e) => {
                                    setEndDate(e);
                                    setIsFilterApplied(false); // Reset when date changes
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ display: "block", margin: 'auto' }}>
                            <CustomBtn
                                click={handleFilterClick}
                                data="Filter"
                            />
                        </Grid>
                        {/* Optional: Add clear button */}
                        
                    </Grid>
                    {/* <Grid container spacing={2}>
                         
                         <Grid item xs={12} sm={12} sx={{ display: "block", margin: 'auto' }}>
                            <Button 
                                variant="outlined" 
                                onClick={handleDateClear}
                                sx={{ mt: 2 }}
                            >
                                Clear Dates
                            </Button>
                        </Grid>
                    </Grid> */}

          

                <br/>
                
                {/* Only render child components when filter is applied */}
                {isFilterApplied && (
                    <>

                    
                         {processedData.deliveredReceivedOrders.length > 0 && (
                            <>
                                <BranchOrders 
                                    key="delivered-customer" // Key forces re-render only when filter is applied
                                    message='ډیلیور سوی پارسلونه' 
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    color="#ffa800"
                                    customerOrders={processedData.deliveredReceivedOrders}
                                />
                                <br />
                            </>
                        )}
                      
                        
                        {filteredData.pendingReceivedOrders.length > 0 && (
                            <>
                                <DetailsTableSend 
                                    key="pending-received"
                                    message='انتظار' 
                                    color="#ffa800"
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    sendOrders={filteredData.pendingReceivedOrders}
                                />
                                <br />
                            </>
                        )}

                           {filteredData.returnReceivedOrders.length > 0 && (
                            <>
                                <ReturnDetailsTable 
                                    key="Return Orders" // Key forces re-render only when filter is applied
                                    message='راګلی مسترد پارسل' 
                                    color="#ffa800"
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    customerOrders={filteredData.returnReceivedOrders}
                                />
                                <br />
                            </>
                        )}  
                       


                           {customerOrders
                         .filter((item) => item.status == 'return')
                         .length > 0 && (
                             <>
                                <DetailsTable 
                                     message=' تللی مسترد پارسل' 
                                    key="return-customer"
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    customerOrders={customerOrders.filter((item) => item.status == 'return')}
                                />
                                <br />
                            </>
                        )}
                        

                        
                        
                       {/* {filteredData.pendingReceivedOrders.length > 0 && (
                           <>
                               <DetailsTable 
                                   key="pending-customer"
                                   message='انتظار' 
                                   dateFrom={startDate} 
                                   dateTo={endDate} 
                                   customerOrders={filteredData.pendingReceivedOrders}
                               />
                               <br />
                           </>
                       )} */}

                     
                        {customerOrders
                        .filter((item) => item.status == 'delivered')
                        .length > 0 && (
                            <>
                                <DetailsTable 
                                    key="return-customer"
                                    // message='ریټرن سوی پارسلونه' 
                                    message='ډیلیور سوی پارسلونه' 
                                    color="#06d8d8ff"
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    customerOrders={customerOrders.filter((item) => item.status == 'delivered')}
                                />
                                <br />
                            </>
                        )}
                          {
                        
                            customerOrders
                    .filter(item => item.status !== 'return' && item.status !== 'delivered')
                    .length > 0 && (
                            <>
                                <DetailsTable 
                                    key="return-customer"
                                    message='انتظار' 
                                    color="#06d8d8ff"
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    customerOrders={customerOrders.filter(item => item.status !== 'return' && item.status !== 'delivered')}
                                />
                                <br />
                            </>
                        )
                       }

                     
                        
                        
                        
                        {/* {filteredData.deliveredReceivedOrders.length > 0 && (
                            <>
                                <DetailsTableSend 
                                    key="delivered-received"
                                    message='ډیلیور سوی پارسلونه' 
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    sendOrders={filteredData.deliveredReceivedOrders}
                                />
                                <br />
                            </>
                        )} */}
                        
                        {/* {filteredData.returnReceivedOrders.length > 0 && (
                            <>
                                <DetailsTableSend 
                                    key="return-received"
                                    message='ریټرن سوی پارسلونه' 
                                    dateFrom={startDate} 
                                    dateTo={endDate} 
                                    sendOrders={filteredData.returnReceivedOrders}
                                />
                                <br />
                            </>
                        )} */}

                    </>
                )}
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
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    {/* Modal content */}
                </Box>
            </Modal>
        </>
    );
};

export default DetailBranchReportDateWise;