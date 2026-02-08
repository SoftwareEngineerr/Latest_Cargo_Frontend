import React, { memo, useState } from "react";
import {
    Box,
    Grid,
    Tabs,
    Tab,
    Button,
    Paper,
    Typography,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Modal,
    TableContainer,
    TextField,
} from "@mui/material";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { POS } from "../../../../constant/pos";
import CustomForm from "../../../../components/form/form";
import Namehistory from "../../../../components/namehistory/namehistory";
import OrderDetailView from './muiModelPopup'
// ✅ MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import RegisterShopModal from "./popup";
import { CustomBtn } from "../../../../components/button/button";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import NameHistoryShirkat from "../../../../components/namehistory/namehistoryShirkat";
import { DeleteRequest } from "../../../../redux/actions/DeleteRequest";
import RegisterCustomerModal from "./customerpopup";
import { BusinessCenter } from "@mui/icons-material";

const Auth = memo(() => {
    const [activeTab, setActiveTab] = useState(0);
    const url = useSelector((state) => state.Api);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([]); // store list of orders
    const [selectedOrder, setSelectedOrder] = useState(null); // store clicked order
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [recordDelete, setRecordDelete] = useState(false);
    const [total_customerFees, setTotal_customerFees] = useState(0);
    const [formKey, setFormKey] = useState(0);

    const [data] = useState(POS().Order);
    const [getfilterdata] = useState(
        data.inputs.filter((item) => item.feildtype !== "label")
    );
    const [initialInputValues] = useState(
        Object.fromEntries(getfilterdata.map((item) => [item.name, ""]))
    );
    const FromDate = new Date();
    //console.log(JSON.parse(localStorage.getItem('BranchDetails'))?.address)
    const [inputValues, setInputValues] = useState({ ...initialInputValues, delivery_date: FromDate, cashOrLoan: true, originAddress: JSON.parse(localStorage.getItem('BranchDetails'))?.address });
    const [lastOrderData, setLastOrderData] = useState([]); // will store the latest submitted order

    const handleInputChange = (e) => {
        //console.log(e.target.srn)
        setInputValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            "orderBy_id": e.target.srn,
        }));
    };
    const handleInputChangeOther = (e) => {
    const { name, value } = e.target;
console.log(inputValues)
    setInputValues((prev) => {
        const updatedValues = {
            ...prev,
            [name]: value,
        };
        // Update total_total_fees if total_fees or shirkat_fees changes
        if (name === "total_fees" || name === "shirkat_fees") {
            const totalFees = parseFloat(name === "total_fees" ? value : updatedValues.total_fees) || 0;
            const shirkatFees = parseFloat(name === "shirkat_fees" ? value : updatedValues.shirkat_fees) || 0;
            updatedValues.total_customerFees = totalFees + shirkatFees;
            setTotal_customerFees(totalFees + shirkatFees)
        }
        return updatedValues;
    });
    
        // inputValues.shirkat_charges = inputValues.shirkat_fees;
        // inputValues.total_customer_charge = inputValues.total_customerFees;
};


    const ChangeOnSelect = (getparam) => {
        //console.log(getparam)
        setInputValues(prev => ({
            ...prev,
            ...getparam[0],
        }));

    };

    const ChangeDate = (e, name) => {
        const d = new Date(e);
        setInputValues((prev) => ({
            ...prev,
            [name]: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        }));
    };

    const CashOrLoan = (e, name) => {
        setInputValues((prev) => {
            const updated = {
                ...prev,
                [name]: !prev.cashOrLoan, // use prev instead of inputValues
            };
            //console.log(updated); // logs the new, updated value
            return updated;
        });
    };

    const submitfun = async (e) => {
        //console.log(inputValues)

        e.preventDefault();
        setLastOrderData([]);
        if(!inputValues.parcel_destination) {
            alert("مهرباني وکړئ منزل وټاکئ")
            return false
        }
        if(inputValues.name == '' || inputValues.parcel_details == '' || inputValues.phone == '')
        return false
        const res = await dispatch(PostRequest(url.CreateOrder, userToken, inputValues,))
        // //console.log(res)
        if (res) {
            //console.log(res)
            // setInputValues({ ...initialInputValues, track_number: res.track_number})
            setRecordDelete(true)
            setOrders(prev => [...prev, res]); // assuming response returns created order
            // //console.log(inputValues)
            setLastOrderData([{ ...inputValues, track_number: res.track_number }]);

            // setLastOrderData([inputValues, track_number: res.track_number]);
            refreshForm()
            setInputValues({ ...initialInputValues, delivery_date: new Date(), cashOrLoan: true, originAddress: JSON.parse(localStorage.getItem('BranchDetails'))?.address });
        }
        //console.log(orders.length)
    };

    const submitShirkat = async (e) => {
        //console.log(inputValues)
        const getSelectedShirkat = JSON.parse(sessionStorage.getItem('selectedShirkat'))
        const selectedShirkat = {
            orderBy_id: getSelectedShirkat.srn,
            name: getSelectedShirkat.name,
            phone: getSelectedShirkat.phone,
        }
        e.preventDefault()

        if(!inputValues.parcel_destination) {
            alert("مهرباني وکړئ منزل وټاکئ")
            return false
        }
        setLastOrderData([]);
        // return false
         const res = await dispatch(PostRequest(url.CreateShirkatOrder, userToken, inputValues,))
        if (res) {
            
            setLastOrderData([{ ...inputValues, track_number: res.track_number }]);
            setRecordDelete(true)
            setOrders(prev => [...prev, res]); // assuming response returns created order
            setLastOrderData([inputValues]);
            refreshForm()
            setInputValues({ ...initialInputValues, delivery_date: new Date(), cashOrLoan: true, originAddress: JSON.parse(localStorage.getItem('BranchDetails'))?.address, 
                orderBy_id: selectedShirkat.orderBy_id, name: selectedShirkat.name, phone: selectedShirkat.phone
             });
            setTotal_customerFees(0); //
        }

    }

    const deleteOrder = async (orderId) =>{
        //console.log(orderId)
        const res = await dispatch(DeleteRequest(`${url.DeleteOrderBoth}/${orderId}`, userToken, "",))
        //console.log(res)
        if(res)
            setRecordDelete(false)
    }

    const refreshForm = () => {
        setFormKey(prevKey => prevKey + 1);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openCustomerPopup , setOpenCustomerPopup ] = useState(false)
    const handleOpenCustomer = () => setOpenCustomerPopup(!openCustomerPopup)

    const handleFormSubmit = (data) => {
        //console.log("Shop Registered ✅", data);
        // You can call your API here
    }

    return (
        <>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    minHeight: "100vh",
                }}
                p={3}
            >
                <Paper
                    elevation={4}
                    sx={{
                        width: "100%",
                        p: 3,
                    }}
                >
                    <RegisterShopModal
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleFormSubmit}
                    /> 
                      <RegisterCustomerModal
                        open={openCustomerPopup}
                        onClose={handleOpenCustomer}
                        onSubmit={handleFormSubmit}
                    /> 

                    <Tabs
                        value={activeTab}
                        onChange={(e, val) => setActiveTab(val)}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="fullWidth"
                        sx={{
                            mb: 2,
                            "& .MuiTab-root": {
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: 15,
                                display: "flex",
                                gap: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "48px",
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <PersonIcon fontSize="small" /> Customer 
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <BusinessCenter fontSize="small" /> Shirkat
                                </Box>
                            }
                        />
                    </Tabs>

                    <Divider sx={{ mb: 3 }} />

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 0 && (
                            <motion.div
                                key="tab1"
                                initial={{ opacity: 0, x: -25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 25 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={submitfun}>
                                    <Grid container spacing={2}>
                                          <Grid item lg={3} md={3} sm={3} xs={3}>
                                            <CustomBtn click={handleOpenCustomer} type="button" data="Register Customer" />
                                        </Grid>
                                        <Grid item lg={9} md={9} sm={9} xs={9}>
                                                {/* <CustomBtn click={refreshForm} type="button" data="ceaan" /> */}
                                        </Grid>

                                        <Namehistory selectTab={activeTab} handleInputChange={handleInputChange} />
                                        <CustomForm
                                            data={data.inputs}
                                            ChangeOnSelect={ChangeOnSelect}
                                            handleInputChange={handleInputChangeOther}
                                            ChangeDate={ChangeDate}
                                            sliderChange={CashOrLoan}
                                        />
                                    </Grid>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 1 && (
                            <motion.div
                                key="tab2"
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={submitShirkat}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={3} md={3} sm={3} xs={3}>
                                            <CustomBtn click={handleOpen} type="button" data="Register Shop" />
                                        </Grid>
                                        <Grid item lg={9} md={9} sm={9} xs={9}>
                                                {/* <CustomBtn click={refreshForm} type="button" data="ceaan" /> */}
                                        </Grid>

                                        <NameHistoryShirkat selectTab={activeTab} handleInputChange={handleInputChange} />
                                        <CustomForm key={formKey} 
                                            data={data.shirkatInputs}
                                            ChangeOnSelect={ChangeOnSelect}
                                            handleInputChange={handleInputChangeOther}
                                            ChangeDate={ChangeDate}
                                            sliderChange={CashOrLoan}
                                        />
                                        
                                        <Grid item lg={6} md={6} sm={6} xs={12} mb={2}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="#f5f5f5" borderRadius={1}>
                                            <Typography variant="body2" fontWeight="bold">
                                            Customer Charge جمله
                                            </Typography>
                                            <Typography variant="body2">
                                                {inputValues.total_customerFees || 0}
                                            </Typography>
                                        </Box>
                                        </Grid>


                                    <CustomBtn lg={5} click={submitShirkat} type="button" data="Save Record" />
                                    </Grid>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Box mt={4}>
                        {/* <Typography variant="h6" gutterBottom>Recent Orders</Typography> */}

                        {orders.length > 0  && recordDelete ? (
                            <Paper elevation={2}>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Sender Name</b></TableCell>
                                            <TableCell><b>Phone</b></TableCell>
                                            <TableCell><b>Amount</b></TableCell>
                                            <TableCell><b>Tracking #</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {orders.map((order, i) => ( */}
                                            <TableRow
                                                // key={i}
                                                hover
                                                onClick={() => {
                                                    setSelectedOrder(1);
                                                    setOpenOrderModal(true);
                                                }}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell>{lastOrderData[0]?.name || "N/A"}</TableCell>
                                                <TableCell>{lastOrderData[0]?.phone}</TableCell>
                                                <TableCell>
                                                    {(() => {
                                                        const totalFees = parseFloat(lastOrderData?.[0]?.total_fees ?? 0) || 0;
                                                        const shirkatFees = parseFloat(lastOrderData?.[0]?.shirkat_fees ?? 0) || 0;
                                                        const total = totalFees + shirkatFees;
                                                        return total > 0 ? total : "-";
                                                    })()}
                                                </TableCell>

                                                {/* <TableCell>{(parseFloat(lastOrderData[0]?.total_fees) + parseFloat(lastOrderData[0]?.shirkat_fees)) || "-"}</TableCell> */}
                                                <TableCell>{orders[0]?.track_number || "-"}</TableCell>
                                                {/* <TableCell><Button onClick={(e)=>deleteOrder(orders[0]?.order_id)}>Delete Record</Button></TableCell> */}
                                            </TableRow>
                                        {/* ))} */}
                                    </TableBody>
                                </Table>
                                <Button onClick={(e)=>deleteOrder(orders[0]?.order_id)}>Delete Record</Button>
                            </Paper>
                        ) : (
                            <Typography color="text.secondary" variant="body2">
                                No orders yet.
                            </Typography>
                        )}
                    </Box>

                </Paper>
            </Box>
            <Modal
                open={openOrderModal}
                onClose={() => setOpenOrderModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        width: '95%',
                        maxWidth: 850,
                        maxHeight: '90vh',   // ✅ height limit
                        overflowY: 'auto',   // ✅ enable scrolling
                    }}
                >
                    <OrderDetailView data={orders[0]} currentValues={lastOrderData} />
                </Box>
            </Modal>


        </>
    );
});

export default Auth;
