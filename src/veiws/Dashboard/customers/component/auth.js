import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { POS } from '../../../../constant/pos';
import { Input } from '../../../../components/input/input';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StudentRegistation } from '../../../../redux/actions/registration/studentregistation';
import SuggestionInput from '../../../../components/suggestionInput/suggestionInput';
import axios from 'axios';
import CustomForm from '../../../../components/form/form';
import { CustomBtn } from '../../../../components/button/button';
import AccessibleTable from './table'

const Auth = (props) => {
    const [data, setData] = useState(POS().Supplier);
    const dispatch = useDispatch();
    const api = useSelector((state) => state.Api);
    const getfilterdata = data.inputs.filter((item) => item.feildtype !== 'label');

    const initialInputValues = Object.fromEntries(getfilterdata.map(item => [item.name, '']));
    const [inputValues, setInputValues] = useState(initialInputValues);
    const [butnVisiablity, setButnVisiablity] = useState(true);
    const [formKey, setFormKey] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const initCustomer = useRef(false)
    // Fetch supplier suggestions
    useEffect(() => {
        const fetchCustomerBills = async () => {
          // if(initCustomer.current || refreshTrigger) return
          // initCustomer.current = true
          const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
          try {
            const response = await axios.get(api.allCustomerBills, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
              },
            });
            if (response.status === 200) {
              setSuggestions(response.data);
            }
          } catch (err) {
            console.error('Error fetching suppliers:', err);
          }
        };
      
        fetchCustomerBills();
      }, [api.allCustomerBills, refreshTrigger]); // Include refreshTrigger in dependencies
      

    
    return (
        <>
      <Grid container>
                 
                <Grid lg={12}>
                    <AccessibleTable 
                    rows={suggestions}  
                    setRefreshTrigger={setRefreshTrigger} 
                    />
                </Grid>

                </Grid>
            <form  >
                
                <Grid container>
                    {/* <CustomForm key={formKey} data={data.inputs} handleInputChange={handleInputChange} /> */}
                </Grid>
                <Grid container mt={1}>
                    <Grid lg={6} item>
                    </Grid>
                    <Grid lg={6} item>
                        <Box>
                            {/* <CustomBtn disable={!butnVisiablity} data={data.butn} style={{ margin: 'auto', display: 'block', marginTop: '10px' }} /> */}
                        </Box>
                    </Grid>
                </Grid>
            </form>


        </>
    );
};

Auth.propTypes = {};

export default Auth;
