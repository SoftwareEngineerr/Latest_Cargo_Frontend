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
import { Avatar, Box, Card, Grid, Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Input } from '../../../../components/input/input';
import { CustomBtn } from '../../../../components/button/button';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import {LocalPhone} from '@mui/icons-material';

import axios from 'axios';

const FessStatus = () => {
  const theme = useTheme();
  const style = theme.palette.Main.Dashboard;

  const [data, setData] = useState([]);
  const url = useSelector((state) => state.Api.showlatefee);
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
              const getSortData =response.data.result.sort((a, b) => a.Ammount - b.Ammount)
              setData(getSortData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [url, userToken]);

  return (
      <Box mb={2}>
        <Box>Below Students are defaulters  لاندې زده کونکي فاسدونکي دي</Box>
         {
        data != undefined && (data.map((item , key)=>(
        <Box sx={style.client} key={key}>
          <Avatar
            sx={style.image} src={`${imageServer}${item.Picture}`} 
          />
          {/* <Box component="img" sx={style.image} src={`${imageServer}${item.Picture}`} /> */}
          <Box sx={style.showfee}>
             <Grid container>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                  <Typography variant='p'>
                    Roll  {item.roll}
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                  <Typography variant='h6' sx={style.heading}>
                    {item.NamePashto}  {item.Name} /  {item.FNamePashto}  {item.FName}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={3} xs={3}>
                  <Typography variant='p'>
                    <Link href={`tel:${item.TellNo1}`} sx={style.telecontent}>
                      <Box sx={style.butn}>
                        <LocalPhone sx={style.tele} />
                        {item.TellNo1}
                      </Box>
                    </Link>
                  </Typography>
                </Grid>
                
                <Grid item lg={2} md={2} sm={3} xs={3}>
                  <Typography variant='p'>
                    {item.Ammount}
                  </Typography>
                
                </Grid>
             </Grid>
             {/* {item.Message} */}
          </Box>
        </Box>
        )))  }
       </Box>
  );
};

export default FessStatus;
