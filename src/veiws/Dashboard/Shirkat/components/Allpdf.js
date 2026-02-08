import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Table, TableBody, Modal, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Chip, Tooltip, Card, CardContent, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import PrintIcon from '@mui/icons-material/ArrowDropDown';
import { formatAfghanDate } from "../../../../components/Date/afghandate";
 
export default function AllPdf(props) {

const msg = props.message;

const dtFrom = formatAfghanDate(props.dateFrom);
const dtTo   = formatAfghanDate(props.dateTo); 
    console.log(dtFrom, dtTo , props.records)
    // const data = props.records.filter((order , index)=> !order.pay_out).sort((order)=>order.status == "OLD_Dues")
    const data = props.records
    .filter(order => !order.pay_out)
    .sort((a, b) => {
        if (a.status !== "OLD_Dues" && b.status == "OLD_Dues") return -1;
        if (a.status == "OLD_Dues" && b.status !== "OLD_Dues") return 1;
        return 0;
    });

     console.log(props)

     const Total = useMemo(()=>{
        if(!props.records){
            return false
        }
        return {
            Total : props.records
            .reduce((acc, order)=>order.total_customer_charge ? acc + parseFloat(order.total_customer_charge) : acc,0),

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
    
    const myfunc = () => {
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
                    <h1>${props.data.shirkat_name}</h1>
                    <p><strong>Date:</strong>
                        ${new Date().toLocaleDateString()}<br/>
                        ${new Date().toLocaleDateString("fa-AF-u-ca-persian")} </p>
                    <p><strong>Total Orders:</strong> ${data.length}</p>
                    
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
                                    <td> ${data.reduce((sum, order) => sum + (order.total_fees || 0), 0).toLocaleString()} </td> 
                                    <td> ${data.reduce((sum, order) => sum + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                    <td colspan='5'>${data.reduce((sum, order) => sum + (order.total_fees || 0) + (order.shirkat_charges || 0), 0).toLocaleString()} </td> 
                                </tr>
                        </tbody>
                    </table>
                    -->


                    <table>
                        <thead>
                            <tr>
                                            
                                <th> ایجاد شد </th>
                                <th>  فعلی </th>
                                <th> ارسال می شود</th>
                                <th>تریک نمره</th>
                                <th>کرایه</th>
                                <th>ارزش فروشګاه</th>
                                <th>جمله قیمت</th>
                                <th>اسم جنس</th>
                                <th>حالت</th>
                                <th>نیټه</th>
                                <th>نمره.</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map((order, index) => `
                                <tr>
                                    <td>${findBranch(order.brsrn) || '--'}</td>
                                    <td>${findBranch(order.hold_brsrn) || '--'}</td>
                                    <td>${order.parcel_destination || '--'}</td>
                                    <td>${order.track_number || '--'}</td>
                                    <td>${order.total_fees?.toLocaleString() || 0} </td>
                                    <td>${order.shirkat_charges?.toLocaleString() || 0} </td>
                                    <td>${order.total_customer_charge?.toLocaleString() || 0} </td>
                                    <td>${order.parcel_details || '--'}</td>
                                    <td>
                                    ${typeof order.status === 'string' ? order.status.toLowerCase() : ''}

                                    
                                    </td>
                                    <td>${formatAfghanDate(order.delivery_date) || '--'}</td>
                                    <td>${index + 1 || ''}</td>
                                </tr>
                            `).join('')}

                            <tr>
                                    <td colspan='4'>Total</td>
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
         
    }


    useEffect(()=>{
        if(props.counter > 0){
            myfunc()
        }
    },[props.counter])

  return (
    <>
    </>
                    
  )
}

