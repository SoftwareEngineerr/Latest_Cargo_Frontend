import React from 'react';
import Chart from 'react-apexcharts';
import { Paper, Typography } from '@mui/material';

const BusinessOverviewPieChart = ({ finaceInfo ={} }) => {
  //console.log( finaceInfo) 
  const {
    RemainigProdcutsCost = 0,
    Rroznamcha = 0,
    total_purchases = 0,
    total_sales = 0,
    Expense = 0,
    Investment = 0,
    totalTakenLoan = 0,
    totalGivenLoan= 0,
  } = finaceInfo;

  const chartSeries = [
    parseFloat(RemainigProdcutsCost),
    parseFloat(Rroznamcha),
    parseFloat(total_purchases),
    parseFloat(total_sales),
    parseFloat(Expense),
    parseFloat(Investment),
    parseFloat(totalTakenLoan),
    parseFloat(totalGivenLoan),
  ];

  const chartOptions = {
  chart: {
    type: 'donut',
  },
  labels: [
      'د موجوده جنسو ارزښت',
      'دخل',
      'ټوله خرید',
      'ټوله خرڅلاو',
      'توله مصرف',
      'ټوله پانګونه',
      'پر مونږ پاته پور',
      'پر مشتریانو پاته پور',
    ],
  colors: ['#ff9800', '#4caf50', '#03a9f4', '#e91e63', '#343df5', '#a45fff', '#f7f302', '#02f78f'],
  legend: {
    position: 'bottom',
  },
  tooltip: {
    y: {
      formatter: (value) => ` ${value.toLocaleString()}`,
    },
  },
  dataLabels: {
    formatter: (val, opts) => {
      const value = opts.w.config.series[opts.seriesIndex];
      return `${value.toLocaleString()}`;
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '55%',
        labels: {
          show: true,
          total: {
            show: false,
            label: 'Total',
            formatter: function (w) {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return ` ${total.toLocaleString()}`;
            },
          },
        },
      },
    },
  },
};


  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        عمومي کتنه
      </Typography>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={400}
      />
    </Paper>
  );
};

export default BusinessOverviewPieChart;
