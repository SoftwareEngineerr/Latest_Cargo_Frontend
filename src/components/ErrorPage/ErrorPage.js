import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { useNavigate } from "react-router-dom";

const ErrorPage = props => {
  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("LoggedIn"); 
        localStorage.removeItem("login_timer_start"); 
        window.location.href = "/login"; 
    };

  return (
    <div className="main">
      <br/>
      <Grid container>
        <Grid item lg={4}></Grid>

        <Grid item lg={5}>
        <img 
    style={{ height: '100%', width: '100%' }} 
   src={`/images/logos/logo_Wasily.png`}
    alt="Logo" 
    height={150} 
/>
        </Grid>
        <Grid item lg={4}></Grid>

      </Grid>

      <Grid container>
        <Grid item lg={4}></Grid>

        <Grid item lg={5}> 
        <h1>ستونزه</h1>

        <p className="zoom-area"> تاسو په اپلیکیشن کې له ستونزې سره مخ یاست،
        مهرباني وکړئ ریفریش کړئ. که کار ونکړي نو 0703131865 سره اړیکه ونیسئ. 
        <br/>
        www.Wasily.net
        </p>
        <br/> 
        </Grid>
        <Grid item lg={4}></Grid>

      </Grid> 

      <Grid container style={{textAlign:'right'}}>
      <Grid item lg={4}></Grid>
      <Grid item lg={2}>
        {/* <Link to="#" onClick={() => window.location.reload()} className="more-link">
                Refresh Page
            </Link> */}
        </Grid>
        <Grid item lg={2}>

        <Link onClick={handleLogout} className="more-link">Back to Login</Link>

        </Grid>
        <Grid item lg={4}></Grid>

      </Grid>
            

{/*              


            <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
            <Link to="/login" className="more-link">Back to Login</Link>
        </div> */}
    </div>
  )
}

ErrorPage.propTypes = {}

export default ErrorPage