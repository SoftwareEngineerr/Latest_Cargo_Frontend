import React, { useEffect, useState } from 'react';
import Auth from './components/auth';
import { Box, Card, Grid } from '@mui/material';
import PageContainer from '../../../components/Container/pageContainer';
import Logo from '../../../components/Logo/Logo';
const ShirkatLogin = () => {
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
                     <Box display="flex" alignItems="center" justifyContent="center">
                         <Logo />
                     </Box>
                         <Auth />
                     </Card>
                     </Grid>
                 </Grid>
             </Box>
        </PageContainer>
        </>
    );
};

ShirkatLogin.propTypes = {};

export default ShirkatLogin;