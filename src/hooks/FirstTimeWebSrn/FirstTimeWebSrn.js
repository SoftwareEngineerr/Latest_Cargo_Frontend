import React, { useEffect, useState } from 'react';
import { WebSrnStorage, WebHost } from './Websrn';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { User_Data } from '../Requests/localStroagedata';
import { checklogin } from '../../redux/actions/loginauth';

export const FirstTimeWebSrn = (props) => {
  // const webSrnApi = useSelector((state) => state.Api.Web);
  const dispatch = useDispatch();
  const WebSrn = window.location.hostname;
  const getWebSrnStorage = WebSrnStorage(); 
//   useEffect(() => {//|| (getWebHost == null || getWebHost.localeCompare(window.location.hostname) != 0 )
//     if(getWebSrnStorage == null ){
//     if(webSrnApi){
//       dispatch({ type: "SHOW_LOADER", Seconds: "1000" });
//     const data = axios.post(webSrnApi , {WebSrn})
//     .then((res)=>{
//       localStorage.setItem("WebSrn",res.data.WebSrnId)
//       localStorage.setItem("Host",window.location.hostname)
//       dispatch({ type: "SHOW_LOADER", Seconds: "0" });
//     })
//   }
// }

// if(User_Data != null){
//   dispatch(checklogin())
// }


//   }, [webSrnApi, WebSrn]); // Add dependencies if needed

  return (
    <div>
     
    </div>
  );
};
