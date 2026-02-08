import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../../components/shared/DashboardCard';

import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Box, Card, Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input } from '../../../../components/input/input';
import { CustomBtn } from '../../../../components/button/button';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RecentTransactions = () => {
  const theme = useTheme();
  const style = theme.palette.Main.Dashboard;

  const [data, setData] = useState([]);
  const url = useSelector((state) => state.Api.veiwMessages);
  const  imageServer = useSelector((state) => state.Api.imageServer);
  const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
              setData(response.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [url, userToken]);

  return (
    <DashboardCard title="Personal Messages  شخصي پیغام">
      <>
      <Box sx={style.chatBox}>
        {
        data != undefined && (data.map((item , key)=>(
        <Box sx={style.client} key={key}>
        {/* <Box component="img" sx={style.image} src={`${imageServer}${item.Picture}`} /> */}
          <Box sx={style.clientBox}>
             <Typography variant='h6' sx={style.heading}>
              {/* {item.Name} */}
             </Typography>
             {item.Message}
          </Box>
        </Box>
        )))   
      }
</Box>


        {/* <Box mt={1} display='flex'>
          <Input placeholder='Enter Massage' />
          <button className='butnstyle'>
          <SendIcon />
          </button>
          </Box>
        */}
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
