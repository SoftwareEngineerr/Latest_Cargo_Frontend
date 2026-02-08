import React, { useEffect, useState } from 'react';
import { Box, Card, Grid } from '@mui/material';
import { UserInterFace } from '../../../../constant/Website';
import CustomForm from '../../../../components/form/form';
import { CustomBtn } from '../../../../components/button/button';
import Logo from '../../../../components/Logo/Logo';
import { User_Data } from '../../../../hooks/Requests/localStroagedata';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RegistrationForm = () => {
    const [data, setData] = useState(UserInterFace.registration);
    const [formKey, setFormKey] = useState(0);
    const [butnVisiablity, setButnVisiablity] = useState(false);
    const url = useSelector((state) => state.Api)
    const dispatch =  useDispatch()
    const navigate =  useNavigate()

    const getfilterdata = data.form.filter((item) => item.feildtype !== 'label');
    const initialInputValues = Object.fromEntries(
        getfilterdata.map((item) => [item.name, ''])
    );
    const [inputValues, setInputValues] = useState(initialInputValues);

    const registerOnServer = (sys) => { 
        localStorage.setItem("Registered", JSON.stringify(inputValues))
        dispatch({ type: "SHOW_LOADER", Seconds: "1000" });
        const payloads ={
            clientName : inputValues?.superUser,
            mobile : inputValues?.superPhoneNumber,
            password : sys?.sysInfo?.id,
            currencies : [{POS:'Pharmacy'}, {SysInfo: sys.sysInfo}, {adminPass: inputValues?.superPassword}],
            email : inputValues?.superEmail,
            add : inputValues?.superAddress,
            months : 0
            }
            //console.log(payloads)
        axios.post('https://roznamchaback.wasily.net/register', payloads )
            .then((res) => {
              if (res.status === 200) {
                //console.log(res.data.message);
                navigate('/activation')
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
              }
            })
            .catch((err) => {
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
                console.error(err); // Log the error response for debugging
            });
    }
    const myfunc = (event) => {
        event.preventDefault(); 
        localStorage.setItem("Registered", JSON.stringify(inputValues))
        dispatch({ type: "SHOW_LOADER", Seconds: "1000" });
        axios.post(url.Registration, inputValues )
            .then((res) => {
              if (res.status === 200) {
                //console.log(res.data.message);
                // navigate('/activation')
                registerOnServer(res.data)
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
              }
            })
            .catch((err) => {
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
                console.error(err); // Log the error response for debugging
            });
    };

    const initService = () => {        
        axios.get(url.initialService )
            .then((res) => {
              if (res.status === 200) {
                //console.log(res.data);
                setInputValues((prevValues) => ({
                    ...prevValues,
                    sysInfo: res.data,
                }));
              }
            })
            .catch((err) => {
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
                console.error(err); // Log the error response for debugging
            });
    }

    const handleInputChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };

    const ChangeOnSelect = (getparam) => {
        setInputValues((oldData) => ({
            ...oldData,
            [getparam[2]]: getparam[3],
            [getparam[1]]: getparam[0],
        }));
    };

    const checkServerHealth = async () => {
        try {
            const response = await axios.get('https://roznamchaback.wasily.net/health'); // Replace with your actual backend URL
            if (response.status === 200) {
                //console.log('✅ Server is up and internet is working.');
                setButnVisiablity(true)
            }
            else{
                setButnVisiablity(false)
            }
        } catch (error) {
            setButnVisiablity(false)
            console.error('❌ Server is down or no internet connection.');
        }
    };

    useEffect(() => {
        checkServerHealth()
        const interval = setInterval(() => {
            checkServerHealth();
        }, 10000);
        return () => clearInterval(interval);
        // initService();
        // //console.log(inputValues)
    }, [])
    return (
        <Box>
            <br/>
            <form onSubmit={myfunc}>

                <Grid container spacing={0} justifyContent="center" sx={{ minHeight: '100vh' }}>
                    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', width: '700px' }}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Logo />
                        </Box>
                        <Grid container>
                            <CustomForm key={formKey} data={data.form} ChangeOnSelect={ChangeOnSelect} handleInputChange={handleInputChange} />
                        </Grid>
                        <Grid container mt={1}>
                            <Grid lg={3} item>
                                <Box></Box>
                            </Grid>
                            <Grid lg={6} item>
                                <Box>
                                    <CustomBtn disable={!butnVisiablity} data={butnVisiablity? data.btnTitle : 'Server issue :('} style={{ margin: 'auto', display: 'block', marginTop: '10px' }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid lg={12} item>
                        <Box>
                            <h3>For License please call +93 70 3131 865 Wasily Technology.</h3>
                            <h3>visit our website www.wasily.net</h3>
                        </Box>
                        <Box>
                                {/* <h2 style={{backgroundColor:'red'}}>{serverError}</h2>  */}
                        </Box>
                    </Grid>
                    </Card>
                </Grid>

            </form>
        </Box>
    );
};

export default RegistrationForm;