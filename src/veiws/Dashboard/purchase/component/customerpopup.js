import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { POS } from "../../../../constant/pos";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { GetRequest } from "../../../../redux/actions/GetRequest"; // ✅ import this
import { CustomBtn } from "../../../../components/button/button";

const RegisterCustomerModal = ({ open, onClose }) => {
  const url = useSelector((state) => state.Api);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [data] = useState(POS().Order);
  const [fields] = useState(
    data.CustomerPopup.filter(
      (item) => item.feildtype !== "label" && item.feildtype !== "button"
    )
  );

  const [inputValues, setInputValues] = useState(
    Object.fromEntries(fields.map((item) => [item.name, ""]))
  );

  const [existingCustomers, setExistingCustomers] = useState([]);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // ✅ Load customers from sessionStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("customers")) || [];
    setExistingCustomers(storedData);
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      const found = existingCustomers.some(
        (c) => c.phone1.trim() === value.trim()
      );
      setIsAlreadyRegistered(found);
    }
  };

  // ✅ Fetch customers from API and save to sessionStorage
  const FetchCustomers = async () => {
    try {
      const res = await dispatch(GetRequest(url.Customer, userToken, ""));
      if (res?.success && Array.isArray(res.data)) {
        sessionStorage.setItem("customers", JSON.stringify(res.data));
        setExistingCustomers(res.data);
        //console.log("✅ Customers saved to sessionStorage");
      } else {
        console.warn("⚠️ Could not update customers:", res);
      }
    } catch (err) {
      console.error("❌ FetchCustomers error:", err);
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAlreadyRegistered) return;

    const result = await dispatch(
      PostRequest(url.CreateCustomer, userToken, inputValues)
    );

    if (result?.success) {
      await FetchCustomers(); // ✅ refresh local storage

      // ✅ Reset form
      setInputValues(Object.fromEntries(fields.map((item) => [item.name, ""])));
      setIsAlreadyRegistered(false);

      onClose();
    }
  };

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
        Register Your Customer
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={2}>
              {fields.map((item) => (
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
              ))}

              {isAlreadyRegistered && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ fontWeight: 600 }}
                  >
                    ⚠️ This customer is already registered before!
                  </Typography>
                </Grid>
              )}

              <Grid item lg={12}>
                <CustomBtn
                  data="Submit"
                  disabled={isAlreadyRegistered || !inputValues.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RegisterCustomerModal;
