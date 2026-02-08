import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { POS } from '../../../constant/pos';
import { Input } from '../../../components/input/input';
import PageContainer from '../../../components/Container/pageContainer';
import { Box, Card, Grid, Tabs, Tab, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Auth from './component/auth';
import SalesReport from './component/salesReport';
import Expenses from './component/expenses';
import Products from './component/products';
import ProductDetails from './component/productDetail';
import Roznamcha from './component/roznamcha/roznamcha';
import Capital from './component/capital/capital';

const Report = (props) => {
  const theme = useTheme();
  const style = theme.palette.Main.login;
  const [data, setData] = useState(POS().Report);
  const [tabValue, setTabValue] = useState(0);
    const [getRoles, setGetRoles] = useState(JSON.parse(localStorage.getItem('User_Data'))?.role);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  //console.log(getRoles)
  return (
    <PageContainer title={data.title} description={data.description}>
      <Box>
        <Grid container spacing={0} justifyContent="center" sx={{ minHeight: '100vh', padding: '0px 0px' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={11}
            xl={11}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 2, zIndex: 1, width: '100%', maxWidth: '100%' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {/* <Logo /> */}
              </Box>
              <Tabs value={tabValue} onChange={handleChange} centered>
                <Tab label="روزنامجه" />
                <Tab label="ګراف" />
                <Tab label="مصارف" />
                { getRoles === 1? <Tab label="بارکوډ" /> : null}
                { getRoles === 1?  <Tab label="پانګه" /> : null }
                { getRoles === 1? <Tab label="جنس" /> : null}
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {tabValue === 0 && <Typography variant="body1"><Roznamcha /></Typography>}
                {tabValue === 3 && <Typography variant="body1"><Auth /></Typography>}
                {tabValue === 1 && <Typography variant="body1"><SalesReport /></Typography>}
                {tabValue === 2 && <Typography variant="body1"><Expenses /></Typography>}
                {tabValue === 4 && <Typography variant="body1"><Capital /></Typography>}
                {tabValue === 5 && <Typography variant="body1"><ProductDetails /></Typography>}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Report.propTypes = {}

export default Report;