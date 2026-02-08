import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { POS } from "../../../../constant/pos";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import CustomForm from "../../../../components/form/form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  width: "90%",
  maxWidth: 700,
  p: 3,
};

const EmployeeRegisterPopup = ({ open, onClose, onSuccess , myfunc, websrn }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const data = POS().Employee;
  const getfilterdata = data.inputs.filter((item) => item.feildtype !== "label");
  const initialInputValues = Object.fromEntries(
    getfilterdata.map((item) => [item.name, item.value || ""])
  );

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [loading, setLoading] = useState(false);

  const ChangeOnSelect = (getparam) => {
    setInputValues((oldData) => ({
      ...oldData,
      [getparam[1]]: getparam[0],
    }));
  };

  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await dispatch(PostRequest(url.EmployeeRegistration, userToken, {webrn: websrn,...inputValues}));
      if (res) {
        onSuccess?.(res);
        onClose(); // Close modal after success
        setInputValues(initialInputValues); // Reset form
        myfunc()
      }
    } catch (err) {
      console.error("Employee registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Register New Employee
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <CustomForm
                data={data.inputs}
                handleInputChange={handleInputChange}
                ChangeOnSelect={ChangeOnSelect}
              />

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register Employee"}
                </Button>
              </Grid>
            </Grid>
          </motion.form>
        </Paper>
      </Box>
    </Modal>
  );
};

EmployeeRegisterPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default EmployeeRegisterPopup;
