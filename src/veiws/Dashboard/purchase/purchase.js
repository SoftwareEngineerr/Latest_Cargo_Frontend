import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { POS } from '../../../constant/pos';
import { Input } from '../../../components/input/input';
// import Auth from './components/auth';
import PageContainer from '../../../components/Container/pageContainer';
import { Box, Card, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import Logo from '../../../components/Logo/Logo';
import Auth from './component/auth';
import './purchase.scss';
const Purchase = (props) => {
  const theme = useTheme();
    const style = theme.palette.Main.login;
    const [data , setData] = useState(POS().Order);
    // //console.log('Purchase component')
    return (
       <>
       <PageContainer  title={data.title} description={data.description}>
            <Box >
                <Grid container spacing={0} justifyContent="center" sx={{ minHeight: '100vh', padding:'' }}>
           
                <Grid item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '100%' }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {/* <Logo /> */}
                    </Box>
                        <Auth />
                    </Card>
                    </Grid>
                </Grid>
            </Box>
       </PageContainer>
       </>
    );
}

Purchase.propTypes = {}

export default Purchase