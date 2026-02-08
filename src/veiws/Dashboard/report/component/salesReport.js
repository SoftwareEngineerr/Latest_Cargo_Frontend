import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    ArcElement, 
    PointElement, 
    LineElement, // Register LineElement
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from '@mui/material';
import { FullDate } from '../../../../components/Date/FullDate';

// Register necessary chart elements
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    ArcElement, 
    PointElement, 
    LineElement, // Make sure to register this
    Title, 
    Tooltip, 
    Legend
);

const SalesReport = () => {
    const api = useSelector((state) => state.Api);
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [topProducts, setTopProducts] = useState([]);
    const [supplierSales, setSupplierSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 10))); // Last 10 days
    const [endDate, setEndDate] = useState(new Date());
    const [profitLostData, setProfitLostData] = useState([]);

    const fetchSales = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        try {
            const response = await axios.post(api.showSales, { startDate, endDate }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                setSalesData(response.data.sales_data || []);
                setTotalSales(response.data.total_sales || 0);
                setTopProducts(response.data.top_sold_products || []);
                setSupplierSales(response.data.supplier_sales || []);
            }
        } catch (err) {
            console.error('Error fetching sales:', err);
        }
    };

    const fetchProfitAndLost = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        try {
            const response = await axios.post(api.profitAndLost, { startDate, endDate }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {

                //console.log(response.data)
                setProfitLostData(response.data)
            }
        } catch (err) {
            console.error('Error fetching sales:', err);
        }
    };

    useEffect(() => {
        fetchProfitAndLost();
        fetchSales();
        //console.log(startDate, endDate)
    }, [startDate, endDate]);

    // Line chart data for daily sales
    const salesChartData = {
        labels: salesData.map((item) => item.date),
        datasets: [
            {
                label: 'Daily Sales',
                data: salesData.map((item) => item.daily_sales),
                fill: true,
                borderColor: 'rgb(255, 72, 39)',
                tension: 0.5
            }
        ]
    };

    // Bar chart data for top 10 sold products with profit
    const topProductsChartData = {
        labels: topProducts.map((item) => item.product_name),
        datasets: [
            {
                label: 'Quantity Sold',
                data: topProducts.map((item) => item.total_quantity_sold),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Profit',
                data: topProducts.map((item) => item.total_profit),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Pie chart data for supplier sales
    const supplierSalesChartData = {
        labels: supplierSales.map((item) => item.supplier_name),
        datasets: [
            {
                label: 'Total Sales by Supplier',
                data: supplierSales.map((item) => item.total_sales),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    // Add more colors if needed
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    // Matching border colors
                ],
                borderWidth: 1
            }
        ]
    };
    
    const ChangeDateFrom = (e) => { 
        setStartDate(`${e.$y}-${e.$M + 1}-${e.$D}`)  
      }
    const ChangeDateTo = (e) => {  
    setEndDate(`${e.$y}-${e.$M + 1}-${e.$D}`)    
    }
    return (
        
        <div>
            <h2>د خرڅلاو عمومي کتنه</h2> 
            <Grid item lg={12}>
               <label>From</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                 <span> To </span>
                 <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
             </Grid>
            {/* <Grid item lg={12}>
                                <Grid container spacing={2}> 
                                    <Grid item lg={1}></Grid>
                                    <Grid item lg={5}>
                                       <FullDate throwfullevent={ChangeDateFrom}  name='startDate' />
            
                                    </Grid>
                                    <Grid item lg={5}>
                                    <FullDate throwfullevent={ChangeDateTo}  name='endDate' />
            
                                    </Grid>
                                    <Grid item lg={1}></Grid>
                                </Grid>
                            </Grid> */}
            <Grid item lg={12}>
                <div>
                    <h3>ټول خرڅلاو: {totalSales.toFixed(0)}</h3>
                </div>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    {/* <h3>ورځنی خرڅلاو</h3> */}
                </div>
            </Grid>
            <Grid item lg={12}>
                <Grid lg={6}>
                    <Line data={salesChartData} />
                </Grid>
                <Grid lg={6}>
                    
                </Grid>
            </Grid>
            



            <div style={{ width: '80%', margin: '0 auto', marginTop: '40px' }}>
                <h3>۱۰ غوره پلورل شوي جنس او ګټه</h3>
                <Bar data={topProductsChartData} />
            </div>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '40px' }}>
                <h3>Total Sales by Supplier</h3>
                <Pie data={supplierSalesChartData} />
            </div>
        </div>
    );
};

export default SalesReport;
