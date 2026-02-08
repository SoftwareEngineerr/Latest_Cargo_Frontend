import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { POS } from '../../../constant/pos';
import { Input } from '../../../components/input/input';
// import Auth from './components/auth';
import PageContainer from '../../../components/Container/pageContainer';
import { useTheme } from '@emotion/react';
import OutgoingOrder from '../sale/component/outgoingOrders';

const ExpiryList = (props) => {
  const theme = useTheme();
    const style = theme.palette.Main.login;
    const [data , setData] = useState(POS().Receipt);
    //console.log('Receipt component')
    return (
       <>
       <PageContainer  title={data.title} description={data.description}>
           <OutgoingOrder />
       </PageContainer>
       </>
    );
}

ExpiryList.propTypes = {}

export default ExpiryList