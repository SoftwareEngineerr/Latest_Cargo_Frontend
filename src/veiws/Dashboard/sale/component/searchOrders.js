import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from '@mui/icons-material/Refresh';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../../components/Container/pageContainer';
import OrderTable from './incomingOrder/OrderTable';
import StatusModal from './incomingOrder/StatusModal';
import { PostRequest } from '../../../../redux/actions/PostRequest';
import { GetRequest } from '../../../../redux/actions/GetRequest';

const SearchOrder = () => {
  const url = useSelector(state => state.Api);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusValue, setStatusValue] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
  const userData = sessionStorage.getItem('User_Data');
  const branchUser = userData ? JSON.parse(userData)?.branch?.main_branch : undefined;

  // Initialize status list in localStorage (from first version)
  useEffect(() => {
    //console.log(branchUser)
    let statusList = [];

    if (branchUser == 1) {
      statusList = [
        // {value:'forward', front:'Forward'},
        // {value:'OnTheWay', front:'OnTheWay'},
        // { value: 'damage', front: 'Damage' },
        // { value: 'missing', front: 'Missing' },
        // { value:'outForDelivery', front:'Out For Delivery'},
      ];
    }
      localStorage.setItem('orderStatuses', JSON.stringify(statusList));

  }, []);

  // Fetch incoming orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await dispatch(GetRequest(url.GetIncomingOrder, userToken));
      if (res?.success && Array.isArray(res?.data)) setOrders(res?.data);
      else setOrders([]);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // Search handler
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await dispatch(PostRequest(url.SearchOrder, userToken, { trackingnumber: query }));
      if (res?.success && Array.isArray(res.data)) setOrders(res.data);
      else setOrders([]);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Status modal handler
  const handleStatusChange = (order, statusField, value) => {
    setSelectedOrder({ ...order, statusField });
    setStatusValue(value);
    setOpenModal(true);
  };

  const handleSubmitStatus = async (data) => {
    try {
      const response = await dispatch(PostRequest(url.UpdateOrder, userToken, data));
      if (response === 'Success') {
        setOpenModal(false);
        setComment('');
        setImage(null);
        fetchOrders(); // refresh table
      } else {
        console.warn('Failed to update:', response);
      }
    } catch (error) {
      console.error('Error updating status:', error);
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

  return (
    <PageContainer title="Search Parcel پارسل وپلټئ  " description="Orders sent from your branch">
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={5}
          sx={{
            p: 3,
            borderRadius: '20px',
            background: '#fff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}
            >
              <LocalShippingIcon color="primary" /> Search Parcel پارسل وپلټئ  
            </Typography>
            <IconButton
              onClick={fetchOrders}
              color="primary"
              sx={{ background: '#f5f5f5', '&:hover': { background: '#e0e0e0' } }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>

          {/* Search Bar */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Enter tracking number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Orders Table */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={250}>
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No orders found.
            </Typography>
          ) : (
            <OrderTable orders={orders} onStatusChange={handleStatusChange} />
          )}

          {/* Status Modal */}
          <StatusModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            comment={comment}
            setComment={setComment}
            image={image}
            setImage={setImage}
            data={selectedOrder}
            onSubmit={handleSubmitStatus}
          />
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default SearchOrder;
