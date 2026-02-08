import React from 'react'
import PropTypes from 'prop-types'
import { Outlet, useNavigate } from 'react-router';

const CheckLayout = props => {
  const getdata = JSON.parse(localStorage.getItem("Shirkat_Data"));
  const navigate = useNavigate();
    if(!getdata){
        navigate('/shirkat/login') 
    }
  return (
    <div>
        
        {
            getdata ? 
            <Outlet />
            :
            null
        }
        
    </div>
  )
}

CheckLayout.propTypes = {}

export default CheckLayout