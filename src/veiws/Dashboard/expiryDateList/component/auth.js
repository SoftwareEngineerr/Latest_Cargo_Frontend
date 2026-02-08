import React, { useEffect, useState } from 'react';
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

    // Fetch supplier suggestions
    useEffect(() => {
        const fetchSuppliers = async () => {
            const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
            try {
                if (!suggestions.length) {
                    const response = await axios.get(api.showProducts, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                    });
                    if (response.status === 200) {
                        setSuggestions(response.data.data);
                    }
                }
            } catch (err) {
                console.error('Error fetching suppliers:', err);
            }
        };

        fetchSuppliers();
    }, [api.showReceipts, suggestions.length, refreshTrigger]);

    
    return (
        <>
      <Grid container>
                 
                    <Grid lg={12}>
                        <AccessibleTable rows={suggestions}   />
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
