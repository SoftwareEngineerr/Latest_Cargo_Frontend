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
import IncomingOrders from '../sale/component/incomingOrders';

const ReceiptComp = (props) => {
  const theme = useTheme();
    const style = theme.palette.Main.login;
    const [data , setData] = useState(POS().Receipt);
    //console.log('Receipt component')
    return (
       <>
       <PageContainer  title={data.title} description={data.description}>
           <IncomingOrders />
       </PageContainer>
       </>
    );
}

ReceiptComp.propTypes = {}

export default ReceiptComp