import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownLeft, IconArrowUpLeft } from '@tabler/icons';

import DashboardCard from '../../../../components/shared/DashboardCard';

const YearlyBreakup = (props) => {
  ////console.log(props)
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart options for Pie chart
  const optionsPieChart = {
    chart: {
      type: 'pie',  // Ensure it's set to 'pie'
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ['#47a54b', '#c3f503', '#03f5bf', '#ffc0cb', '#ff7800'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        // Removed donut property, as it's for donut charts, not pies
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: true, // Show stroke around pie slices
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    legend: {
      show: true, // Show legend to identify labels
      position: 'bottom',
    },
    labels: ['فیس', 'بسنه', 'ټرانسپورټ', 'لګښت', 'معاش'], // Labels for pie slices
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120, // Responsive chart width
          },
        },
      },
    ],
  };

  const seriesPieChart = [props.data.paymemt?.[0], props.data.paymemt?.[1], props.data.paymemt?.[2], props.data.paymemt?.[3], props.data.paymemt?.[4]];

  return (
    <DashboardCard title="">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            AFN  {props?.gTotal?.ThirdRow?.Income}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {
                props.totalInc >= 0 ?
                <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#39B69A" />
                </Avatar>
                :
                <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                  <IconArrowDownLeft width={20} color="red" />
                </Avatar>
            }
            <Typography variant="subtitle2" fontWeight="600">
              {props.totalInc > 0 ? props.percentage : -props.percentage} %
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Total Income
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {props.getdate.FromDate}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {props.getdate.ToDate}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionsPieChart}
            series={seriesPieChart}
            type="pie"
            height="200px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
