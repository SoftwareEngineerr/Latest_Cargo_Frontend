import React from 'react';
import { Grid, Box } from '@mui/material';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import MonthlyEarnings from './components/MonthlyEarnings';
import PageContainer from '../../../components/Container/pageContainer';
import  Notification  from './components/nootification';
import FessStatus from './components/FessStatus';
import ShortAttendance from './components/ShortAttendance';


const Dashboard = () => {
  //console.log('thisis  dashboard')
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
           
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;