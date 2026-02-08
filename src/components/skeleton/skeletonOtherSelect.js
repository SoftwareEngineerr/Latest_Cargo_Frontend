import { Box, Card, CardContent, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonOtherSelect = () => {
  return ( 
    <div style={{marginTop:'-11px'}}>
        <Skeleton variant="text" width="100%" height={70} animation="wave"  />
    </div>
        
  )
}

export default SkeletonOtherSelect