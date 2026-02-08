import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Slider, useTheme } from '@mui/material'
import TrackingTimeline from './indication';
import DeliveryOptions from './deliveryoptions';

const DilveryDetails = props => {
    const style = useTheme().palette.Components.dilverydetails;
  return (
    <div>
        <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <DeliveryOptions />
            </Grid>
            <Grid  item lg={4} md={4} sm={12} xs={12}>
                <TrackingTimeline />
            </Grid>
            
        </Grid>
    </div>
  )
}

DilveryDetails.propTypes = {}

export default DilveryDetails