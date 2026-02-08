import { Box, Card, CardContent, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonProduct = () => {
  return (
    <Card
        sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        p: 0,
        }}
    > 
    
        <Skeleton variant="rectangular" height={100} animation="wave" />
        <CardContent> 
        <Skeleton variant="text" width="50%" height={25} animation="wave" sx={{ mt: 1 }} />
         <Skeleton variant="text" width="40%" height={20} animation="wave" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Skeleton variant="text" width="30%" height={20} animation="wave" />
            <Skeleton variant="text" width="30%" height={20} animation="wave" />
        </Box>
        <Skeleton variant="text" width="90%" height={15} animation="wave" sx={{ mt: 1 }} />
        {/* <Skeleton variant="text" width="70%" height={15} animation="wave" /> */}
        </CardContent>
    </Card>
  )
}

export default SkeletonProduct
