import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import './upgrade.scss'
import CountdownTimer from '../../../veiws/Dashboard/sale/countDownTimer';
import UpdateBranchDetails from '../../../veiws/Dashboard/branchPayment/components/popup';
import UpdatePassword from '../../../veiws/Dashboard/branchPayment/components/updatepassword';

export const Upgrade = () => {
    const navigate = useNavigate();
    const userData = sessionStorage.getItem('User_Data');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [openpassword, setOpenpassword] = useState(false);
    const handleOpenpassword = () => setOpenpassword(true);
    const handleClosepassword = () => setOpenpassword(false);

    
    const rowData =  JSON.parse(userData)?.branch;
    const branchUser = userData ? JSON.parse(userData)?.branch?.main_branch : undefined;
    const logOut = () => {
        localStorage.removeItem("login_timer_start"); 
        // localStorage.setItem("LoggedIn", 'False');
        sessionStorage.clear(); 


      window.location.reload(true)
      window.location.href = "/login";
    }
    const refresh = () => { 
        if (window.electron) { 
          window.location.reload(); // Use this for both browsers and Electron
        } else { 
          window.location.reload(true);
        }
      };
    const updateDetails = () => {
        // alert("sami")
    }
    return (
        <>
        <UpdateBranchDetails
            open={open}
            onClose={handleClose}
            getdata={rowData}
        /> 
        <UpdatePassword
            open={openpassword}
            onClose={handleClosepassword}
            getdata={rowData}
        /> 
                <Box className="loggingOut">
                    {/* <Button onClick={refresh}>Refresh</Button> */}
                </Box>
                <Box className='loggingOut' mt={1}>
                    <Button onClick={logOut}>Logout</Button>
                    {/* <Box sx={{width:"20px",height:"10pxs"}}></Box> */}
                    {/* / */}
                    {branchUser == 1
                    ?
                  <Button onClick={handleOpen}>Update Branch</Button>
                    :
                  <Button onClick={handleOpenpassword}>Update Password</Button>
                  }
                </Box>
                <Box className='loggingOut' mt={1}>
                    <CountdownTimer />
                </Box>
 
        </>
    );
};
