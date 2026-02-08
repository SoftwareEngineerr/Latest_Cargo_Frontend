import React, { useEffect, useState } from 'react';
import { Box, Paper, Modal, Stepper, Step, StepLabel, Typography, Chip, FormControl, Select, MenuItem, Button, Input, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CustomBtn } from '../../../../../components/button/button';
import axios from 'axios';
import { PostRequest } from '../../../../../redux/actions/PostRequest';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { DeleteRequest } from '../../../../../redux/actions/DeleteRequest';
import ForwardOrder from './ForwardOrder';
import DeliverOrder from './DeliverOrder';
import { AddCircle, InventoryOutlined } from '@mui/icons-material';
import OrderDetailView from '../../../../Dashboard/purchase/component/muiModelPopup'
import { formatAfghanDate } from '../../../../../components/Date/afghandate';

const OrderDetails = ({ order, orderDetail, onStatusRefresh, closeCollaps }) => {
  //console.log("Order:", order);
  // //console.log("Order Detail:", orderDetail); 
  const url = useSelector(state => state.Api);
  const [selectedState, setSelectedState] = useState(order?.customer_status || undefined);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
  const [imageUplaoded, setImageUploaded] = useState(order?.image)
  const [comment, setComment] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [forwardOpen, setForwardOpen] = useState(false);
  const [forwardData, setForwardData] = useState(null);
  const [deliverOpen, setDeliverOpen] = useState(false);
  const [deliveredData, setDeliveredData] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const branchLoggedIn = JSON.parse(sessionStorage.getItem('User_Data'))?.branch?.srn;




  const [brsrn, setBrsrn] = useState(localStorage.getItem('BranchID'));
  useEffect(() => {
    const storedStatuses = localStorage.getItem("orderStatuses");
    if (storedStatuses) {
      try {
        setStatuses(JSON.parse(storedStatuses));
      } catch (err) {
        console.error("Error parsing orderStatuses from localStorage", err);
      }
    }
  }, []);
  const onStatusUpdate = (order, value) => {
    if (value == 'forward') {
      setForwardData(order);  // store selected order info
      setForwardOpen(true);   // open popup
    }
    // if(value == 'delivered'){
    //   setDeliveredData(order);  // store selected order info
    //   setDeliverOpen(true);   // open popup
    // }
    setSelectedState(value); // ✅ React now tracks this
  };

  if (!orderDetail || orderDetail.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No status history available.
      </Typography>
    );
  }

  // Map through orderDetail to extract status steps
  const steps = orderDetail.map((item) => ({
    label: item.current_status || 'Unknown',
    date: new Date(item.date_time).toLocaleString(),
    destination: item.destination,
  }));

  // Optional: choose an icon for each status
  const getStepIcon = (status) => {
    //console.log(status)
    switch (status?.toLowerCase()) {
      case "ordercreate":
        return <AddCircle color="success" />;
      case 'notreceived':
      case 'pending':
        return <PendingActionsIcon color="warning" />;
      case 'ontheway':
      case 'outForDelivery':
        return <LocalShippingIcon color="info" />;
      case 'received':
        return <InventoryOutlined color="info" />;
      case 'deliver':
      case 'delivered':
        return <HomeIcon color="success" />;
      case 'missing':
      case 'damage':
        return <CheckCircleIcon color="error" />;
      default:
        return <CheckCircleIcon color="disabled" />;
    }
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token || undefined;
      //console.log(userToken)
      const response = await axios.post(url.Imagelink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${userToken}`,
        },
      });
      //console.log(response?.data?.link)
      if (response.status === 200) {
        // //console.log()
        setImageUploaded(response?.data?.name)
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const onStatusChange = async (data, value) => {
    console.log('Selected Status:', !data && selectedState == undefined && selectedState == "" , selectedState)
    if(!data || selectedState == undefined || selectedState == ""){
      alert("مهرباني وکړئ حالت وټاکئ")
      return false
    } 
    if(selectedState == "forward"){
      alert("مهرباني وکړئ مخکینۍ څانګه غوره کړئ")
      return false
    }
    console.log(forwardData , selectedState == "forward")
    const urlRequest = selectedState == 'received' ? url.ReceivedOrder : selectedState == 'delivered' ? url.DeliverdOrder : url.UpdateOrder
    const img = imageUplaoded
    const payload = { order_srn: data.srn, status: selectedState, image: img, comment, track_number: data.track_number, payStatus: data.pay_status, customerCharge: data.total_customer_charge, origin: data.origin, branchAddress: data.parcel_destination }
    //console.log('Order', urlRequest)
    try {
      //console.log('Submitting data:', data);
      // return false
      const response = await dispatch(PostRequest(urlRequest, userToken, payload));
      //console.log(response.success == true)
      if (response.success == true) {
        closeCollaps(false); // collapses the row
        onStatusRefresh();   // refreshes parent table
        //console.log('✅ Status updated successfully');
      } else {
        console.warn('❌ Failed to update:', response);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const handleDeleteClick = (orderId) => {
    setDeleteId(orderId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setConfirmOpen(false);
    const res = await dispatch(DeleteRequest(`${url.DeleteOrderBoth}/${deleteId}`, userToken, ""));
    if (res) {
      closeCollaps(false); // collapses the row
      onStatusRefresh();
    }
  };

  const handlePrintClick = (order) => {
    setSelectedOrder(order)
    setOpenOrderModal(true)
    //console.log(order)
  }

  
  return (
    <>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* 🔹 Sender Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#ffa800' }}>
              Sender Details
            </Typography>
            <Typography><b>Parcel:</b> {order?.parcel_details}</Typography>
            <Typography><b>Sender:</b> {order?.sender_name}</Typography>
            <Typography><b>Phone:</b> {order?.sender_phone}</Typography>
            <Typography><b>Date:</b> {formatAfghanDate(order?.order_date)}</Typography>
            <Typography><b>From Branch:</b> {order?.BranchAddress}-{order?.BranchPhone}</Typography>
            <Typography><b>Tracking:</b> {order?.track_number}</Typography>
          </Box>

          {/* 🔹 Payment Section */}
          {order?.pay_status == 1 ? (
            <>
              {/* <Typography><b>Our Fees:</b> {order?.total_fees} AFN</Typography> */}
              <Box
                sx={{
                  mt: 2,
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #4CAF50',
                  borderRadius: 2,
                  p: 1.5,
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ color: '#2E7D32', fontWeight: 600 }}>
                  💰 Payment Received {parseFloat(order?.total_fees)} AFN
                </Typography>
              </Box>
            </>
          ) : null}
          <br /> 
          {order?.brsrn == branchLoggedIn && order?.status == 'OrderCreate'? 
          <Chip sx={{ fontWeight: 600, mb: 1, backgroundColor: '#ffdada4b', border: '2px solid #F44336' }} onClick={(e) => handleDeleteClick(order.srn)} label={'Delete'} />
          :
          null }
        </Paper>


        <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <Box>
            <Typography variant="h6" style={{ width: '50%', float: 'left' }} sx={{ mb: 1, fontWeight: 600, color: '#ffa800' }}>
              Receiver Details
            </Typography>
            <Typography variant="h6" style={{ width: '50%', float: 'right', textAlign: 'right' }} sx={{ mb: 1, fontWeight: 600, color: '#ffa800' }}>
              <Chip sx={{ fontWeight: 600, mb: 1, backgroundColor: '#daffe04b', border: '2px solid #2E7D32' }} onClick={(e) => handlePrintClick(order)} label={'   Print   '} />
            </Typography>
          </Box>
          <Typography><b>Receiver:</b> {order?.receiver_name}</Typography>
          <Typography><b>Phone:</b> {order?.receiver_phone}</Typography>
          <Typography><b>Weight:</b> {order?.parcel_weight}</Typography>
          <Typography><b>To Branch:</b> 
          {/* {order?.parcel_destination} */}
          {order?.BranchDestinationAddress}-{order?.BranchDestinationPhone}
          </Typography>
          {/* <Typography><b>Delivery Date:</b> {order?.delivery_date?.split('T')[0]}</Typography> */}
          {/* 🔹 Payment Section */}
          {order?.pay_status == 1 ? (
            null
          ) : (
            <>
              <Typography><b>Our Fees:</b> {order?.total_fees} AFN</Typography>
              <Typography><b>Shirkat:</b> {order?.shirkat_charges} AFN</Typography>

              <Box
                sx={{
                  mt: 2,
                  backgroundColor: '#fffdeb',
                  border: '1px solid #ffa800',
                  borderRadius: 2,
                  p: 1.5,
                  textAlign: 'center'
                }}
              >
                {/* {parseFloat(order?.total_fees)} === {parseFloat(order?.shirkat_charges)} */}
                <Typography sx={{ color: '#C62828', fontWeight: 600 }}>
                  ⚠ Payment Pending — Amount Due: {parseFloat(order?.total_fees) + parseFloat(!isNaN(order?.shirkat_charges) ? order?.shirkat_charges : 0)} AFN
                </Typography>
              </Box>
            </>
          )}
          <Typography><b>Description:</b> {order?.description}</Typography>
          <Typography><b>Parcel Address:</b> {order?.receiver_address}</Typography>

        </Paper>


        <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} elevation={0}>

          <Box mt={1}>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedState}
                onChange={(e) => {
                  e.stopPropagation();
                  onStatusUpdate(order, e.target.value);
                }}
                MenuProps={{ disablePortal: true }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.front}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={2} sx={{ border: '1px dashed #ccc', borderRadius: 2, p: 1.5, textAlign: 'center', background: '#fafafa' }}>
              {imageUplaoded !== null && imageUplaoded !== 'null' ? (
                <img
                  //${localStorage.getItem('branchID')}
                  src={`${url.ImageServer}/${imageUplaoded}`}
                  // alt={label}
                  style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageUpload(order?.srn, e)}
                    style={{ display: "none" }}
                    id={`upload-button-${order?.srn}`}
                  />
                  <label htmlFor={`upload-button-${order?.srn}`}>
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                </>
              )}

            </Box>
            <TextField
              label="Comment"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 2 }}
              mb={2}
            />
            <br />
            <br />
            <CustomBtn mt={2} data="Update Status" click={() => onStatusChange(order, 'customer_status')} />

          </Box>
        </Paper>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Order Progress
          </Typography>

          <Stepper orientation="vertical" activeStep={steps.length - 1}>
            {steps.map((step, index) => (
              <Step key={index} completed={index < steps.length - 1}>
                <StepLabel
                  icon={getStepIcon(step.label)}
                  sx={{ '& .MuiStepLabel-label': { fontSize: 14, fontWeight: 500 } }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.destination}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.date}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this order?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={forwardOpen}
          onClose={() => setForwardOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Forward Order</DialogTitle>
          <DialogContent dividers>
            <ForwardOrder
              order={forwardData}
              onClose={() => setForwardOpen(false)}
              onSuccess={() => {
                setForwardOpen(false);
                closeCollaps(false);
                onStatusRefresh();
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={deliverOpen}
          onClose={() => setDeliverOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Deliver Order</DialogTitle>
          <DialogContent dividers>
            <DeliverOrder
              order={deliveredData}
              onClose={() => setDeliverOpen(false)}
              onSuccess={() => {
                setDeliverOpen(false);
                closeCollaps(false);
                onStatusRefresh();
              }}
            />
          </DialogContent>
        </Dialog>
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
                  <OrderDetailView data={1} currentValues={[selectedOrder]} />
              </Box>
          </Modal>
    </>
  );
};

export default OrderDetails;
