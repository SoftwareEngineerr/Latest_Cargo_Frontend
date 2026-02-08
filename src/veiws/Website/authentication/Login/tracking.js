import React, { useEffect, useState } from 'react';
import Auth from './components/auth';
import PageContainer from '../../../../components/Container/pageContainer';
import { Box, Card, Grid } from '@mui/material';
import Logo from '../../../../components/Logo/Logo';
import { Registered, Activated, ActivationDate } from '../../../../hooks/FirstTimeWebSrn/Websrn';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import TrackAuth from './components/trackAuth';

const Track = () => {
    // const getUserData = Registered();
    // const getActivation = Activated();
    // const getActivationDate = ActivationDate();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // useEffect(() => {
        // if (!getUserData && !getActivationDate) {
        //   //console.log('Attempting navigation to registration');
        //   navigate("/registration"); // Remove the # prefix
        //   //console.log('Navigation command executed');
        // } else if (getUserData && (!getActivationDate || getActivationDate === "false")) {
        //   navigate("/activation"); // Remove the # prefix
        // }
    //   }, [getUserData, navigate]);


    // const theme = useTheme();
    // const style = theme.palette.Main.login;
    return (
        <>
        <PageContainer  title="قاطع کندهار انتقالات" description="this is Dashboard">
             <Box className='backgroundImage'  >
                 <Grid container spacing={0} justifyContent="center" sx={{ minHeight: '100vh' }}>
            
                 <Grid item
                     xs={12}
                     sm={12}
                     lg={4}
                     xl={3}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                 >
                     <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', width: '700px' }} className='loginScreen'>
                     <Box display="flex" alignItems="center" justifyContent="center" sx={{maxHeight: '200px'}}>
                         <Logo />
                     </Box>
                         <TrackAuth />
                     </Card>
                     </Grid>
                 </Grid>
             </Box>
        </PageContainer>
        </>
    );
};

Track.propTypes = {};

export default Track;
