import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Input, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import { IconCross } from '@tabler/icons';
import { ArrowRight, ArrowRightAlt, DarkMode, LightMode, WrongLocationTwoTone } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers-pro';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeMenuItemColor, ChangeMode, Sidemenusize } from '../../../../redux/actions/theme/theme';

const Items = (props) => {
    const style = useTheme().palette;
    const customizeSideBar = style.customizeSideBar;
    const themedata = useSelector((state)=>state.theme);
    const dispatch = useDispatch()
    
    //console.log(themedata.data)

    const dark = async() => {
        await dispatch(ChangeMode('dark'))
    }
    const light = async() => {
        await dispatch(ChangeMode('white'))
    }
    const menucolor = async(param) => {
        //console.log(param)
        await dispatch(ChangeMenuItemColor(param))
    }
    const menusize = async (param)=>{
        await dispatch(Sidemenusize(param))
    }
  return (
    <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}  sx={customizeSideBar.top} display='flex' justifyContent='space-between'>
            <Box>
                <Typography variant='h5'>
                    Settings
                </Typography>
            </Box>
            <Box>
                <Close
                sx={{cursor: 'pointer'}}
                onClick={props.func}
                />
            </Box>
        </Grid>
        <Box sx={{border:'1px solid gray' , width:'100%'}} mb={2}></Box>
        <Box pl={2}>
            <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12} mt={1}>
                    <Typography variant='h5'>
                        Theme Option
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Box sx={customizeSideBar.smartbox} onClick={light}>
                        <LightMode sx={customizeSideBar.icon} />
                        Light
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Box sx={customizeSideBar.smartbox} onClick={dark} >
                        <DarkMode sx={customizeSideBar.icon} />
                        Dark
                    </Box>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}  mt={1}>
                    <Typography variant='h5'>
                        Theme Direction
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} >
                    <Box sx={customizeSideBar.smartbox}>
                        <ArrowLeftIcon sx={customizeSideBar.icon} />
                        LTR
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} >
                    <Box sx={customizeSideBar.smartbox}>
                        <ArrowRightIcon sx={customizeSideBar.icon} />
                        RTL
                    </Box>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}  mt={1}>
                    <Typography variant='h5'>
                        Side Menu
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} >
                    <Box sx={customizeSideBar.smartbox}  onClick={()=>menusize('none')}>
                        <ArrowLeftIcon sx={customizeSideBar.icon} />
                        SM
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} >
                    <Box sx={customizeSideBar.smartbox}  onClick={()=>menusize('display')}>
                        <ArrowRightIcon sx={customizeSideBar.icon} />
                        LG
                    </Box>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}  mt={1}>
                    <Typography variant='h5'>
                        Theme Colors
                    </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('blue')}>
                            <Box sx={customizeSideBar.colorBox.blue}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('rgb(250, 137, 107)')}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(250, 137, 107)'}}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('rgb(0, 116, 186)')}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(0, 116, 186)'}}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('rgb(118, 62, 189)')}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(118, 62, 189)'}}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('rgb(10, 126, 164)')}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(10, 126, 164)'}}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox} onClick={()=>menucolor('rgb(1, 192, 200)')}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(1, 192, 200)'}}>
                                <Input type="checkbox" sx={customizeSideBar.input} />
                            </Box>
                        </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6} >
                    <Box sx={customizeSideBar.smartbox}>
                            <Box sx={{...customizeSideBar.colorBox.blue , background:'rgb(1, 192, 200)'}}>
                                <Input type="color"
                                onChange={(event)=>menucolor(event.target.value)} 
                                // sx={customizeSideBar.input} 
                                sx={{
                                    width:'100%'
                                }}
                                />
                            </Box>
                        </Box>
                </Grid>
                


            </Grid>

        </Box>
    </Grid>
  )
}

Items.propTypes = {}

export default Items