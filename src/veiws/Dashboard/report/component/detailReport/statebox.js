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


const StateBox = () => {
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
            // const response = await axios.post(api.dailyBranchReportDateWise, { startDate, endDate }, {
            const date = new Date()
            const response = await axios.post(api.defaultBranchDailyReport, {startDate:"1-1-2025",  endDate:date}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                setPayments(response?.data?.today_payments);
                setOtherPayments(response?.data?.till_yesterday)
                setCustomerOrders(response?.data?.customer_orders || []);
                setReceivedOrders(response?.data?.delivered_hold_orders[0] || []);
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

            receivedReturnOrdersValue:  customerOrders.filter(item => item.status == 'return').reduce((sum, order) => sum + (order.total_customer_charge || 0), 0),
                

            // deliveredReceivedOrders: receivedOrders
            //     .filter(item => item.status == 'delivered')
            //      .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            // returnReceivedOrders: receivedOrders
            //     .filter(item => item.status == 'return')
            //      .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
            
            // pendingReceivedOrders: receivedOrders
            //     .filter(item => item.status !== 'return' && item.status !== 'delivered')
            //      .sort((a,b) => a.parcel_destination.localeCompare(b.parcel_destination)),
        };
    }, [customerOrders, receivedOrders, isFilterApplied]);

    // Update filtered data when processedData changes and filter is applied
    useEffect(() => {
        if (isFilterApplied) {
            setFilteredData(processedData);
        }
    }, [processedData, isFilterApplied]);
    useEffect(() => {
        fetchPayments();
    },[])

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
// const custFees = sumColumn(customerDelivered, 'total_fees');
// const custShirkat = sumColumn(customerDelivered, 'shirkat_charges');
// const custTotal = sumColumn(customerDelivered, 'total_customer_charge');
const custFees = receivedOrders.delivered_total_fees
const custShirkat = receivedOrders.delivered_shirkat_charges
const custTotal = receivedOrders.delivered_total_customer_charge;

// Row 2
// const recvFees = sumColumn(receivedDelivered, 'total_fees');
// const recvShirkat = sumColumn(receivedDelivered, 'shirkat_charges');
// const recvTotal = sumColumn(receivedDelivered, 'total_customer_charge');

const recvFees = receivedOrders.received_total_fees;
const recvShirkat = receivedOrders.received_shirkat_charges;
const recvTotal = receivedOrders.received_total_customer_charge;

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
                <Grid container spacing={2} justifyContent="center">

  {/* ================= TABLE 1 ================= */}
  <Grid item xs={12} sm={4}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">کرایه</TableCell>
            <TableCell align="center"> فروشګاه</TableCell>
            <TableCell align="center">جمله قیمت</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">{custFees}</TableCell>
            <TableCell align="center">{custShirkat}</TableCell>
            <TableCell align="center">{custTotal}</TableCell>
            <TableCell align="center">رسیدګی ډیلیور <Download /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">{recvFees}</TableCell>
            <TableCell align="center">{recvShirkat}</TableCell>
            <TableCell align="center">{recvTotal}</TableCell>
            <TableCell align="center">لیږلي ډیلیور <Upload /></TableCell>
          </TableRow>

          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell align="center">{grandFees}</TableCell>
            <TableCell align="center">{grandShirkat}</TableCell>
            <TableCell align="center">{grandTotal}</TableCell>
            <TableCell align="center">ټول</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>

  {/* ================= TABLE 2 ================= */}
  <Grid item xs={12} sm={4}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">حواله جات</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">
              {othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0}
            </TableCell>
            <TableCell align="center">رسیدګی <Download /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              {othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0}
            </TableCell>
            <TableCell align="center">لیږلي <Upload /></TableCell>
          </TableRow>

          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell align="center">
              {Number(othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0) -
               Number(othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0)}
            </TableCell>
            <TableCell align="center">ټول</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>

  {/* ================= TABLE 3 ================= */}
  <Grid item xs={12} sm={4}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">نور</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">
              {Number(othereDetails?.EMP_SALARY?.total_pay_out || 0)}
            </TableCell>
            <TableCell align="center">تنخوا <Upload /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              {othereDetails?.EMP_ADVANCED?.total_pay_out || 0}
            </TableCell>
            <TableCell align="center">اډوانس <Upload /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              {othereDetails?.EXPENSE?.total_pay_out || 0}
            </TableCell>
            <TableCell align="center">مصرف <Upload /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              {othereDetails?.SHIRKAT?.total_pay_out || 0}
            </TableCell>
            <TableCell align="center">شرکتو ته <Upload /></TableCell>
          </TableRow>

          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell align="center">
              {Number(othereDetails?.EMP_SALARY?.total_pay_out || 0) +
               Number(othereDetails?.EMP_ADVANCED?.total_pay_out || 0) +
               Number(othereDetails?.EXPENSE?.total_pay_out || 0) +
               Number(othereDetails?.SHIRKAT?.total_pay_out || 0)}
            </TableCell>
            <TableCell align="center">ټول</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
</Grid>

<br/>
<Grid container spacing={2} justifyContent="center">
  {/* ================= TABLE 1 ================= */}
  <Grid item xs={12} sm={4}>
     {/* <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
             <TableCell colSpan={2} align="center">د رارسیدلی انتظار پارسلانو ارزښت</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">
                {customerOrders.filter(item => item.status == 'return').reduce((sum, order) => sum + (order.total_customer_charge || 0), 0)}
                {filteredData.receivedReturnOrdersValue}
            </TableCell>
            <TableCell align="center">رسیدګی <Download /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              {othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0}
            </TableCell>
            <TableCell align="center">لیږلي <Upload /></TableCell>
          </TableRow>

          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell align="center">
              {Number(othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0) -
               Number(othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0)}
            </TableCell>
            <TableCell align="center">ټول</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer> */}
  </Grid>

  {/* ================= TABLE 2 ================= */}
  <Grid item xs={12} sm={4}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">مکمله راپور</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">
              {custTotal}
            </TableCell>
            <TableCell align="center">رسیدګی ډیلیور  <Download /></TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
                -{recvShirkat}            
            </TableCell>
            <TableCell align="center">فروشګاه <Upload /></TableCell>
          </TableRow>
 

          <TableRow>
            <TableCell align="center">
                {Number(othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0) -
               Number(othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0)}            
            </TableCell>
            <TableCell align="center">حواله جات </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
                -{Number(othereDetails?.EMP_SALARY?.total_pay_out || 0) +
               Number(othereDetails?.EMP_ADVANCED?.total_pay_out || 0) +
               Number(othereDetails?.EXPENSE?.total_pay_out || 0) +
               Number(othereDetails?.SHIRKAT?.total_pay_out || 0)}          
            </TableCell>
            <TableCell align="center"> نور <Upload/></TableCell>
          </TableRow>

          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell align="center">
                {custTotal -recvShirkat  +  (othereDetails?.BRANCH_PAYMENT_FROM?.total_pay_in || 0) 
                -(othereDetails?.BRANCH_PAYMENT_TO?.total_pay_out || 0)
                 
                -((othereDetails?.EMP_SALARY?.total_pay_out || 0) +
               (othereDetails?.EMP_ADVANCED?.total_pay_out || 0) +
               (othereDetails?.EXPENSE?.total_pay_out || 0) +
               (othereDetails?.SHIRKAT?.total_pay_out || 0))    }
            </TableCell>
            <TableCell align="center">ټول</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
   <Grid item xs={12} sm={4}></Grid>

</Grid>
            </TableContainer>
            
        </>
    );
};

export default StateBox;