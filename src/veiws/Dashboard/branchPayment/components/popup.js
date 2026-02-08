import React, { useEffect, useState } from "react";
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
import { PostRequest } from "../../../../redux/actions/PostRequest";
import CustomForm from "../../../../components/form/form";
import { UpdateData } from "../../../../redux/actions/theme/theme";

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

const UpdateBranchDetails = ({ open, onClose, onSuccess, getdata }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const data = {
    inputs: [
      {
        data: "Username*",
        type: "text",
        required: true,
        value: getdata?.username || "",
        name: "username",
        feildtype: "input",
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
        lang: "en",
      },
      {
        data: "Password*",
        type: "password", // 🔒 FIX: not Number
        required: true,
        value: getdata?.password || "",
        name: "password",
        feildtype: "input",
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
        lang: "en",
      },
      {
        data: "Address*",
        type: "text",
        required: true,
        value: getdata?.address || "",
        name: "address",
        feildtype: "input",
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
        lang: "en",
      },
      {
        data: "Phone*",
        type: "number",
        required: true,
        value: getdata?.phone1 || "",
        name: "phone1",
        feildtype: "input",
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
        lang: "en",
      },
    ],
  };

  const getfilterdata = data.inputs.filter((item) => item.feildtype !== "label");

  const buildInitialValues = () =>
    Object.fromEntries(
      getfilterdata.map((item) => [item.name, getdata?.[item.name] || ""])
    );

  const [inputValues, setInputValues] = useState(buildInitialValues());
  const [loading, setLoading] = useState(false);

  // 🔁 FIX: update form when getdata changes
  useEffect(() => {
    setInputValues(buildInitialValues());
  }, [getdata]);

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

    const payload = {
      ...inputValues,
      srn: getdata?.srn,
    };

    try {
      const res = await dispatch(
        PostRequest(url.UpdateBranchDetails, userToken, payload)
      );

      if (res) {
        onSuccess?.(res);
        onClose();
        dispatch(UpdateData(res));
        window.dispatchEvent(new Event("refreshOrders"));

        // 🔒 FIX: correctly update sessionStorage
        const stored = JSON.parse(sessionStorage.getItem("User_Data")) || {};
        const updatedUser = {
          ...stored,
          branch: {
            ...stored.branch,
            ...payload,
          },
        };
        sessionStorage.setItem("User_Data", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Update branch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Update Branch Details
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
                  {loading ? "Updating..." : "Update Branch Details"}
                </Button>
              </Grid>
            </Grid>
          </motion.form>
        </Paper>
      </Box>
    </Modal>
  );
};

UpdateBranchDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  getdata: PropTypes.object.isRequired,
};

export default UpdateBranchDetails;
