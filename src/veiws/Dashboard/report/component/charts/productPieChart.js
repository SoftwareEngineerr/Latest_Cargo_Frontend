import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownLeft, IconArrowUpLeft } from '@tabler/icons';

const ProductPieChart = (props) => {
  //console.log(props)
  
  const theme = useTheme();
  const successlight = theme.palette.success.light;
  const info = props?.gTotal?.info || {};
  const prodPrice = props?.gTotal?.productPrice || "0";
  const prodPriceHistory = props?.gTotal?.productPricingHistory || [];
  
  // Convert all numeric values to proper numbers
  const purchase = parseFloat(props?.gTotal?.purchase) || 0;
  const retunSupplier = parseInt(props?.gTotal?.retunSupplier) || 0;
  const totalSold = parseInt(props?.gTotal?.totalSold) || 0;
  const totalRefund = Math.abs(parseFloat(props?.gTotal?.totalRefund) || 0);
   
   // Prepare chart data
  const seriesPieChart = [
    parseFloat(info?.total_investment || 0),
    parseFloat(info?.revenue_in_period || 0),
    Math.abs(parseFloat(info?.gross_profit || 0))
  ].filter(val => !isNaN(val));

  //console.log( prodPriceHistory)
  // Chart options for Pie chart
  const optionsPieChart = {
    chart: {
      type: 'pie',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: { show: false },
      height: 200,
    },
    colors: [
      props?.gTotal?.color2 || '#1d72fd',
      props?.gTotal?.color1 || '#FFCA00',
      parseFloat(info?.gross_profit) >= 0 
        ? props?.gTotal?.color3 || '#0f9b00' 
        : props?.gTotal?.color4 || '#ff3300'
    ],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '70%'
        }
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: (val) => `؋${val.toFixed(2)}`
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      formatter: (legendName, opts) => {
        return `${legendName}: ؋${seriesPieChart[opts.seriesIndex].toFixed(2)}`;
      }
    },
    labels: ['ټوټل پانګونه', 'ټول خرڅ', 'اټکل ګټه/تاوان'],
    responsive: [{
      breakpoint: 991,
      options: {
        chart: { width: 150 }
      }
    }]
  };

  // const seriesPieChart = [purchase, retunSupplier, totalSold, totalRefund]; // Series for Profit and Loss
  // const seriesPieChart = [info?.total_investment, info?.revenue_in_period, info?.gross_profit > 0 ? info?.gross_profit : (info?.gross_profit * -1)]; // Series for Profit and Loss
  const calulcateProfit = info?.profit_margin_percentage
  return (
    <>
      <Grid container spacing={2} className='productPiaChart'>
        <Grid item xs={7} sm={7}>
          {/* <Typography variant="h3" fontWeight="700">
            {purchase - totalSold || 0}
          </Typography> */}
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {
              info?.profit_margin_percentage >= 0 ?
                <Avatar sx={{ bgcolor: successlight, width: 30, height: 30 }}>
                  <IconArrowUpLeft width={20} color="#39B69A" />
                </Avatar>
                :
                <Avatar sx={{ bgcolor: successlight, width: 30, height: 30 }}>
                  <IconArrowDownLeft width={20} color="red" />
                </Avatar>
            }
            <Typography variant="subtitle2" fontWeight="600">
              {parseFloat(info?.profit_margin_percentage)?.toFixed(0)} %
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              <span>{info?.product_name}</span>
              {/* <span style={{fontSize:'18px'}}>{props?.gTotal?.pName}</span> */}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {/* <span style={{fontSize:'18px'}}>ټوله پانګه</span>
            <span>{info?.total_investment}/-</span> */}
            <Grid container spacing={1}>
              <Grid item lg={6}>
                <table>
                  <tr>
                    <td>افغانی{info ? info?.total_investment : null} </td>
                    <td><span>ټوټل پانګونه</span></td>
                  </tr>
                  <tr>
                    <td>{purchase}</td>
                    <td><span>ټول خرید مقدار</span></td>
                  </tr>
                  <tr>
                    <td>{totalSold}</td>
                    <td><span>ټول  خرڅ  مقدار</span></td>
                  </tr>
                  {/* <tr>
                    <td>{(totalRefund + retunSupplier)}</td>
                    <td><span>ټول  واپس  مقدار</span></td>
                  </tr>                  */}
                  <tr>
                    <td>{purchase - ((totalRefund * -1) + retunSupplier + totalSold)}</td>
                    <td><span>ټول پاته مقدار</span> 
                    {/* <span>purchase{purchase}</span>
                    
                    <span> refund{totalRefund}</span>
                    <span> supplier refund{ retunSupplier}</span>
                    <span> sold { totalSold}</span> */}
                    </td>
                  </tr>
                  <tr>
                    <td>افغانی{parseFloat(props?.gTotal?.productPricingHistory[0]?.average_price)?.toFixed(2)} </td>
                    <td><span>خرید قیمت اوسط</span></td>
                  </tr>
                   <tr>
                    <td>افغانی{prodPrice} </td>
                    <td><span> فروش قیمت</span></td>
                  </tr>
                </table>
              </Grid>
              <Grid item lg={6}>
                <table>
                  <tr>
                    <td>
                    {prodPriceHistory.map((item, ind) => (
                      <>{` ${item?.new_price},`}</>
                    ))}
                    </td>
                    <td><span>دجنس د قیمت بدلون</span></td>
                  </tr>
                  <tr>
                    <td>{info?.total_discounts}</td>
                    <td><span>ټوټل تخفیف</span></td>
                  </tr>
                  <tr>
                    <td>{info?.average_discount_per_unit}</td>
                    <td><span>اوسط تخفیف</span></td>
                  </tr>
                  <tr>
                    <td>{info?.revenue_in_period}</td>
                    <td><span> نغدی کړی</span></td>
                  </tr>
                  <tr>
                    <td>{parseFloat(info?.gross_profit)?.toFixed(2)}</td>
                    <td><span>اټکل ګټه/تاوان</span></td>
                  </tr>
                </table>
              </Grid>
            </Grid>
            
          </Stack>
          <Grid container spacing={1}>
            {/* <Grid item lg={12}>
                   <table>
                    <tr><td colSpan={1}>دجنس د قیمت بدلون</td></tr>
                    {prodPriceHistory.map((item, ind) => (
                      <tr>
                      <td>{` ${item?.new_price}`}</td>
                      </tr>
                    ))}
                  </table>
           </Grid> */}
            </Grid>
        </Grid>

          <Grid item xs={4} sm={4} style={{ minHeight: '300px' }}>
          {seriesPieChart.length > 0 && seriesPieChart.some(val => val > 0) ? (
            <Chart
              options={optionsPieChart}
              series={seriesPieChart}
              type="pie"
              height={300}
            />
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              No data available for chart
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPieChart;
