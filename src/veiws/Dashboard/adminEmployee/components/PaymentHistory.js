import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  TableSortLabel,
  TablePagination,
  IconButton,
  Modal,
  Paper,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { CustomBtn } from "../../../../components/button/button";

const PaymentHistory = ({ employeeId, checker }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "Date",
    direction: "desc",
  });

  // Modal states
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("salary");
  const [description, setDescription] = useState("");

  // ✅ Fetch payments from API
  const fetchPayments = async (
    pageNumber = 1,
    limitValue = limit,
    sortKey = sortConfig.key,
    sortDirection = sortConfig.direction
  ) => {
    try {
      const res = await dispatch(
        GetRequest(
          `${url.ListPayEmployee}${employeeId}?page=${pageNumber}&limit=${limitValue}&sort=${sortKey}&order=${sortDirection}`,
          userToken,
          ""
        )
      );
      setPayments(res?.data || []);
      setPage(res?.page || 1);
      setTotalPages(res?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPayments([]);
    }
  };

  useEffect(() => {
    fetchPayments(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortConfig, checker]);

  // ✅ Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle Edit button click
  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setAmount(payment.Amount);
    setDescription(payment.description || "");
    setPaymentType(payment.Type === "EMP_SALARY" ? "salary" : "advance");
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedPayment(null);
  };

  // Handle payment update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      paymentId: selectedPayment.srn,
      amount: Number(amount),
      description,
      paymentType,
      employeeId,
    };

    
    try {
      await dispatch(PostRequest(url.UpdateEmployeePayment, userToken, payload));
      fetchPayments(page, limit); // Refresh payment list
      handleClose(); // Close modal
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  return (
    <Box mt={3} sx={{ fontFamily: "Poppins, sans-serif" }}>
      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
        Payment History
      </Typography>

      {payments.length > 0 ? (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "Type"}
                    direction={sortConfig.key === "Type" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("Type")}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "Amount"}
                    direction={sortConfig.key === "Amount" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("Amount")}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "Date"}
                    direction={sortConfig.key === "Date" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("Date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "description"}
                    direction={sortConfig.key === "description" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("description")}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.srn}>
                  <TableCell>{p.Type === "EMP_SALARY" ? "Salary" : "Advance"}</TableCell>
                  <TableCell>{p.Amount}</TableCell>
                  <TableCell>{new Date(p.Date).toLocaleDateString()}</TableCell>
                  <TableCell>{p.description || "-"}</TableCell>
                  <TableCell>
                    <CustomBtn click={() => handleEdit(p)} data="Edit" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ✅ Modern Pagination */}
          <Box
            mt={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              borderTop: "1px solid #f0f0f0",
              pt: 2,
              ".MuiTablePagination-root": {
                fontFamily: "Poppins, sans-serif",
                color: "#333",
              },
              ".MuiSelect-select": {
                borderRadius: "8px",
                padding: "4px 8px",
              },
            }}
          >
            <TablePagination
              component="div"
              count={totalPages * limit}
              page={page - 1}
              onPageChange={(e, newPage) => setPage(newPage + 1)}
              rowsPerPage={limit}
              onRowsPerPageChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setPage(1);
              }}
              rowsPerPageOptions={[5, 10, 20, 50]}
              labelRowsPerPage="Rows per page:"
              showFirstButton={false}
              showLastButton={false}
            />
          </Box>
        </>
      ) : (
        <Typography color="text.secondary" variant="body2">
          No payments yet.
        </Typography>
      )}

      {/* Payment Modal */}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Update Payment</Typography>
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

export default PaymentHistory;
