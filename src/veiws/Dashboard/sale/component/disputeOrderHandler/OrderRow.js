import React, { useEffect, useState } from 'react';
import {
  TableRow, TableCell, FormControl, Chip, Collapse, Box,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderDetails from './OrderDetails';
import { GetRequest } from '../../../../../redux/actions/GetRequest';
import { useSelector, useDispatch } from 'react-redux'; 

const OrderRow = ({ order, isExpanded, toggleExpand, onStatusChange }) => {
  const url = useSelector((state) => state.Api);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;

  // ✅ Fetch details for this order
  const fetchDetails = async () => {
    setLoading(true);
    // const payload = {
    //   track_number  : order.track_number
    // }
    try {
      //const res = await dispatch(PostRequest(`${url.GetOrderDetail}`, userToken, payload));
      const res = await dispatch(GetRequest(`${url.GetOrderDetail}/${order.track_number}`, userToken, ""));
      if (res?.success) {
        setOrderDetail(res); // whole response (contains order + orderDetail)
      } else {
        setOrderDetail(null);
      }
    } catch (error) {
      console.error("Fetch details error:", error);
      setOrderDetail(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trigger fetch only when expanded for the first time
  useEffect(() => {
    if (isExpanded && !orderDetail && !loading) {
      fetchDetails();
    }
  }, [isExpanded]);

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f9f9f9' } }}
        onClick={toggleExpand}
      >
        <TableCell>
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell>{order?.srn}</TableCell>
        <TableCell>{order.track_number}</TableCell>
        <TableCell>{order.receiver_name}</TableCell>
        <TableCell>{order.origin}</TableCell>
        <TableCell>{order.total_fees} AFN</TableCell>
        <TableCell>{new Date(order.delivery_date).toLocaleDateString()}</TableCell>
        <TableCell>
          <FormControl fullWidth size="small">
            <Chip
              label={order.status}
              color={
                order.status === 'pending'
                  ? "warning"
                  : order.status === 'OnTheWay'
                  ? "info"
                  : order.status === 'deliver'
                  ? "success"
                  : "default"
              }
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, mb: 1 }}
            />
          </FormControl>

              {/* <Chip sx={{ fontWeight: 600, mb: 1 }} onClick={(e)=>deleteRecord(order.srn)} label={'Delete'} /> */}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={12} sx={{ p: 0, borderBottom: isExpanded ? '1px solid #eee' : 'none' }}>
          <Collapse in={isExpanded} timeout={400} unmountOnExit>
            <Box sx={{ p: 3 }}>
              {loading && <div>Loading details...</div>}

              {!loading && orderDetail && (
                <OrderDetails
                  order={orderDetail.order}
                  orderDetail={orderDetail.orderDetail}
                  closeCollaps={toggleExpand}
                  onStatusRefresh={() => window.dispatchEvent(new Event('refreshOrders'))}
                />

              )}

              {!loading && !orderDetail && (
                <div style={{ color: '#888' }}>No details found for this order.</div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
