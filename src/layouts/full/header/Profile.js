import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from '../../../assets/images/profile/user-1.jpg';
import { Logout } from '../../../redux/actions/loginauth';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../../hooks/FirstTimeWebSrn/Websrn';


const Profile = () => {
  const dispatch = useDispatch();
  const image = useSelector((state)=>state.Api.imageServer)
  const [anchorEl2, setAnchorEl2] = useState(null);
  let navigate = useNavigate();
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const logoutpage = () =>{
    // alert()
    // sessionStorage.clear();
    localStorage.setItem('User_Data', '')
    navigate('/login')
    // dispatch(Logout())
    // sessionStorage.clear()
  }
  const linkStyle =  {
    textDecoration: 'none'
  }
  // //console.log(UserData)  
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={`${image}${UserData() && UserData().userimage}`}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <Link className='Profileitem' to="/Private/My-Profile">My Profile</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem> */}
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText><Link to={`/Private/Order`}>Dashboard</Link></ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button onClick={logoutpage} variant="outlined" color="primary"  fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
