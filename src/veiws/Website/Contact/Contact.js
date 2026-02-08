import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react';
import { Box, Card, Grid } from '@mui/material';
import PageContainer from '../../../components/Container/pageContainer';
import Logo from '../../../components/Logo/Logo';
import { CustomBtn } from '../../../components/button/button';
import { UserInterFace } from '../../../constant/Website';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
// import Alkhidmat from './mainPages/alkhidmat';
import RegistrationForm from './mainPages/registrationForm'

const Contact = (props) => {
    const [ data , setData ] = useState(UserInterFace.Contact);
    const theme = useTheme();
    const style = theme.palette.Main.contact;
    //console.log('this page is loading');
  return (
    <PageContainer  title="Home" description="Home Page">
     <Box  sx={style.mainbox}>
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        
            <Grid item
                xs={12}
                sm={12}
                lg={7}
                xl={7}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%' }}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                    <Logo />
                </Box>
                    {/* <RegistrationForm/> */}
                </Card>
                </Grid>
            </Grid>
        </Box>
    </PageContainer>
  )
}

Contact.propTypes = {}

export default Contact