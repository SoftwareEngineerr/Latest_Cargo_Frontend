import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownLeft, IconArrowUpLeft } from '@tabler/icons';

const ProductProfitChart = (props) => {
    // //console.log(props)
  const theme = useTheme(); 

  // Data for Profit and Loss 
  const info = props?.gTotal?.info
  //console.log(props?.gTotal?.info)
  const purchase = parseInt(props?.gTotal?.purchase);
  const retunSupplier = parseInt(props?.gTotal?.retunSupplier);
  const totalSold = parseInt(props?.gTotal?.totalSold);
  const totalRefund = parseInt(props?.gTotal?.totalRefund * -1);
// //console.log(totalRefund)
  // Chart options for Pie chart
  const optionsPieChart = {
    chart: {
      type: 'pie',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [props?.gTotal?.color1, props?.gTotal?.color2, props?.gTotal?.color3, props?.gTotal?.color4], // Green for profit, Red for loss
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    // labels: ['Purchase خرید ', 'Return Supplier  واپسی عرضه کوونکي ته ', 'Sold خرڅ سوی', 'Refund دکسټمر واپسی'], // Labels for pie slices
    labels: [' ', '' , '' , '' ,'' ,''], // Labels for pie slices
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
  };

  const seriesPieChart = [info?.total_investment, info?.profit_margin_percentage, info?.potential_revenue, info?.gross_profit]; // Series for Profit and Loss
// const calulcateProfit = (profit * 100) / loss
  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={5} sm={5}>
          <Typography variant="h3" fontWeight="700">
            {profit - loss || 0}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {
              calulcateProfit >= 0 ?
                <Avatar sx={{ bgcolor: successlight, width: 30, height: 30 }}>
                  <IconArrowUpLeft width={20} color="#39B69A" />
                </Avatar>
                :
                <Avatar sx={{ bgcolor: successlight, width: 30, height: 30 }}>
                  <IconArrowDownLeft width={20} color="red" />
                </Avatar>
            }
            <Typography variant="subtitle2" fontWeight="600">
              {calulcateProfit.toFixed(0)} %
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              <span>{props?.gTotal?.name}</span>
              <span style={{fontSize:'18px'}}>{props?.gTotal?.pName}</span>
            </Typography>
          </Stack>
        </Grid> */}

        <Grid item xs={7} sm={7}>
          <Chart
            options={optionsPieChart}
            series={seriesPieChart}
            type="pie"
            height="200px"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductProfitChart;
