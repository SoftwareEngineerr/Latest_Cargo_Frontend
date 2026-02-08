import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip, Tooltip, Card, CardContent, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import PrintIcon from '@mui/icons-material/ArrowDropDown';
import { formatAfghanDate } from "../../../../../../components/Date/afghandate";
 
function BranchOrders(props) {

const msg = props.message;

const dtFrom = formatAfghanDate(props.dateFrom);
const dtTo   = formatAfghanDate(props.dateTo); 
    console.log(dtFrom, dtTo)
    const customerOrders = props.customerOrders
            .filter((order , index)=> order.paytype !== "RETURN" && order.paytype !== "SHIRKAT")
     console.log(props)

     const Total = useMemo(()=>{
        if(!props.customerOrders){
            return false
        }
        return {
            Total : props.customerOrders
            .filter((order , index)=> order.paytype !== "RETURN" && order.paytype !== "SHIRKAT")
            .reduce((acc, order)=>order.total_customer_charge ? acc + parseFloat(order.total_customer_charge) : acc,0),

            OurFees : props.customerOrders
            .filter((order , index)=> order.paytype !== "RETURN" && order.paytype !== "SHIRKAT")
            .reduce((acc, order)=>order.total_fees ? acc + parseFloat(order.total_fees) : acc,0),
            
             ShirkatCharges :  props.customerOrders.reduce((acc, order) => {
    if (order.paytype !== "RETURN" && order.paytype !== "SHIRKAT") {
        return order.shirkat_charges
            ? acc + parseFloat(order.shirkat_charges)
            : acc;
    }
    return acc;
}, 0)
            
        }
    })


  return (
    
                    <Grid item lg={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {msg} ({customerOrders.length})
                            </Typography>
                            <Typography>
                                {dtFrom}
                            </Typography>
                            <Typography>
                                {dtTo}
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
                                        
                                        <!--<table>
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
                                        -->


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
                                                    <th>نیټه</th>
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
                                                        <td>${
                                                              order.status == "delivered"
                                                        ?
                                                        "delivered"
                                                        :
                                                        order.status == "RETURN"
                                                        ?
                                                        "Return"
                                                        :
                                                        order.status == "SHIRKAT"
                                                        ?
                                                        "Shirkat"
                                                        :
                                                        "Pending"
                                                        }</td>
                                                        <td>${formatAfghanDate(order.delivery_date) || 'N/A'}</td>
                                                        <td>${index + 1 || ''}</td>
                                                    </tr>
                                                `).join('')}

                                                <tr>
                                                        <td colspan='2'>Total</td>
                                                        <td> ${Total.OurFees} </td> 
                                                        <td> ${Total.ShirkatCharges}</td> 
                                                        <td colspan='6'>${Total.Total} </td> 
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
                                            '&:hover': { backgroundColor: '#ffa800' }
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
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نیټه</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نمره.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customerOrders
                                    .filter(order => order.paytype !== "RETURN" && order.paytype !== "SHIRKAT" )
                                    // .filter((order, index)=> order.paytype !== "RETURN" && order.paytype !== "SHIRKAT")
                                    .map((order, index) => (
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
                                                    label={
                                                        order.status == "delivered"
                                                        ?
                                                        "delivered"
                                                        :
                                                        order.status == "RETURN"
                                                        ?
                                                        "Return"
                                                        :
                                                        order.status == "SHIRKAT"
                                                        ?
                                                        "Shirkat"
                                                        :
                                                        "Pending"
                                                    }
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: order.status === 'Delivered' ? '#4caf50' :
                                                            order.status === 'OrderCreate' ? '#2196f3' : '#ff9800',
                                                        color: 'white'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {/* {index + 1} ,  */}
                                                {formatAfghanDate(order.delivery_date)}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'medium' }}>
                                                {index + 1}  
                                                {/* {order.srn} */}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* Totals Row */}
                                    <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                            <strong>Totals:</strong>
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                                    {
                                                        Total.OurFees
                                                    }
                                            {/* {customerOrders.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()} */}
                                        </TableCell>
                                        <TableCell sx={{ color: '#ed6c02', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                                    {
                                                        Total.ShirkatCharges
                                                    }
                                        </TableCell>
                                        <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '16px', padding: '12px' }}>
                                             {
                                                Total.Total
                                            }
                                        </TableCell>
                                        <TableCell colSpan={5} sx={{ fontWeight: 'bold', fontSize: '16px', padding: '12px', textAlign: 'center' }}>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Summary Card */}

                    </Grid>
                    
  )
}


// import React, { useMemo } from 'react'
// import PropTypes from 'prop-types'

// const BranchOrders = (props) => {
    
//   return (
//     <div>
       
//     </div>
//   )
// }

BranchOrders.propTypes = {}

export default BranchOrders