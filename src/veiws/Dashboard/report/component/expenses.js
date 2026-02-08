import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Grid,
  TablePagination,
  Box,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { CustomBtn } from "../../../../components/button/button";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { FullDate } from "../../../../components/Date/FullDate";

const Expenses = () => {
  const api = useSelector((state) => state.Api);
  const dispatch = useDispatch();

   const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch expenses on mount and when date range changes
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setPage(0); // reset pagination
    try {
      const payload = {
        FromDate: dayjs(startDate).format("YYYY-MM-DD"),
        ToDate: dayjs(endDate).format("YYYY-MM-DD"),
      };
    //   //console.log(api.ShowExpense, userToken ,payload)
      const res = await dispatch(PostRequest(api.ShowExpense, userToken ,payload));
      if (res && res.status == 200) {
        setExpenses(res.result || []);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const addExpense = async () => {
    if (!amount || !description) return alert("Please fill all fields.");

    try {
      const payload = {
        Comment: description,
        Amount: parseFloat(amount),
      };

      const res = await dispatch(PostRequest(api.Expense, userToken , payload));
      if (res.status == 200 || res.status == 201) {
        setDescription("");
        setAmount("");
        fetchExpenses(); // refresh table
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const totalAmount = expenses.reduce((sum, e) => sum + Number(e.Amount || 0), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center" }}>Expense Report (مصارف)</h3>

      {/* Add Expense Form */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: 40 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomBtn data="Add Expense" click={addExpense} />
          </Box>
        </Grid>
      </Grid>

      {/* Date Filter */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: 20 }}>
        <Grid item>
          <label>From: </label>
          <FullDate getprops={{name:"From"}} onChange={(e)=>setStartDate(e)} />
        </Grid>
        <Grid item>
          <label>To: </label>
          <FullDate getprops={{name:"endDate"}} onChange={(e)=>setEndDate(e)} />
          {/* <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          /> */}
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={fetchExpenses}>
            Filter
          </Button>
        </Grid>
      </Grid>

      {/* Expenses Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount (؋)</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length > 0 ? (
            expenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.Amount}</TableCell>
                  <TableCell>{expense.Comment}</TableCell>
                  <TableCell>{dayjs(expense.Date).format("YYYY-MM-DD")}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No records found
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>{totalAmount}</TableCell>
            <TableCell colSpan={2}>Total</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Expenses;
