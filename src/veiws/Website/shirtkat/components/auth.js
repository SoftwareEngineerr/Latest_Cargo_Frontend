import React, { useEffect, useState } from 'react';
import { Box, Icon, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { Main } from '../../../../constant';
import { Input } from '../../../../components/input/input';
import { PostRequest } from '../../../../redux/actions/PostRequest';


const Auth = (props) => {
    const [data, setData] = useState(Main().Login);
    const dispatch = useDispatch();
    const apilink = useSelector((state) => state.Api.Login);
    const url = useSelector((state) => state.Api);
    const veri = useSelector((state) => state.Auth.permission);
    const [loginSuccesful, setLoginSuccesful] = useState(false)
    const navigate = useNavigate()
    const [getlocation, setGetlocation] = useState('');
    const [websrndata, serWebsrndata] = useState()

    const initialInputValues = Object.fromEntries(
        data.inputs.map((item) => [item.name, ''])
    );
    const [res, setRes] = useState(true)

    const [inputValues, setInputValues] = useState(initialInputValues);
    const [loginError, setloginError] = useState('');
    const [activeButton, setActiveButton] = useState(false);
    // const [expiringDate, setExpiringDate] = useState(localStorage.getItem('ActivationDate'));
    const [expiringDate, setExpiringDate] = useState('');
    const [blockLogin, setBlockLogin] = useState(localStorage.getItem('Activated'));
    localStorage.removeItem("login_timer_start"); 


    useEffect(() => {
  const getLocation = async () => {
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not supported");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,  // Request best possible accuracy
          timeout: 5000,            // Don't take longer than 5 seconds
          maximumAge: 0             // Don't use cached position
        });
      });

      const objLoc = { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy // Add accuracy measurement
      };
      
      setGetlocation(JSON.stringify(objLoc));
      
      // Check if accuracy is acceptable (e.g., within 100 meters)
      
      if (position.coords.accuracy <= 5000) {
        setBlockLogin(websrndata == 9 ? false : websrndata == 10 ? false : true);
      } else {
        console.warn("Location accuracy too low:", position.coords.accuracy);
      }
    } catch (error) {
      console.warn("Location error:", error.code, error.message);
      // Handle different error cases
      switch(error.code) {
        case error.PERMISSION_DENIED:
          // User denied the request
          break;
        case error.POSITION_UNAVAILABLE:
          // Location unavailable
          break;
        case error.TIMEOUT:
          // Request timed out
          break;
        default:
          // Unknown error
      }
    }
  };

  getLocation();
}, []);

    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }


    const myfunc = async (event) => {
  event.preventDefault();

  const payload = {
    ...inputValues,
  };

  setRes(false);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;
  const res = await dispatch(PostRequest(url.ShirtkatLogin ,  userToken, payload))
  // JSON.parse(localStorage.getItem("Shirkat_Data"));
  if(res.success){
    localStorage.setItem("Shirkat_Data", JSON.stringify(res));
    navigate('/shirkat/home')
  }
};



    // useEffect(()=>{
    //     const currentDate = new Date();
    //     const getExpMonth = Number(localStorage.getItem('ActivationDate')?.split('/')[1])
    //     const currMonth = currentDate.getMonth()+1 
    //     //console.log(expiringDate)
    //     //console.log(currentDate.getMonth()+1 , Number(getExpMonth))
    //     if( currMonth >= getExpMonth){
    //         setloginError('Your Application is expiring soon please call Wasily Technology 0703131865')
    //         setActiveButton(true)
    //     }
    //     if (currentDate > expiringDate) {
    //         navigate('/activation');  // If expired, go to '/Private'
    //         setLoginSuccesful(false)
    //         localStorage.setItem("LoggedIn", 'False')
    //     } else if(loginSuccesful) {
    //         navigate('/Private'); // If valid, go to '/activate'
    //         setLoginSuccesful(false)
    //         localStorage.setItem("LoggedIn", 'True')
    //     }
    // },[loginSuccesful])

    const activationPage = () => {
        navigate('/activation');  // If expired, go to '/Private'
        setLoginSuccesful(false)
        localStorage.setItem("LoggedIn", 'False')
    }
    const rawDate = localStorage.getItem("ActivationDate"); // "15/05/2025"

    let readableDate = ''
    if(rawDate){
        const [day, month, year] = rawDate.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        readableDate = formattedDate.toLocaleDateString('en-GB', options);
    }

    return (
        <form onSubmit={myfunc}>
            <Stack>
                {data.inputs.map((item, ind) => (
                    <Grid item lg={12} key={ind}>
                        <Box mt="25px">
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='password' mb="5px" >
                                {item.label}
                            </Typography>
                            <Input
                                key={ind}
                                type={item.type}
                                placeholder={item.data}
                                required={item.required}
                                name={item.name}
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Box>
                    </Grid>
                ))}
                <Box>
                    <br />
                    { 
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth 
                            type="submit"
                            // disabled={ !blockLogin} 
                        >
                            {data.butn}
                        </Button> 
                    }
                    
                </Box>
                <div className='geoLocation'>
                    <p  className='blinking-text wrongUser'>{loginError}</p>
                </div>
                    { activeButton ?
                        <Button 
                        color="primary"
                        variant="contained"
                        size="large"
                         onClick={activationPage}>Renew</Button>
                        :
                        null
                    }
                <>
      {!blockLogin  && (
        <div className='geoLocation'>
            {/* <p><Icon component={LocationOnOutlinedIcon} /></p> */}
            <p className='blinking-text'>دواصلي ڼیکنالوږي سره تماس ونیسی 0703131865</p>
            {/* <p className='blinking-text'>Please Contact Wasily Technology +(90)703131865  </p> */}
        </div>
      )}
      <div>
        {/* <h3 className='version'>Version 0.0.1</h3> */}
        <h3 className='expiryDate'>www.Wasily.net</h3>
      </div>
    </>
            </Stack>
        </form>
    );
};

Auth.propTypes = {};

export default Auth;
