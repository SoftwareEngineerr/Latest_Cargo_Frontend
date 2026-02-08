import React from 'react';
import Chart from 'react-apexcharts';
import { Paper, Typography } from '@mui/material';

const MostSoldItemsBarChart = ({ data }) => {
  //console.log(data)
  const productNames = data.map((item) => item.product_name);
  const unitsSold = data.map((item) => parseFloat(item.total_units_sold)?.toFixed(2));
  const avgPrices = data.map((item) => parseFloat(item.average_selling_price)?.toFixed(2));
  const revenues = data.map((item) => parseFloat(item.total_revenue)?.toFixed(2));

  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: { show: false },
    },
      colors: ['#f44336', '#4caf50', '#2196f3'], // red, green, blue
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: productNames,
      labels: {
        rotate: -45,
        style: { fontSize: '12px' },
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartSeries = [
    {
      name: 'پلورل سوي تعداد',
      data: unitsSold,
    },
    {
      name: 'اوسط قیمت',
      data: avgPrices,
    },
    {
      name: 'ټول عواید',
      data: revenues,
    },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        لس غوره پلورل شوي توکي
      </Typography>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </Paper>
  );
};

export default MostSoldItemsBarChart;
