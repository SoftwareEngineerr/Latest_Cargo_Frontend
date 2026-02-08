import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Button, TextField, MenuItem, IconButton, Slider, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AccessibleTable from "../component/table";
import { POS } from "../../../../constant/pos";
// import SuggestionInput from "../../../../components/suggestionInput/suggestionInput";
import SuggestionProducts from "./suggestionProducts";
import { CustomBtn } from "../../../../components/button/button";
import PurchaseInvoiceTable from "./muiTablePurchase";
import SaleTable from "./muiTableSale";
import dayjs from "dayjs";
import { ShowLoader } from '../../../../redux/actions/loader';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Date } from "../../../../components/Date/Date";
import { FullDate } from "../../../../components/Date/FullDate";
import CustomForm from "../../../../components/form/form";
import SupplierRefundTable from "./muiTableSupplierReturn";
import ProductPieChart from "./charts/productPieChart";
import ProductProfitChart from "./charts/productProfitChart";
// const categoryOptions = ["Antibiotics", "Pain Relievers", "Vitamins", "Antiseptics", "Allergy Medications"]; // Static category list

const ProductDetails = () => {
    const [data, setData] = useState(POS().Report.ReportProductPage);
    const api = useSelector((state) => state.Api);
    const [productsSuggestions, setProductsSuggestions] = useState([]);
    const [startDate, setStartDate] = useState(dayjs().subtract(30, "day"));
    const [endDate, setEndDate] = useState(dayjs());
    const [clickedProduct, setClickedProduct] = useState();
    const [productPrice, setProductPrice] = useState(0);
    const [checkProductPrice, setCheckProductPrice] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [productInfo, setProductInfo] = useState({ totalPurchase: 0, totalReturn: 0, totalSold: 0, totalRefund: 0 });
    const [selectedProducts, setSelectedProducts] = useState([
        { productName: "", batchNumber: "", formula: "", catagoryNumber: "", invoiceDate: "", quantity: "", unitPurchasePrice: "", unitSalePrice: "", totalPrice: 0, description: "", barcode: "", image: null }
    ]);
    const dispatch =  useDispatch();
    const [purchaseData, setPurchaseData] = useState([]);
    const [suppRefund, setSuppRefund] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [refundData, setRefundData] = useState([]);
    const [productProfitInfo, setProductProfitInfo] = useState();
    const [productPricingHistory, setProductPricingHistory] = useState();
    const [productInDatesAvailable, setProductInDatesAvailable] = useState(false);
    const initialProd = useRef(false);

    const fetchProducts = async () => {
        if(initialProd.current) return
        initialProd.current = true
        dispatch(ShowLoader('1'))
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.get(api.showProducts, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                //console.log(response.data);
                if (selectedProducts.length === 1 && selectedProducts[0].productName === "") {
                    setProductsSuggestions(response.data.data);
                }
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [api.showSupplier]);

    const productProfit = async (productId, From, To) => {
        // showSingleProduct
        dispatch(ShowLoader('1'))
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.post(api.showSingleProduct, { productId: productId, From, To }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                const resp = response?.data?.price_history
                // Keep only the latest entry for each unique `new_price`
                const uniquePrices = [];
                const seen = new Set();

                //console.log(response?.data?.price_history)
                for (const item of resp) {
                    if (!seen.has(item.new_price)) {
                        seen.add(item.new_price);
                        uniquePrices.push(item);
                    }
                }
                setProductInDatesAvailable(true)
                setProductProfitInfo(response?.data?.data)
                setProductPricingHistory(uniquePrices)
                dispatch(ShowLoader('0'))
            }
            else{
                setProductInDatesAvailable(false)
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setProductInDatesAvailable(false)
        }
    }

    const fetchProductDetails = async (productId, From, To) => {
        dispatch(ShowLoader('1'))
        //console.log(To)
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.post(api.showProductDetail, { productId: productId, From, To }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                productProfit(productId, From, To)
                // //console.log(response.data);
                const purchased = response?.data?.purchases
                const refunds = response?.data?.supplier_refunds
                setPurchaseData(purchased)
                setSuppRefund(refunds)
                const sales = response?.data?.sales
                const positiveSales = sales.filter(item => item.quantity_sold >= 0);
                const refundSales = sales.filter(item => item.quantity_sold < 0);
                setSalesData(positiveSales)
                setRefundData(refundSales)

                const purchasedTotal = purchased.reduce((sum, item) => sum + parseFloat(item.quantity_ordered || 0), 0);
                const refundTotal = refunds.reduce((sum, item) => sum + parseFloat(item.quantity_ordered || 0), 0);

                const positiveQuantityTotal = positiveSales.reduce((sum, item) => sum + parseFloat(item.quantity_sold || 0), 0);
                const negativeQuantityTotal = refundSales.reduce((sum, item) => sum + parseFloat(item.quantity_sold || 0), 0);
                //console.log(positiveQuantityTotal, negativeQuantityTotal)
                //console.log(purchasedTotal, refundTotal)
                setProductInfo((item) => ({ ...item, totalPurchase: purchasedTotal, totalReturn: refundTotal, totalSold: positiveQuantityTotal, totalRefund: negativeQuantityTotal }))
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }
    const handleProductSelect = (product) => {
        //console.log(product)
        // //console.log(product.split(',')[5])
        //fetchProductDetails(product[0])
        setClickedProduct(product)
        setPurchaseData([])
        setProductPrice(parseInt(product.split(',')[3]))
        setCheckProductPrice(parseInt(product.split(',')[3]))
    }

    const changeProductPrice = async () => {
        dispatch(ShowLoader('1'))
        const productId = clickedProduct?.split(',')[0].trim()
        const newPrice = productPrice
        const oldPrice = clickedProduct?.split(',')[3].trim()
        //console.log(productId, newPrice, oldPrice)
        // //console.log(productsSuggestions)
        const avPrice = productsSuggestions.filter((it)=>it.product_id === parseInt(productId))
        const averagePrice = avPrice[0]?.average_price
        //console.log(averagePrice)
        // return false
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.post(api.productPriceUpdate, { productId, newPrice, oldPrice, averagePrice }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log(response )
            if (response.status === 200) {
                dispatch(ShowLoader('0'))
                //console.log(response.data);
                dispatch({
                    type: 'SHOW_MODAL',
                    response: response.data,
                    severity: 'Success'
                })
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }
    const ChangeDateFrom = (e) => {
        const year = e.$y;
        const month = String(e.$M + 1).padStart(2, '0'); // Ensure 2 digits
        const day = String(e.$D).padStart(2, '0');       // Ensure 2 digits

        const formattedDate = `${year}-${month}-${day}`;
        //console.log(formattedDate)// if(clickedProduct.length <=0 )alert('مهرباني وکړئ توکي وټاکئ') 
        setStartDate(formattedDate)
        // fetchProductDetails(clickedProduct?.split(',')[0])

    }
    const ChangeDateTo = (e) => {
        const year = e.$y;
        const month = String(e.$M + 1).padStart(2, '0'); // Ensure 2 digits
        const day = String(e.$D).padStart(2, '0');       // Ensure 2 digits
        const formattedDate = `${year}-${month}-${day}`;
        //console.log('Clicked product:', formattedDate);
        if (startDate && formattedDate < startDate) {
            alert('ختم نیټه باید د شروع نیټې څخه وروسته وي');
            return;
        }
        setEndDate(formattedDate);
        fetchProductDetails(clickedProduct?.split(',')[0], startDate, formattedDate);
    };


    const updateProductPrice = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setProductPrice(value);
        }
        //console.log(checkProductPrice, value)
        if(parseFloat(checkProductPrice) != parseFloat(value))
            setBtnDisabled(true)
        else
            setBtnDisabled(false)
    };

    return (
        <>
            <Grid container>
                <Grid lg={4}>
                </Grid>
                <Grid lg={4}>
                    {productsSuggestions && (
                        <SuggestionProducts
                            simple="true"
                            handleInputChange={(e) => handleProductSelect(e.target.value)}
                            Suggestions={productsSuggestions}
                            // name={data.product_id}
                            placeholder="  جنس انتخاب Product"
                        // onDelete={handleDelete}
                        />
                    )}
                </Grid>
                <Grid lg={2}>
                </Grid>
                <Grid lg={2}>
                </Grid>
            </Grid>
            <Grid container className="updatePrice">
                <Grid item lg={12}>
                    <Grid container spacing={2}> {/* Added container and spacing for better layout */}
                        <Grid item lg={3}></Grid>
                        <Grid item lg={3}>
                            <TextField
                                type='number'
                                name='priceChange'
                                label='دجنس خرڅولو قیمت'
                                value={productPrice}
                                onChange={updateProductPrice}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={3}>
                            <CustomBtn click={changeProductPrice} disable={!btnDisabled} data='قیمت بدل کړئ' style={{ margin: 'auto', display: 'block', Padding: '10px' }} />
                        </Grid>
                        <Grid item lg={3}></Grid>
                    </Grid>
                </Grid>
            </Grid>
            {clickedProduct && clickedProduct.length > 0 ? (

                <Grid container>
                    <Grid item lg={12}>
                        {/* <h1>لاندې تاسو کولی شئ د جنس راپور وپلټئ</h1> */}
                        <h1 style={{textAlign:'center'}}>لاندې تاسو کولی سئ د جنس راپور شروع تاریخ او تر تاریخ اخیر پوری وپلټئ</h1>
                    </Grid>

                    <Grid item lg={12} container>
                        <Grid item lg={2}></Grid>
                        <Grid item lg={8} container>
                            <Grid item lg={12}>
                                {/* <p style={{margin:'0px',textAlign:'right'}}> شروع تاریخ</p> */}
                                <FullDate throwfullevent={ChangeDateFrom} name='startDate' />

                            </Grid>
                            <Grid item lg={12}>
                                {/* <p style={{margin:'0px'}}>تاریخ اخیر</p> */}
                                <FullDate throwfullevent={ChangeDateTo} name='endDate' />

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} className="noSalePurchase">
                        <Box><Typography>{ purchaseData?.length <= 0 && !productInDatesAvailable? 'په ټاکل سویو نیټو کې هیڅ خرید او فروش ندی سوی ' :  null }</Typography></Box>
                    </Grid>
                </Grid>)
                : null}
            {clickedProduct && clickedProduct.length > 0 && purchaseData?.length > 0 && productInDatesAvailable ? (
            <Grid container>
                <Grid item lg={12}>
                    <ProductPieChart gTotal={{
                        info: productProfitInfo, productPricingHistory, productPrice, purchase: productInfo?.totalPurchase, retunSupplier: productInfo?.totalReturn,
                        totalSold: productInfo.totalSold, totalRefund: productInfo.totalRefund, name: 'Hostel', pName: '"لیلیه"',
                        color1: 'rgba(255, 202, 0, 0.45)', color2: '#1d72fd', color3: '#0f9b00', color4: '#ff3300'
                    }} />
                    {/* <TransportPieChart gTotal={{profit: serverData?.data?.FirstRow[0]?.Others?.Hostel?.payment, loss:serverData?.data?.FirstRow[1]?.Others?.Hostel?.payment, name: 'Hostel', pName:'"لیلیه"', color1:'#f7f302', color2:'#ff3300' }}/> */}
                </Grid>
                {/* <Grid item lg={6}>
                <ProductProfitChart gTotal = {{info:productProfitInfo, name: 'Hostel', pName:'"لیلیه"', 
                         color1:'rgba(255, 202, 0, 0.45)', color2:'#1d72fd', color3: '#0f9b00', color4: '#ff3300'}} /> 
                </Grid> */}
                <Grid item lg={12}>
                    <Grid container spacing={2}> {/* Added container and spacing for better layout */}
                        <Grid item lg={6} className="purchaseArea">
                            {purchaseData.length >= 1 ?
                                <>
                                    <p>رانیول سوی</p>
                                    <PurchaseInvoiceTable rows={purchaseData} />
                                </>
                                : null}
                            {suppRefund.length >= 1 ?
                                <>
                                    <p className="suppRefundHeadings">د عرضه کوونکي بیرته ستنیدل</p>
                                    <SupplierRefundTable rows={suppRefund} />
                                </>
                                : null}
                        </Grid>


                        <Grid item lg={6} className="sellArea">
                            {salesData.length >= 1 ?
                                <><p>خرڅ سوی</p>
                                    <SaleTable rows={salesData} />
                                </>
                                : null}
                            {refundData.length >= 1 ?
                                <><p className="refundHead">  د پیرودونکي بیرته ستنیدل</p>
                                    <SaleTable rows={refundData} />
                                </>
                                : null}
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>)
            :null}

            <br />
        </>
    );
};

export default ProductDetails;

