import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/Container/pageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequest } from '../../../redux/actions/GetRequest';
import { CircularProgress, Box, Typography } from '@mui/material';
import DynamicAccordionTable from './components/table';

const HomePage = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(localStorage.getItem('Shirkat_Data'))?.token;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userToken) {
        console.warn("⚠️ No user token found in localStorage!");
        setLoading(false);
        return;
      }

      try {
        const res = await dispatch(GetRequest(url.ShirkatData, userToken, ""));
        //console.log("✅ API Response:", res);
        setData(res);
      } catch (err) {
        console.error("❌ Error fetching Shirkat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, url, userToken]);

  // 🌀 Show loader
  if (loading) {
    return (
      <PageContainer title="Home" description="Loading Shirkat Data...">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading Shirkat Data...</Typography>
        </Box>
      </PageContainer>
    );
  }

  // ⚠️ Show message if no data
  if (!data?.data || data.data.length === 0) {
    return (
      <PageContainer title="Home" description="No Data Found">
        <Typography
          sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
        >
          No shirkat data available.
        </Typography>
      </PageContainer>
    );
  }

  // ✅ Show table when data is ready
  return (
    <PageContainer title="Home" description="Shirkat Orders Overview">
      <DynamicAccordionTable data={data.data} />
    </PageContainer>
  );
};

export default HomePage;
