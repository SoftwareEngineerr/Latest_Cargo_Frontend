import React, { useState } from "react";
import { Box, Typography, Divider, Modal, Paper, RadioGroup, FormControlLabel, Radio, TextField, Button } from "@mui/material";
import { CustomBtn } from "../../../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import PaymentHistory from "./PaymentHistory";
import { formatAfghanDate } from "../../../../components/Date/afghandate";

const EmployeeAccordion = ({ employee }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("salary");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [ counter , setCounter ] = useState(0)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    employeeId: employee.employeeId,
    paymentType,
    description,
    amount: Number(amount), // ensure number
  };

  try {
    await dispatch(PostRequest(url.PayEmployee, userToken, payload));
    setPaymentType("salary");
    setDescription("");
    setAmount("");
    handleClose();
    setCounter(prev => prev + 1); // ✅ Correct increment
  } catch (error) {
    console.error("Failed to post payment:", error);
  }
};


  return (
    <Box sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="subtitle1" gutterBottom><b>Full Details</b></Typography>
      <Typography><b>Name:</b> {employee.Name}</Typography>
      <Typography><b>Phone:</b> {employee.Phone_Number}</Typography>
      <Typography><b>Address:</b> {employee.Address || "-"}</Typography>
      <Typography><b>Salary:</b> {employee.Salary}</Typography>
      <Typography><b>Joining Date:</b> {formatAfghanDate(employee.joining_Date)}</Typography>
      <Typography><b>Position:</b> {employee.position}</Typography>

      <Box mt={2}>
        <CustomBtn data="Pay Payment" click={handleOpen} />
      </Box>

      {/* Payment History Component */}
      <PaymentHistory employeeId={employee.employeeId} checker={counter} />

      {/* Payment Modal */}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Add Payment</Typography>
          <form onSubmit={handleSubmit}>
            <RadioGroup value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
              <FormControlLabel value="salary" control={<Radio />} label="Salary Payment" />
              <FormControlLabel value="advance" control={<Radio />} label="Advance Payment" />
            </RadioGroup>

            <TextField label="Amount" type="number" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} sx={{ mt: 2 }} required />
            <TextField label="Description" multiline rows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mt: 2 }} />

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={handleClose} color="error">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
          </form>
        </Paper>
      </Modal>
    </Box>
  );
};

export default EmployeeAccordion;
