import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../../components/Container/pageContainer'
import { UserInterFace } from '../../../constant/Website';
import CustomForm from '../../../components/form/form';
import { Box, Card, Grid, Typography } from '@mui/material';
import Logo from '../../../components/Logo/Logo';
import { useTheme } from '@emotion/react';

const Result = (props) => {
    const [ data , setData ] = useState(UserInterFace.result);
    const [getfilterdata , setGetfilterdata ] = useState(data.inputs.filter((item) => item.feildtype !== 'label'));
    const [initialInputValues , setInitialInputValues] = useState(Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, ''])
    ));

    const [inputValues, setInputValues] = useState({...initialInputValues});
    function handleInputChange(e) {
        //console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const theme = useTheme();
    const style = theme.palette.Main.login;
  return (
    <PageContainer title={data.title} description={data.description}>
        <Box  sx={style.mainbox}>
                <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
           
                <Grid item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Card elevation={9} sx={{ p: 4, minHeight: '390px', zIndex: 1, width: '100%', width: '700px' }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Logo />
                    </Box>
                        <CustomForm data={data.inputs} handleInputChange={handleInputChange} />
                        <Box mt={2}>
                            <Grid container>
                                <Grid item lg={6}>
                                    <Typography variant='p'>
                                        Secured Marks :- 500
                                    </Typography>
                                </Grid>
                                <Grid item lg={6}>
                                    <Typography variant='p'>
                                        Against total marks
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box display="flex" mt={1}>
                            <Typography variant='h5' mr={2}>
                                Status :-
                            </Typography>
                            <Typography variant='p' mt={.4}>
                                Pass
                            </Typography>
                        </Box>
                    </Card>
                    </Grid>
                </Grid>
            </Box>
    </PageContainer>
  )
}

Result.propTypes = {}

export default Result