import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatBoxes from './components/statebox';
import DynamicAccordionTable from './components/table';
import { GetRequest } from '../../../redux/actions/GetRequest';
import { PostRequest } from '../../../redux/actions/PostRequest';
import { Grid } from '@mui/material';
import { FullDate } from '../../../components/Date/FullDate';
import { CustomBtn } from '../../../components/button/button';

const BranchPayment = () => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);

  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;

  // ---------------- DATE MANAGEMENT ----------------
  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });

  const [endDate, setEndDate] = useState(new Date());

  // ---------------- MAIN DATA STATE ----------------
  const [data, setData] = useState(null);

  // ---------------- HANDLER FROM CHILD ----------------
  const myfunc = (startDate, endDate) => {
    console.log(startDate, endDate)
    // setStartDate(new Date(newStart));
    // setEndDate(new Date(newEnd));
    fetchData(startDate, endDate)
  };

  // ---------------- FETCH DATA ----------------
  const fetchData = async (startDate, endDate) => {
    try {
      const res = await dispatch(
        PostRequest(Api.BranchGetPayment, userToken, { startDate, endDate })
      );

      // Debug logs
      //console.log("📥 Fetch Date Range:", startDate, endDate);
      //console.log("📦 API Response:", res);

      if (res && res.data) {
        setData(res.data); // Save the data directly
      }

    } catch (err) {
      console.error("❌ Error fetching branch payment data:", err);
    }
  };
  useEffect(() => {
      fetchData();
  }, [dispatch, userToken]);

  useEffect(() => {
    //console.log("📦 ==============================================================");

    const handleRefreshOrders = () => {
      //console.log('🔄 Refresh event received — refetching orders...');
      // fetchData();
    };

    window.addEventListener('refreshOrders', handleRefreshOrders);

    return () => window.removeEventListener('refreshOrders', handleRefreshOrders);
  }, []);


  const handleFilterClick = () => {
    // Call parent function with selected dates
    fetchData();
    // props.myfunc(startDate, endDate);
  };
  // ---------------- RENDER ----------------
  return (
    <div>
      <Grid container>
        <StatBoxes />
      </Grid>
      {/* <Grid container >
        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
          <FullDate
            getprops={{ name: "From", value: startDate }}
            onChange={(e) => setStartDate(e)}
          />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
          <FullDate
            getprops={{ name: "To", value: endDate }}
            onChange={(e) => setEndDate(e)}
          />
        </Grid>
      </Grid> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ display: "block", margin: 'auto' }}>
          <CustomBtn
            click={handleFilterClick}
            data="Filter"
          />
        </Grid>
      </Grid> */}

      {data ? (
        <>
          {/* <StatBoxes startDate={startDate} endDate={endDate} /> */}

          <DynamicAccordionTable
            myfunc={myfunc}
            data={data}  // updated data
          />
        </>

      ) : (
        <p></p>
      )}


    </div>
  );
};

export default BranchPayment;
