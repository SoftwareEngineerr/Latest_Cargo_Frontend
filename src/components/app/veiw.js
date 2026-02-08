import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { CustomBtn } from '../button/button'
import { PostRequest } from '../../redux/actions/PostRequest'
import StudentUpdateinfo from './StudentUpdateinfo'

const AppStudentReportComponent = (props) => {
    const image = useSelector((state)=>state.Api.imageServer)
    // //console.log(`${props.data.Picture}`)
    // //console.log(`${localStorage.getItem('server')}/Public/${props.data.Picture}`)
    const style = useTheme().palette.Components.teacherreoprt;
    const url = useSelector((state)=>state.Api);
    const dispatch = useDispatch();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const imageUrl = JSON.parse(sessionStorage.getItem('User_Data'))?.imageUrl || undefined;

    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

    const func = async(getparam) => {
        setOpen(true);
        // handleClickOpen(getparam)
    }
 

    const handleClose = () => {
        setOpen(false);
    };
    const updateinformation = () => {
        setModal(true);
    }
    const modalClose = () => {
        setModal(false);
    }
    //console.log(imageUrl)
  return (
    <>
        <Grid container>
            <Grid item lg={12}>
                <Box p={3}>
                    <Grid container>
                        <Grid item lg={5} md={6} sm={12} xs={12}>
                            <Box md={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                                {
                                    //console.log(props.data.Picture)
                                }
                                {
                                    props.data.Picture != undefined ? 
                                    <>
                                        <Avatar
                                        src={`${imageUrl}${props.data.Picture}`}
                                        sx={style.image }
                                        />
                                    </>
                                    :
                                    <Avatar
                                        src={``}
                                        sx={style.image}
                                        />
                                }

                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Grid container>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Roll Number: <b>{props.data.RollNum}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Name: <b>{props.data.Name}  {props.data.Name_P}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Class: <b>{props.data.Class}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Phone Number: <b>{props.data.TellNo1} , {props.data.TellNo2}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Monthly Fee: <b>{props.data.MonthlyFee}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Discount: <b>{props.data.Discount}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                       Old Assas: <b>{props.data.OldAssasNo}</b>
                                    </Typography>
                                </Grid>


                                
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Date Of Brith: <b>{props.data.DOB}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Admission Date: <b>{props.data.AdmissionDate}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Address: <b>{props.data.Address} ,  {props.data.Address_P}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Fees: <b>{props.data.Fees}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Pending Amount: <b>{props.data.reduceamount}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        In : <b>{props.data.Incoming}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={6} xs={12}>
                                    <Typography variant='p'>
                                        Out: <b>{props.data.Outgoing}</b>
                                    </Typography>
                                </Grid>
                                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Pashto Address: <b>{props.data.Address_P}</b>
                                    </Typography>
                                </Grid> */}

                                
                                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Phone Number: <b>{props.data.TellNo2}</b>
                                    </Typography>
                                </Grid> */}
                               
                                


                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
        </Grid>
    </>
  )
}

AppStudentReportComponent.propTypes = {}

export default AppStudentReportComponent