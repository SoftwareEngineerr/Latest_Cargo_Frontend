import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, IconButton, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector, useDispatch } from 'react-redux';
import { GetRequest } from '../../../redux/actions/GetRequest';
import { PostRequest } from '../../../redux/actions/PostRequest';
import PageContainer from '../../../components/Container/pageContainer';
import OrderTable from '../sale/component/orders/OrderTable';
import StatusModal from '../sale/component/orders/StatusModal';
// import { PostRequest } from '../../../../redux/actions/PostRequest';

const Dispute = () => {
    const url = useSelector(state => state.Api);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusValue, setStatusValue] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
    useEffect(() => {
        fetchOrders();
        const statusList = [
            {value:'received', front:'Received'},
            {value:'forward', front:'Forward To Branch'},
        ];
            localStorage.setItem('orderStatuses', JSON.stringify(statusList));
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await dispatch(GetRequest(url.StatusWiseChecking, userToken,''));
            if (res?.success && Array.isArray(res.data)) setOrders(res.data);
            else setOrders([]);
        } catch (error) {
            console.error(error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
  const handleRefreshOrders = () => {
    //console.log('🔄 Refresh event received — refetching orders...');
    fetchOrders();
};

window.addEventListener('refreshOrders', handleRefreshOrders);

return () => window.removeEventListener('refreshOrders', handleRefreshOrders);
}, []);

    const handleStatusChange = (order, statusField, value) => {
        // //console.log( [order, statusField])
        setSelectedOrder({ ...order, statusField });
        setStatusValue(value);
        setOpenModal(true);
    };

    const handleSubmitStatus = async (data) => {
        try {
            //console.log('Submitting data:', data);
            const response = await dispatch(PostRequest(url.UpdateOrder, userToken, data));
            //console.log(response)
            if (response == 'Success') {
                //console.log('✅ Status updated successfully');
                setOpenModal(false);
                setComment('');
                setImage(null);
                fetchOrders(); // refresh table
            } else {
                console.warn('❌ Failed to update:', response);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    return (
        <PageContainer title="Dispute/Missing   زیان یا ورک شوی  " description="Orders sent from your branch">
            <Box sx={{ p: 3 }}>
                <Paper
                    elevation={5}
                    sx={{ p: 3, borderRadius: '20px', background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}
                        >
                            <LocalShippingIcon color="primary" /> Dispute/Missing   زیان یا ورک شوی  
                        </Typography>
                        <IconButton
                            onClick={fetchOrders}
                            color="primary"
                            sx={{ background: '#f5f5f5', '&:hover': { background: '#e0e0e0' } }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
                            <CircularProgress />
                        </Box>
                    ) : orders.length === 0 ? (
                        <Typography align="center" color="text.secondary">
                            No orders yet.
                        </Typography>
                    ) : (
                        <OrderTable orders={orders} onStatusChange={handleStatusChange} />
                    )}

                    <StatusModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        comment={comment}
                        setComment={setComment}
                        image={image}
                        data={selectedOrder}
                        setImage={setImage}
                        onSubmit={handleSubmitStatus}
                    />
                </Paper>
            </Box>
        </PageContainer>
    );
};

export default Dispute;
