import React, { useEffect, useState } from 'react';
import Purchase from '../veiws/Dashboard/purchase/purchase';
import BranchPayment from '../veiws/Dashboard/branchPayment';
import DisputeOrder from '../veiws/Dashboard/sale/component/disputeOrders';

const Checker = () => {


  const userData = sessionStorage.getItem('User_Data');
  const userToken = userData ? JSON.parse(userData)?.branch?.main_branch : undefined;
  const dispute = userData ? JSON.parse(userData)?.branch?.origin : undefined;
  const isDispute = dispute === 'DISPUTE';



     if (userToken === 1 && !isDispute) {
      return <BranchPayment />;
    } else if (isDispute) {
      return <DisputeOrder />;
    } else {
      return <Purchase />;
    }


 
};

export default Checker;
