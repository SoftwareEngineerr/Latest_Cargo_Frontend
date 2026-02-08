import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

const Loader = (props) => {
  const loader = useSelector((state)=>state.Loader.Seconds)
  const properties = () => {
    if(loader == 0){
      return {
        visibility: 'hidden',
        opacity:'0'
      }
    }
    else{
      return {
        visibility: 'visible',
        opacity:'0.3'
      }
    }

  }
  return (
    <Box sx={properties} className='mainlodaer' >
        <span className="loader"></span>
    </Box>
  )
}

Loader.propTypes = {}

export default Loader