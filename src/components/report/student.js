import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { CustomBtn } from '../button/button'
import { PostRequest } from '../../redux/actions/PostRequest'
import StudentUpdateinfo from './StudentUpdateinfo'
import StudentCard from './cardsCollection/StudentCard'
import XaosoftCard from './cardsCollection/xaosoftCard'

const StudentReportComponent = (props) => {
    props.data.studentOrTeacher = 'student'
    const image = useSelector((state)=>state.Api.imageServer)
    // //console.log(`${image}${props.data.Picture}`)
    const style = useTheme().palette.Components.teacherreoprt;
    const url = useSelector((state)=>state.Api);
    const dispatch = useDispatch();
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;

    const [open, setOpen] = useState(false);
    const [webSrn, setWebSrn] = useState(localStorage.getItem('WebSrn'));
    const [modal, setModal] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

    const func = async(getparam) => {
        setOpen(true);
        // handleClickOpen(getparam)
    }
    
    const handleClickOpen = async(getparam) => {
        const payload = {
            Approved: props.data.approved == '1' ? 0 : 1,
            RollNum: props.data.RollNum,
        }
        await dispatch(PostRequest(url.studentActivitionUpdateActiviation, userToken , payload))
        props.updatefunc()
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateinformation = () => {
        setModal(true);
    }
    const modalClose = () => {
        setModal(false);
    }
  return (
    <>
     
<Dialog
  open={modal}
  onClose={modalClose}
  aria-labelledby="responsive-dialog-title"
  className='dialogCustomSize'
>
  <DialogTitle id="responsive-dialog-title" >
    Update Information
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      <StudentUpdateinfo info={props.data} RollNum={props.data.RollNum} />
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button autoFocus onClick={modalClose}>
      Cancel
    </Button>
    {/* <Button onClick={handleClickOpen} autoFocus>
      Ok
    </Button> */}
  </DialogActions>
</Dialog>



      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            {props.data.approved == true?
            <>
            <span>Do you want to EXIT this person ?</span>
            <br/>
            <span>ایا تاسو غواړئ دا نفر وباسی ؟</span>
            </>
            :
            <>
            <span>Do you want to ADD this person ?</span>
            <br/>
            <span>ایا تاسو غواړئ دا نفر برته داخل کی ؟</span>
            </>            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose()}>
            Cancel
          </Button>
          <Button onClick={handleClickOpen} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

        <Grid container>
            <Grid item lg={12}>
                <Box p={3}>
                    <Grid container>
                        <Grid item lg={5} md={6} sm={6} xs={6}>
                            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' height='100%'>
                                <Avatar
                                src={`${image}${props.data.Picture}`}
                                sx={style.image}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Grid container>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Roll Number: <b>{props.data.RollNum}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Name: <b>{props.data.Name}  {props.data.Name_P}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        FName: <b>{props.data.FName_P}</b>
                                    </Typography>
                                </Grid>
                                {
                                    props.data.HostelFacility == 1 ? (
                                        <Grid item lg={12} md={12} sm={12} xs={12} style={{backgroundColor:'#ebebeb'}}>
                                            <Typography variant='p'>
                                                Hostelized : <b>لیلیه</b>
                                            </Typography>
                                        </Grid>
                                    ) : null
                                }
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Class: <b>{props.data.Class}</b>
                                    </Typography>
                                </Grid>
                                {
                                    props.data.Orphan == 1 ? (
                                        <Grid item lg={12} md={12} sm={12} xs={12} style={{backgroundColor:'#ffe5e5'}}>
                                            <Typography variant='p'>
                                                Orphan : <b>یتیم</b>
                                            </Typography>
                                        </Grid>
                                    ) : null
                                }
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Phone Number: <b>{props.data.TellNo1} , {props.data.TellNo2}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Monthly Fee: <b>{props.data.MonthlyFee}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Discount: <b>{props.data.Discount}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                       Old Assas: <b>{props.data.OldAssasNo}</b>
                                    </Typography>
                                </Grid>


                                
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Date Of Brith: <b>{props.data.DOB}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Admission Date: <b>{props.data.AdmissionDate}</b>
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Address: <b>{props.data.Address} ,  {props.data.Address_P}</b>
                                    </Typography>
                                </Grid>
                                {
                                    props.data.ArabicCenter == 1  || props.data.EnglishCenter == 1 || props.data.HolyQuran == 1 || props.data.ComputerCenter == 1 ? (
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='p'>
                                               Courses: <b>{props.data.ArabicCenter == 1 ? 'Arabi عربی ' : null }{props.data.HolyQuran == 1 ? 'Holy Quran قران کریم  ' : null }{props.data.ComputerCenter == 1 ? 'Computer کمپیوټر ' : null }{props.data.EnglishCenter == 1 ? 'English انګلیسي ' : null }</b>
                                            </Typography>
                                        </Grid>
                                    ) : null
                                }
                                 

                                
                                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography variant='p'>
                                        Phone Number: <b>{props.data.TellNo2}</b>
                                    </Typography>
                                </Grid> */}
                                {
                                    props.data.approved == 0 || props.data.approved == 1 || props.data.approved == 'false' || props.data.approved == 'true' ? (
                                        <Grid item lg={12} md={12} sm={12} xs={12} mt={1}>
                                            <Typography variant='p'>
                                                <Grid container> 
                                                    <Grid item lg={10}>
                                                        {
                                                            props.data.approved == 1  || props.data.approved == 'true'?
                                                                <>
                                                                    <CustomBtn style={{backgroundColor:"red"}} type="button" click={()=>func(0)} data="Reject اېستل" />
                                                                    <br/>
                                                                    <br/>
                                                                    {
                                                                    webSrn == 3 ?//Alkhidmat 
                                                                        <StudentCard info={props.data}/> 
                                                                    : webSrn == 6 ?//Xaosoft Dummy
                                                                    <XaosoftCard info={props.data}/> 
                                                                    : null}
                                                                </>
                                                            :
                                                                <CustomBtn type="button" click={()=>func(1)} data="Admit داخل" />
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </Grid>
                                        )
                                    :
                                    null
                                }
                                 {
                                   props.data.activatePage == true?(
                                        <Grid item lg={12} md={12} sm={12} xs={12} mt={1}>
                                            <Typography variant='p'>
                                                <Grid container>
                                                    {/* <Grid item lg={4}>
                                                        <Box pt={1}>
                                                            Update Student: 
                                                        </Box>
                                                    </Grid> */}
                                                    <Grid item lg={10}>
                                                        
                                                                <CustomBtn type="button" click={()=>updateinformation(1)} data="update information" />
                                                        
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </Grid>
                                        )
                                    :
                                    null
                                }


                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
        </Grid>
    </>
  )
}

StudentReportComponent.propTypes = {}

export default StudentReportComponent