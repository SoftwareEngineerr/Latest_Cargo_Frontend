import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, TablePagination } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { FullDate } from '../../../../components/Date/FullDate';
import { ShowLoader } from '../../../../redux/actions/loader'
import dayjs from "dayjs";

const SalaryAndDeposit = () => {
    const [expenses, setExpenses] = useState([]);
    const [expenseType, setExpenseType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [expenseDate, setExpenseDate] = useState(new Date());
    // const [startDate, setStartDate] = useState(dayjs().subtract(30, "day").format("YYYY-MM-DD")); // Last 30 days
    const [startDate, setStartDate] = useState("2025-01-01"); // Fixed start date
    const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD")); // Today's date
    const [page, setPage] = useState(0);
    const [workers, setWorkers] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserDetail, setSelectedUserDetail] = useState(null);
    const api = useSelector((state) => state.Api);
    const dispatch = useDispatch();
    const initExp = useRef(false)
    const initEmp = useRef(false)
    
    // Handle Page Change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle Rows Per Page Change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        fetchExpenses();
        fetchShare();
    }, [endDate]);

    const fromDate = dayjs(startDate).format('YYYY-MM-DD');
    const toDate = dayjs(endDate).format('YYYY-MM-DD');

    const fetchShare = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        if(initEmp.current) return
        initEmp.current = true
        try {
            const response = await axios.get(
                api.showShareHold,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                const noPartners = response?.data?.filter(item => item.user_role !== 0 && item.user_role !== 1 && item.user_role !== 2);
                setWorkers(noPartners);
            }
        } catch (err) {
            console.error('Error fetching Capital:', err);
        }
    };

    const fetchExpenses = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        if(initExp.current) return
        initExp.current = true
        try {
            const response = await axios.post(
                api.showExpenses,
                { startDate: fromDate, endDate: toDate }, // Send formatted dates
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                //console.log(response.data);
                const salaryAndDep = response?.data?.filter(item => item.expense_type == 'معاش' || item.expense_type == 'ایډوانس' || item.expense_type == 'اډوانس')
                setExpenses(salaryAndDep);
            }
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    };

    const addExpense = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        let description = '';
        //console.log(selectedUserDetail?.username)
        if (expenseType === "معاش" || expenseType === "اډوانس") {
            description = `${selectedUserDetail?.username} ${expenseType}`
        }
        else {
            description = expenseType + '|----|' + description
        }
        // return false
        try {
            dispatch(ShowLoader('1'))
            const response = await axios.post(
                api.addExpenses, // Use the API endpoint for adding expenses
                {
                    expense_type: expenseType,
                    description: description,
                    amount: parseFloat(amount),
                    // payment_method: paymentMethod,
                    expense_date: expenseDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                //console.log('Expense added successfully:', response.data);
                fetchExpenses(); // Refresh the expenses list
                // Reset form fields
                setExpenseType('');
                setDescription('');
                setAmount('');
                // setPaymentMethod('Cash');
                setExpenseDate(new Date());
                dispatch(ShowLoader('0'))
                const salaryAndDep = response?.data?.data?.filter(item => item.expense_type == 'معاش' || item.expense_type == 'ایډوانس' || item.expense_type == 'اډوانس')
                setExpenses(salaryAndDep);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const ChangeDateFrom = (e) => {
        setStartDate(`${e.$y}-${e.$M + 1}-${e.$D}`)
    }
    const ChangeDateTo = (e) => {
        setEndDate(`${e.$y}-${e.$M + 1}-${e.$D}`)
    }
    const handleChange = (e) => {
        const getUser = workers.find(user => user.user_id === e.target.value);

        setSelectedUserDetail(getUser)
        // setInvestBy(getUser)
        setSelectedUser(e.target.value);

    }
    const handleExpenseTypeChange = (e) => {
        //console.log(e.target.value);
        setExpenseType(e.target.value);
        if (e.target.value == "معاش" || e.target.value == "اډوانس") {
            setDescription('');
        } else {
            setSelectedUser(null);
        }
    };

    const [filters, setFilters] = useState({
        amount: '',
        type: '',
        description: '',
        date: '',
    });

    const filteredExpenses = expenses.filter((expense) => {
        return (
            expense.amount.toString().includes(filters.amount) &&
            expense.expense_type.toLowerCase().includes(filters.type.toLowerCase()) &&
            expense.description.toLowerCase().includes(filters.description.toLowerCase()) &&
            expense.expense_date.toLowerCase().includes(filters.date.toLowerCase())
        );
    });

    const canSubmit =
        amount.trim() !== '' &&
        (!["معاش", "اډوانس"].includes(expenseType) || selectedUser !== null);

    return (
        <div>
            <Grid container>
                <Grid item lg={12}>
                    {/* <h1>لاندې تاسو کولی شئ د جنس راپور وپلټئ</h1> */}
                    {/* <h3 style={{ textAlign: 'center' }}>لاندې تاسو کولی شئ د مصارف راپور شروع تاریخ او تر تاریخ اخیر پوری وپلټئ</h3> */}
                </Grid>
            </Grid>

            <>
                {expenses.length >= 1 ? (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        افغانی
                                        <TextField
                                            variant="standard"
                                            size="small"
                                            value={filters.amount}
                                            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        معاش / اډوانس
                                        <TextField
                                            variant="standard"
                                            size="small"
                                            value={filters.type}
                                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        تفصیل
                                        <TextField
                                            variant="standard"
                                            size="small"
                                            value={filters.description}
                                            onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        تاریخ
                                        <TextField
                                            variant="standard"
                                            size="small"
                                            value={filters.date}
                                            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredExpenses
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((expense) => (
                                        <TableRow key={expense.expense_id}>
                                            <TableCell>؋{expense.amount}</TableCell>
                                            <TableCell>{expense.expense_type}</TableCell>
                                            <TableCell>{expense.description}</TableCell>
                                            <TableCell>{expense.expense_date}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            {filteredExpenses
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length > 0 && (
                                <TableRow style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                                    <TableCell align="left"> 
                                        {filteredExpenses
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0)}
                                    </TableCell>
                                    <TableCell colSpan={3} align="left">ټوټل</TableCell>
                                    
                                </TableRow>
                            )}
                        </Table>

                        {/* Pagination Component */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            component="div"
                            count={expenses.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                ) : null}
            </>

            <Grid container>
                <Grid item lg={12}>
                    <h3>معاش / اډوانس</h3>
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Select fullWidth value={expenseType} onChange={handleExpenseTypeChange}>
                                <MenuItem value="معاش">معاش</MenuItem>
                                <MenuItem value="اډوانس">اډوانس</MenuItem>
                            </Select>

                            {/* Conditionally render based on expenseType */}

                        </Grid>

                        <Grid item lg={3}>
                            {/* {expenseType === "معاش" || expenseType === "اډوانس" ? ( */}
                                <Select value={selectedUser} onChange={handleChange} fullWidth>
                                    {workers?.map((user) => (
                                        <MenuItem key={user.user_id} value={user.user_id}>
                                            {user.username} {user.phonenumber}
                                        </MenuItem>
                                    ))}
                                </Select>
                            
                            {/* <TextField fullWidth label="تفصیل" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                        </Grid>
                        <Grid item lg={3}>
                            <TextField fullWidth label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </Grid>
                        <Grid item lg={3}>
                            <Button
                                fullWidth
                                onClick={addExpense}
                                variant="contained"
                                color="primary"
                                disabled={!canSubmit}
                            >
                                مصرف ثبت
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SalaryAndDeposit;
