import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POS } from "../../../../constant/pos";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { CustomBtn } from "../../../../components/button/button";

const RegisterShopModal = ({ open, onClose }) => {
  const url = useSelector((state) => state.Api);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [data] = useState(POS().Order);
  const [fields] = useState(
    data.CreateShop.filter(
      (item) => item.feildtype !== "label" && item.feildtype !== "button"
    )
  );

  const storedShirkat = JSON.parse(sessionStorage.getItem("shirkat")) || [];

  const [inputValues, setInputValues] = useState(
    Object.fromEntries(fields.map((item) => [item.name, ""]))
  );

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isNewShop, setIsNewShop] = useState(false);
  const [isEditingShop, setIsEditingShop] = useState(false);

  //----------------------------------------------------------------------

  const fetchShopSuggestions = (value) => {
    if (!value.trim()) {
      setNameSuggestions([]);
      setIsNewShop(false);
      setIsEditingShop(false);
      return;
    }

    setLoadingSuggestions(true);

    const results = storedShirkat.filter((shop) =>
      shop.name.toLowerCase().includes(value.toLowerCase())
    );

    setNameSuggestions(results);

    const matchedShop = results.find(
      (shop) => shop.name.toLowerCase() === value.toLowerCase()
    );

    if (matchedShop) {
      setIsEditingShop(true);
      setIsNewShop(false);

      setInputValues({
        name: matchedShop.name || "",
        phone1: matchedShop.phone1 || "",
        phone2: matchedShop.phone2 || "",
        username: matchedShop.username || "",
        originalUsername: matchedShop.username || "",
        password: matchedShop.password || "",
        srn: matchedShop.srn || "",
        address: matchedShop.address || "",
      });
      //console.log(results , matchedShop)
        // setInputValues((oldData) => ({
        //   ...oldData,
        //   srn: results.srn
        // }));
    } else {
      setIsNewShop(true);
      setIsEditingShop(false);
      
        //  setInputValues((oldData) => ({
        //   ...oldData,
        //   srn: undefined
        // }));
      

    }

    setLoadingSuggestions(false);
  };

  //----------------------------------------------------------------------

  const handleTyping = (event, newValue, reason) => {
    //console.log(event, newValue, reason)
    if (reason === "input") {
      setInputValues((prev) => ({ ...prev, name: newValue }));
      fetchShopSuggestions(newValue);
    }
  };

  const handleOptionSelect = (event, newValue) => {
    //console.log(nameSuggestions , newValue)
    if (newValue && newValue.name) {
      setIsEditingShop(true);
      setIsNewShop(false);

      setInputValues({
        name: newValue.name || "",
        phone1: newValue.phone1 || "",
        phone2: newValue.phone2 || "",
        username: newValue.username || "",
        originalUsername: newValue.username || "",
        password: newValue.password || "",
        srn: newValue.srn || "",
        address: newValue.address || "",
      });
    } else {
      setIsEditingShop(false);
      setIsNewShop(false);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If editing, make sure SRN is sent to backend
    const payload = {
      ...inputValues,
      srn: isEditingShop ? inputValues.srn : undefined,
    };

    const result = await dispatch(PostRequest(url.CreateShop, userToken, payload));

    if (result.success) {
      const storedData = sessionStorage.getItem("shirkat");
      const existing = storedData ? JSON.parse(storedData) : [];
      //console.log(result.shopId)

      const newShop = {
        name: inputValues.name,
        phone1: inputValues.phone1,
        srn: result?.shopId || inputValues.srn || "",
        password: inputValues.password,
        address: inputValues.address,
      };

      const updated = [newShop, ...existing.filter(shop => shop.srn !== newShop.srn)];
      sessionStorage.setItem("shirkat", JSON.stringify(updated));

      window.dispatchEvent(new Event("customerDataUpdated"));

      setInputValues(Object.fromEntries(fields.map((item) => [item.name, ""])));
      setNameSuggestions([]);
      setIsNewShop(false);
      setIsEditingShop(false);
      onClose();
    }
  };

  //----------------------------------------------------------------------

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          padding: "10px",
          background: "linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Register Your Shirkat
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={2}>
              {fields.map((item) => {
                if (item.name === "name") {
                  return (
                    <Grid item key={item.name} lg={item.lg} md={item.md} sm={item.sm} xs={item.xs}>
                      <Autocomplete
                        freeSolo
                        loading={loadingSuggestions}
                        options={nameSuggestions}
                        getOptionLabel={(option) =>
                          typeof option === "string" ? option : option.name
                        }
                        value={
                          nameSuggestions.find(
                            (s) => s.name === inputValues.name
                          ) || { name: inputValues.name }
                        }
                        onInputChange={handleTyping}
                        onChange={handleOptionSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Shirkat Name"
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loadingSuggestions ? <CircularProgress size={18} /> : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />

                      {isNewShop && inputValues.name && (
                        <Typography variant="caption" color="primary">
                          🆕 New Shirkat — you can register it.
                        </Typography>
                      )}

                      {isEditingShop && inputValues.name && (
                        <Typography variant="caption" color="secondary">
                          ✏️ Editing existing Shirkat.
                        </Typography>
                      )}
                    </Grid>
                  );
                }

                // Phone fields disabled during edit
                if (item.name === "phone1") {
                  return (
                    <Grid item key={item.name} lg={item.lg} md={item.md} sm={item.sm} xs={item.xs}>
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={inputValues[item.name]}
                        placeholder={item.data}
                        fullWidth
                        onChange={handleInputChange}
                        disabled={isEditingShop}
                      />
                      {isEditingShop && (
                        <Typography variant="caption" color="error">
                          ⚠️ You cannot change phone number.
                        </Typography>
                      )}
                    </Grid>
                  );
                }
                 // Phone fields disabled during edit
                if (item.name === "old_Dues") {
                  return (
                    isEditingShop ? <></>
                    :
                    
                        <Grid item key={item.name} lg={item.lg} md={item.md} sm={item.sm} xs={item.xs}>
                          <TextField
                            label={item.label}
                            name={item.name}
                            value={inputValues[item.name]}
                            placeholder={item.data}
                            fullWidth
                            onChange={handleInputChange}
                            disabled={isEditingShop}
                          />
                          {isEditingShop && (
                            <Typography variant="caption" color="error">
                              ⚠️ You cannot change Old Dues.
                            </Typography>
                          )}
                        </Grid>
                    
                  )
                }

                // All other fields
                return (
                  <Grid item key={item.name} lg={item.lg} md={item.md} sm={item.sm} xs={item.xs}>
                    <TextField
                      label={item.label}
                      name={item.name}
                      value={inputValues[item.name]}
                      placeholder={item.data}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                );
              })}

              <Grid item lg={12}>
                <CustomBtn data="Submit" />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RegisterShopModal;
