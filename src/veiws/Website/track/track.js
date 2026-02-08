import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Slider, Typography, useTheme } from '@mui/material';
// import Label from './components/label';
import DilveryDetails from './components/dilverydetails';
import { Helmet } from 'react-helmet';
import Label from '../../../components/xaoasoft/label';

const GetTrackRecord = props => {
    const style = useTheme().palette.Components.track;
    const {id} = useParams();
  return (
    <Box id="dilverydetails">
        <Helmet title="Track Id" />
        <Container maxWidth="lg" sx={{
            padding: {
                lg: '22px 73px',
                md: '10px 0px',
                sm: '10px 0px'
            }
            }}>
            {/* <Label /> */}
            <br />
            <DilveryDetails />
        </Container>
        <hr style={{margin: '0'}} />
    </Box>
  )
}

GetTrackRecord.propTypes = {}

export default GetTrackRecord