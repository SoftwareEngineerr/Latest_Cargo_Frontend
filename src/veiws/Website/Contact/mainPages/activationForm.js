import React, { useEffect, useState } from 'react';
import { Button,  Box, Card, Grid } from '@mui/material';
import { UserInterFace } from '../../../../constant/Website';
import CustomForm from '../../../../components/form/form';
import { CustomBtn } from '../../../../components/button/button';
import Logo from '../../../../components/Logo/Logo';
import { Registered, Activated, ActivationDate } from './../../../../hooks/FirstTimeWebSrn/Websrn';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router'; 

const ActiviationForm = () => {
    const [data, setData] = useState(UserInterFace.activation);
    const [formKey, setFormKey] = useState(0);
    const [butnVisiablity, setButnVisiablity] = useState(true);
    const dispatch =  useDispatch()
    const navigate =  useNavigate()
    const userRegisteredData = Registered()
    const [activationDate, setActivationDate] = useState();
    const api = useSelector((state) => state.Api);

    const getfilterdata = data.form.filter((item) => item.feildtype !== 'label');
    const initialInputValues = Object.fromEntries(
        getfilterdata.map((item) => [item.name, ''])
    );
    const [inputValues, setInputValues] = useState(initialInputValues);
    const [serverError, setServerError] = useState('');
    const [system, setSystem] = useState([]);

    const myfunc = (event) => {
        event.preventDefault();
        //console.log(inputValues)
        userRegisteredData.otp = inputValues.otp 
        //console.log(userRegisteredData) 
        const getLocalStorage = JSON.parse(localStorage.getItem('Registered'))
        const payload = {mobile: system[0].phone, password:system[0].osNumber, otp: inputValues.otp}

        dispatch({ type: "SHOW_LOADER", Seconds: "1000" });
        axios.post('https://roznamchaback.wasily.net/activate', payload )
        // axios.post(api.posVerify, inputValues )
            .then((res) => {
              if (res.status === 200) {
                //const getDate = FormatDate(d) //
                localStorage.setItem('Activated', true)
                localStorage.setItem('ActivationDate', JSON.stringify(res.data))
                activationLocal(res.data)

                //console.log(res.data);
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
              }
            })
            .catch((err) => {
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
                console.error(err); // Log the error response for debugging
                setServerError(err?.response?.data?.message)
            });
    };

    const activationLocal = (payload) => {
        axios.post(api.activation, {activation:payload} )
            .then((res) => {
              if (res.status === 200) {
                //console.log(res.data.message);
                navigate('/login')
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });   
                setActivationDate(payload)             
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

    useEffect( () => {
        const activationDateStr = localStorage.getItem("ActivationDate");

        // if (activationDateStr) {
        //     // Parse the stored activation date (format: dd/mm/yyyy)
        //     const [day, month, year] = activationDateStr?.split("/").map(Number);
        //     const activationDate = new Date(year, month - 1, day); // JS Date uses 0-based month index

        //     // Get today's date without time
        //     const today = new Date();
        //     today.setHours(0, 0, 0, 0);
        //     //console.log(activationDate , today)

        //     if (activationDate > today) {
        //         navigate("/login");
        //     }
        // }
        sysInfo()
    }, [])
    
    const sysInfo = () => {
        axios.get(api.initialService,  )
            .then((res) => {
              if (res.status === 200) {
                //console.log(res.data);
                setSystem(res.data)
              }
            })
            .catch((err) => {
                dispatch({ type: "SHOW_LOADER", Seconds: "0" });
                console.error(err); // Log the error response for debugging
            });
    }

    const loginPage = () => {
        navigate('/login');  // If expired, go to '/Private'
    }

    const checkServerHealth = async () => {
        try {
            const response = await axios.get('https://roznamchaback.wasily.net/health'); // Replace with your actual backend URL
            if (response.status === 200) {
                setButnVisiablity(true)
            }
            else{
                setButnVisiablity(false)
            }
        } catch (error) {
            setButnVisiablity(false)
        }
    };
     useEffect(() => {
            checkServerHealth()
            const interval = setInterval(() => {
                checkServerHealth();
            }, 10000);
            return () => clearInterval(interval);
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
                            <Grid lg={3} item>
                                <Box>
                                <Button 
                                    style={{ margin: 'auto', display: 'block', marginTop: '10px' }}
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    onClick={loginPage}>Login</Button>
                                </Box>
                            </Grid>
                            <Grid lg={12} item>
                                <Box>
                                    <h3>For License please call +93 70 3131 865 Wasily Technology.</h3>
                                    <h3>visit our website www.wasily.net</h3>
                                </Box>
                                <Box>
                                       <h2 style={{backgroundColor:'red'}}>{serverError}</h2> 
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

            </form>
        </Box>
    );
};

export default ActiviationForm;