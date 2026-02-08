import React , { useEffect, useRef, useState }  from 'react'
import PropTypes from 'prop-types'
import CustomForm from '../../../components/form/form'
import { Main } from '../../../constant'
import { CustomBtn } from '../../../components/button/button'
import { Box, Card, Grid, Typography, Switch, FormControlLabel } from '@mui/material'
import CustomTable from './components/SampleTableIncome'
import PageContainer from '../../../components/Container/pageContainer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useTheme } from '@emotion/react'
import YearlyBreakup from './components/YearlyBreakup'
import { ShowLoader } from '../../../redux/actions/loader'
import './income.css'
import MostSoldItemsChart from './components/mosstSoltItemsChart'
import BusinessOverviewPieChart from './components/sumationPieChart'
import ProductPurchasedAverageCost from './components/productsPurchasedCost'
import ProductSoldItemsList from './components/productSoldItems'
import FinanceMajorColumns from './components/financeMajorColumns'

const Parceldash = (props) => {
    const [data , setData ] = useState(Main().Income)
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const dispatch = useDispatch();
    const url = useSelector((state) => state.Api);
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));
    const theme = useTheme();
    const style = theme.palette; 
    const [inputValues, setInputValues] = useState({...initialInputValues });
    const [expenses, setExpenses] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [genItems, setGenItems] = useState([]);
    const [mostSoldItems, setMostSoldItems] = useState([]);
    const [businessInfo, setBusinessInfo] = useState([]);
    const [productCosts, setProductCosts] = useState([]);
    const [productSoldItems, setProductSoldItems] = useState([]);
    const [fromDate, setFromDate] = useState("2025-01-01");
    const [toDate, setToDate] = useState(() => {
    const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0]; // returns "YYYY-MM-DD"
    });
 
    const [allFinanceItems, setAllFinanceItems] = useState({});
    const [showForm, setShowForm] = useState(false);
    const initGen = useRef(false)
    const initTen = useRef(false)
    const initCustAnd = useRef(false)

    const ChangeDate = (e, name) => {
        const converterToDate = new Date(e);
        
        // Format month and day with leading zeros
        const year = converterToDate.getFullYear();
        const month = String(converterToDate.getMonth() + 1).padStart(2, '0');
        const day = String(converterToDate.getDate() + 1).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        // //console.log(formattedDate);
        
        if (name === 'FromDate') {
            setFromDate(formattedDate);
        }
        if (name === 'ToDate') {
            setToDate(formattedDate);
        }
    }
    useEffect(() => {
        if (fromDate && toDate) {
            fetchMostSoldItems();
            fetchGeneralInfo();
            fetchCustomerAndSuppLoans();
        }
    }, [ toDate]);

    const fetchCustomerAndSuppLoans = () => { 
        if(initCustAnd.current) return
        initCustAnd.current = true
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
          try {
            //   dispatch(ShowLoader('1'))
              axios.post(`${url.showCustomerAndSuppLoan}`, {  fromDate, toDate }, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userToken}`,
                  },
              })
              .then((res) => {
                  if (res.status === 200) { 
                    // //console.log(res.data)
                    const soldItems = res?.data?.purchases
                        ?.filter(item => item.total_price) // filters out falsy (e.g. 0, null)
                        .sort((a, b) => b.purchase_order_id - a.purchase_order_id); // sorts descending

                    setProductSoldItems(soldItems)
                  }
              })
              .catch((err) => { 
              });
          } catch (err) { 
          }
    }

    const fetchGeneralInfo = () => {
        if(initGen.current) return
        initGen.current = true
          try {
              dispatch(ShowLoader('1'))
              axios.post(`${url.fetchGeneralItems}`, {fromDate, toDate}, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userToken}`,
                  },
              })
              .then((res) => {
                  if (res.status === 200) { 
                    // //console.log(res.data)
                    setGenItems(res?.data?.data);
                    setAllFinanceItems(prevItems => ({
                        ...prevItems,       // spread previous state
                        Rroznamcha: parseFloat(res?.data?.data?.majorItems?.net_cash_flow)?.toFixed(0),
                        totalGivenLoan : parseFloat(res?.data?.data?.majorItems?.customer_credit_outstanding)?.toFixed(0),
                        totalTakenLoan : parseFloat(res?.data?.data?.majorItems?.outstanding_supplier_credit)?.toFixed(0),
                        totalSuppRefund : parseFloat(res?.data?.data?.majorItems?.net_refund_bycustomer)?.toFixed(0)
                    }));
                    dispatch(ShowLoader('0'))
                  }
              })
              .catch((err) => { 
              });
          } catch (err) { 
          }
    }
    const fetchMostSoldItems = () => {
        if(initTen.current) return
        initTen.current = true
          try {
            //   dispatch(ShowLoader('1'))
              axios.post(`${url.mostSoldItems}`, {fromDate, toDate},{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userToken}`,
                  },
              })
              .then((res) => {
                  if (res.status === 200) { 
                    // //console.log(res?.data?.expenses)
                    setMostSoldItems(res?.data?.data);
                    setBusinessInfo(res?.data?.moreInfo)
                    setProductCosts(res?.data?.productCost)

                    
                   const totalValue = res?.data?.productCost?.reduce((sum, item) => sum + parseFloat(item.total_value || 0), 0);
                    // //console.log(totalValue)
                    const fetchExp = res?.data?.expenses
                    const totalExpense = fetchExp.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
                    // //console.log(totalExpense)
                    setExpenses(totalExpense)
                    const fetchInvest = res?.data?.capitalInvestments
                    const totalInvest = fetchInvest.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
                    setInvestment(totalInvest)
                    // //console.log(totalInvest)
                    
                    setAllFinanceItems(prevItems => ({
                        ...prevItems,    
                        Expense: totalExpense,
                        Investment: totalInvest,
                        RemainigProdcutsCost: parseFloat(totalValue)?.toFixed(2),
                        total_purchases : res?.data?.moreInfo[0]?.total_purchases,
                        total_sales : res?.data?.moreInfo[0]?.total_sales,
                        current_inventory_value : res?.data?.moreInfo[0]?.current_inventory_value,                         
                    }));
                  }
              })
              .catch((err) => { 
              });
          } catch (err) { 
          }
    }
      
 useEffect(()=>{
    fetchMostSoldItems()
    fetchGeneralInfo()
    fetchCustomerAndSuppLoans()
 },[])

    const SelectAllTime = () => {
        setShowForm(prev => !prev)
        setFromDate("2025-01-01")
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setToDate(tomorrow.toISOString().split('T')[0])
    }
    
  return (
      <PageContainer title={data.title} description={data.description}>
        {genItems.length}

        <Box className='incomeC' >
                    <Grid container>
                        <Grid item lg={3} xs={12} xl={3} mt={1}></Grid>

                        

                        <Grid item lg={3} xs={12} xl={3} mt={1}></Grid>
                    </Grid>

                     
                    <Grid container>
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students'>
                                <h1 className='numstd'>dsf2</h1>
                                {/* <h1 className='nonActive'>{parseFloat(genItems?.majorItems?.supplier_returns).toFixed(0)}  بیرته ستنیدل عرضه کوونکی</h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.products?.total_quantity_in).toFixed(2)}  </b>  ټوټل رانیول سوی  جنس </h1> */}
                                <h1 className='number'>19</h1>
                                <h1 className='activestd'> Kabul Branch </h1>
                                {/* <h1 className='nonActive'><b>{parseFloat(genItems?.products?.total_quantity_out)?.toFixed(2)}  </b>  خرڅ سوی جنس </h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.products?.remaining_quantity)?.toFixed(2)}  </b>  موجود جنس  </h1> */}
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students teacher'>
                                <h1 className='numstd'>Afgh</h1>
                                {/* <h1 className='nonActive'> نغدی سوی <b>{parseFloat(parseFloat(genItems?.majorItems?.total_sales) +  parseFloat(genItems?.majorItems?.net_refund_bycustomer)).toFixed(2) }  </b> </h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.majorItems?.net_refund_bycustomer)?.toFixed(2)}  </b>  مشتری بیرته ستنیدل</h1> */}
                                <h1 className='number'>324</h1>
                                <h1 className='activestd'>Herat Branch</h1>
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.majorItems?.net_cash_flow)?.toFixed(0)}  </b>  دخل </h1> */}
                                {/* <h1 className='nonActive'><b>{parseFloat(genItems?.majorItems?.gross_profit_estimate)?.toFixed(0)}  </b>اټکل سوی ټول ګټه/تاوان</h1> */}
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students defaulters'>
                                <h1 className='numstd'>6832</h1>
                                {/* <h1 className='nonActive'> قسمونه جنس <b>{genItems?.products?.unique_product_count}  </b> </h1> */}
                                {/* <h1 className='number'>{availAndRemovedStudents ? availAndRemovedStudents?.totalEnrolledStdFeeDefaulters :
                                    <CustomBtn style={{width: '40px'}} type="button" click={()=>fetchLateFees()} data="Load..."/>
                                }</h1> */}
                                <h1 className='number'>453</h1>
                                <h1 className='activestd'> Kandahar Branch</h1>
                                {/* <h1 className='nonActive'><b>{genItems?.majorItems?.customer_credit_outstanding?.toFixed(0)}  </b>  ټوټل ښاګردان چی بقایات لری </h1> */}
                                {/* <h1 className='nonActive'><b>{availAndRemovedStudents?.totalEnrolledStdFeeDefaulters}  </b>  غیرفعال </h1> */}
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students teacher removedDefaulters'>
                                <h1 className='numstd'>خ ا ن</h1>
                                {/* <h1 className='number'>{availAndRemovedStudents ? availAndRemovedStudents?.totalRemovedStdFeeDefaulters :
                                    <CustomBtn style={{width: '40px'}} type="button" click={()=>fetchLateFees()} data="Load..."/>
                                    }</h1> */}
                                <h1 className='number'>60</h1>
                                <h1 className='activestd'> Mazari Sharif Branch </h1>
                                {/* <h1 className='nonActive'><b>{availAndRemovedStudents?.defaultersLeftSchool}  </b>  خارج سوی ښاګردان </h1> */}
                            </Box>
                        </Grid> 
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students'>
                                <h1 className='numstd'>dsf2</h1>
                                {/* <h1 className='nonActive'>{parseFloat(genItems?.majorItems?.supplier_returns).toFixed(0)}  بیرته ستنیدل عرضه کوونکی</h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.products?.total_quantity_in).toFixed(2)}  </b>  ټوټل رانیول سوی  جنس </h1> */}
                                <h1 className='number'>19</h1>
                                <h1 className='activestd'> Zabul Branch </h1>
                                {/* <h1 className='nonActive'><b>{parseFloat(genItems?.products?.total_quantity_out)?.toFixed(2)}  </b>  خرڅ سوی جنس </h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.products?.remaining_quantity)?.toFixed(2)}  </b>  موجود جنس  </h1> */}
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12} xl={6} mt={1}>
                            <Box className='students teacher'>
                                <h1 className='numstd'>Afgh</h1>
                                {/* <h1 className='nonActive'> نغدی سوی <b>{parseFloat(parseFloat(genItems?.majorItems?.total_sales) +  parseFloat(genItems?.majorItems?.net_refund_bycustomer)).toFixed(2) }  </b> </h1> */}
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.majorItems?.net_refund_bycustomer)?.toFixed(2)}  </b>  مشتری بیرته ستنیدل</h1> */}
                                <h1 className='number'>324</h1>
                                <h1 className='activestd'>Kunduz Branch</h1>
                                {/* <h1 className='totalQuantity'><b>{parseFloat(genItems?.majorItems?.net_cash_flow)?.toFixed(0)}  </b>  دخل </h1> */}
                                {/* <h1 className='nonActive'><b>{parseFloat(genItems?.majorItems?.gross_profit_estimate)?.toFixed(0)}  </b>اټکل سوی ټول ګټه/تاوان</h1> */}
                            </Box>
                        </Grid>
                                
                    </Grid> 
                     
                    <Grid container>
                        <Grid item lg={6} xs={6} xl={6} mt={1}>
                            <ProductPurchasedAverageCost data={productCosts} />
                        </Grid>
                        <Grid item lg={6} xs={6} xl={6} mt={1}>
                            <ProductSoldItemsList data={productSoldItems} />
                        </Grid>
                    </Grid>
                     
                    
        </Box>
            
         
    </PageContainer>
  )
}

Parceldash.propTypes = {}

export default Parceldash
