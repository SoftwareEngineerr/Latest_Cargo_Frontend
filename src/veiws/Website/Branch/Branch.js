import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router';
import { Box, Card, Grid, Typography } from '@mui/material';
import PageContainer from '../../../components/Container/pageContainer';
import Logo from '../../../components/Logo/Logo';
import { UserInterFace } from '../../../constant/Website';
import { useTheme } from '@emotion/react';
import { CustomBtn } from '../../../components/button/button';

const Branch = (props) => {
    let { BranchId } = useParams();
    const [ data , setData ] = useState(UserInterFace.Branch);
    const theme = useTheme();
    const style = theme.palette.Main.contact;
    const filterdata = data.Branchitems; //.filter((item)=>item.id == BranchId)[0];
    //console.log(filterdata)
  return (
    <Box>
        {
  filterdata && filterdata.length > 0 ? (
    filterdata.map((item, index) => (
      <PageContainer key={index} title={item.name} description={item.name}>
        <Box sx={style.mainbox}>
          <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={5}
              xl={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '700px' }}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  mb={4}
                >
                  <Box component="img" sx={style.image} src={item.logo} />
                  <Typography variant="h2">{item.name}</Typography>

                  <Box mt={3}>
                    <Grid container>
                      <Grid item lg={7}>
                        <iframe
                          src={item.location}
                          width="100%"
                          height="100%"
                          loading="lazy"
                        ></iframe>
                      </Grid>
                      <Grid item lg={5}>
                        <Box p={1} sx={{ textAlign: 'right' }}>
                          {item.email}
                          <br />
                          {item.whatsapp}
                          <br />
                          {item.phone}
                          <br />
                          {item.Address}
                          <br />
                        </Box>
                      </Grid>

                      <Grid item lg={6} sx={{ marginTop: '20px' }}>
                        <Box p={1}>
                          <CustomBtn link="/auth/login" data="Admin" />
                        </Box>
                      </Grid>
                      <Grid item lg={6} sx={{ marginTop: '20px' }}>
                        <Box p={1}>
                          {/* <CustomBtn link="/Result" data="Result" /> */}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    ))
  ) : (
    <PageContainer title="Branch Not Found" description="Branch Not Found">
      <Box>Branch Not Found</Box>
    </PageContainer>
  )
}


    </Box>
  )
}

Branch.propTypes = {}

export default Branch