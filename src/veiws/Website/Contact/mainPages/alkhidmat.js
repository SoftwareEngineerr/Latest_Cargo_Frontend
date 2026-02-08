import React, { useState } from 'react'
import { useTheme } from '@emotion/react';
import { Box, Card, Grid } from '@mui/material';
import { UserInterFace } from '../../../../constant/Website';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Alkhidmat = (props) => {
    const [ data , setData ] = useState(UserInterFace.Contact);
    const theme = useTheme();
    const style = theme.palette.Main.contact;
    //console.log('this page is loading');
  return (
    <>
    <Box>
        <Grid className='allBranches' container>
            {
                data.menuitems.map((item, ind)=>
                    <Grid item lg={12} key={ind}>
                        <Link className='Profileitem' to={`${item.Branch}`}>
                            <Box sx={{background: theme.palette.primary.light , ...style.menuitems}}>
                                <Box className='spanOne' component="span">
                                    <Box component="img" sx={style.image} src={item.logo} />
                                </Box>
                                <Box className='spanTwo' component="span">
                                    {item.name}
                                </Box>
                            <ArrowForwardIosIcon sx={style.icon} />
                            </Box>
                        </Link>
                    </Grid>
                )
            }
        </Grid>
    </Box>
    </>
  )
}

Alkhidmat.propTypes = {}

export default Alkhidmat