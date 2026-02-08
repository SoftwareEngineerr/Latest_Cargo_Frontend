import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { POS } from '../../../../constant/pos';
import { Input } from '../../../../components/input/input';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
  const initProduts = useRef(false)
  
  // Fetch supplier suggestions
  useEffect(() => {
    const fetchSuppliers = async () => {
          if(initProduts.current ) return
          initProduts.current = true
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
  }, [api.showProducts, suggestions.length, refreshTrigger]);

  const handleInputChange = (e) => {
    // //console.log(inputValues)
    setInputValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const myfunc = async (event) => {
    event.preventDefault();
    setButnVisiablity(false);
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
    // await dispatch(StudentRegistation(api.addSupplier, JSON.parse(localStorage.getItem("User_Data")).token, JSON.stringify(inputValues)));
    try {
      const response = await axios.post(api.addSupplier, JSON.stringify(inputValues), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        //console.log(response)
        setSuggestions(response.data.suppliers);
        dispatch({
          type: 'SHOW_MODAL',
          response: response.data,
          severity: 'Success'
        })
      }
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
    setTimeout(() => {
      refreshForm();
      setInputValues(initialInputValues);
      setButnVisiablity(true);
      //console.log()
      // setSuggestions()
      setRefreshTrigger(prev => !prev); // Trigger re-fetching of suppliers
    }, 100);
  };

  const refreshForm = () => {
    setFormKey(prevKey => prevKey + 1);
  };


  const handleDelete = async (id) => {
    // //console.log(`Deleting supplier with ID: ${id}`);
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;

    try {
      const response = await axios.delete(`${api.deleteSupplier}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        //console.log(response.data.message);
        // Optional: Refresh suggestions list after deletion if needed
        dispatch({
          type: 'SHOW_MODAL',
          response: response.data,
          severity: 'Success'
        })
        setSuggestions((prev) => prev.filter((supplier) => supplier.supplier_id !== id));
      }
    } catch (err) {
      console.error('Error deleting supplier:', err);
    }
  };


  const updatingBarcod = async (id, barcode) => {
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
    try {
      const response = await axios.put(`${api.updateBarCode}/${id}`, { barcode }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        dispatch({
          type: 'SHOW_MODAL',
          response: response.data,
          severity: 'Success'
        })
        setSuggestions(response.data.products);
      }
    } catch (err) {
      console.error('Error deleting supplier:', err);
    }
  }

  const generateBarcode = async (productId, barcode) => {
    //console.log('Generated Barcode:', productId);
    //console.log('Generated Barcode:', barcode);
    updatingBarcod(productId, barcode)

  };
  const updateBarcode = async (productId, barcode) => {
    //console.log('Generated Barcode:', barcode);
    updatingBarcod(productId, barcode)

    // Handle the barcode generation logic, e.g., update the state or call an API
  };
  const deleteBarcode = async (productId, generatedBarcode) => {
    const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
    try {
      const response = await axios.delete(`${api.deleteBarCode}/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        dispatch({
          type: 'SHOW_MODAL',
          response: response.data,
          severity: 'Success'
        })
        setSuggestions(response.data.products);
      }
    } catch (err) {
      console.error('Error deleting supplier:', err);
    }
  };
  const printBarcode = (productId, generatedBarcode) => {
    //console.log('Generated Barcode:', generatedBarcode);
    // Handle the barcode generation logic, e.g., update the state or call an API
  };
  return (
    <>
      <Grid container>

        <Grid lg={12}>
          <AccessibleTable

            rows={suggestions}
            onDelete={handleDelete}
            updateBarcode={updateBarcode}
            generateBarcode={generateBarcode}
            deleteBarcode={deleteBarcode}
            printBarcode={printBarcode}
          />

        </Grid>

      </Grid>
    </>
  );
};

Auth.propTypes = {};

export default Auth;
