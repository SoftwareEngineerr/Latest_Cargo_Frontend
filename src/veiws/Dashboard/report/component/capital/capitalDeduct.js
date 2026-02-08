import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, TableHead, Select, MenuItem, TableRow, TableCell, TableBody, Button, TextField, Grid, TablePagination, Slider } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { FullDate } from '../../../../../components/Date/FullDate';
import { ShowLoader } from '../../../../../redux/actions/loader';

const CapitalRemove = () => {
    const [capital, setCapital] = useState([]);
    const [shareHold, setShareHold] = useState([]);
    const [investBy, setInvestBy] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [capitalDate, setCapitalDate] = useState(new Date());
    // const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); // Last 30 days
    const [startDate, setStartDate] = useState("2025-01-01"); // Fixed start date
    const [endDate, setEndDate] = useState(new Date()); // Today's date
    const [selectedUser, setSelectedUser] = useState(null);
    const [InOrOut, setInOrOut] = useState(0);
    const [filterPartner, setFilterPartner] = useState('');
    const [filterDescription, setFilterDescription] = useState('');
    const [filterAmount, setFilterAmount] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const initShareHold = useRef(false)
    const initCapital = useRef(false)
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const api = useSelector((state) => state.Api);
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
        fetchShare();
        fetchCapital();
    }, [startDate, endDate]);

    const fetchCapital = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        if(initCapital.current) return
        initCapital.current = true

        try {
            dispatch(ShowLoader('1'))
            const response = await axios.post(
                api.showCapital,
                { startDate, endDate }, // Send formatted dates
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setCapital(response?.data?.data);
                dispatch(ShowLoader('0'))
            }
        } catch (err) {
            dispatch(ShowLoader('0'))
            console.error('Error fetching Capital:', err);
        }
    };

    const fetchShare = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        if(initShareHold.current) return
        initShareHold.current = true
        dispatch(ShowLoader('1'))
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
                dispatch(ShowLoader('0'))
                const onlyPartners = response?.data?.filter(item => item.user_role === 0);
                setShareHold(onlyPartners);
            }
        } catch (err) {
            dispatch(ShowLoader('0'))
            console.error('Error fetching Capital:', err);
        }
    };


    const addCapital = async () => {
        const userToken = JSON.parse(localStorage.getItem('User_Data'))?.token || undefined;
        
        try {
            dispatch(ShowLoader('1'))
            const response = await axios.post(
                api.addCapital, // API endpoint for adding Capital Investment
                {
                    // capital_date: capitalDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                    investInfo: investBy,
                    amount: parseFloat(amount),
                    description,
                    InOrOut,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                //console.log('Capital investment added successfully:', response.data);
                fetchCapital(); // Refresh the Capital list
                // Reset form fields
                // setInvestBy('');
                setDescription('');
                setAmount('');
                setCapitalDate(new Date());
                setCapital(response?.data?.investments);
                setSelectedUser(null);
                dispatch(ShowLoader('0'))
            }
        } catch (error) {
            dispatch(ShowLoader('0'))
            console.error('Error adding Capital:', error);
        }
    };

    const handleChange = (e) => {
        const getUser = shareHold.find(user => user.user_id === e.target.value);

        //console.log(getUser)
        setInvestBy(getUser)
        setSelectedUser(e.target.value);

    }
    const safeCapital = Array.isArray(capital) ? capital : [];

// Then apply filtering
    const filteredCapital = safeCapital.filter((entry) => {
        // Safely handle each property with null checks
        const investByName = entry?.invest_by_name?.toLowerCase() || '';
        const description = entry?.description?.toLowerCase() || '';
        const amount = entry?.amount?.toString() || '';
        const capitalDate = entry?.capital_date || '';
        
        return (
            investByName.includes(filterPartner.toLowerCase()) &&
            description.includes(filterDescription.toLowerCase()) &&
            (filterAmount === '' || amount.includes(filterAmount)) &&
            (filterDate === '' || capitalDate.includes(filterDate))
        );
    });

    // Pagination will now always work
    const paginatedCapital = filteredCapital.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
 
 
    return (
        <div>
            <Grid container>
                <Grid item lg={12}>
                    <h3 style={{ textAlign: 'center' }}> تاسو کولی سئ په سوداګرۍ کې اضافه سوې او لرې سوې پانګونه وګورئ.</h3>
                </Grid>
            </Grid>

            <>
                {capital.length >= 1 ? (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ padding: "4px" }}>تاریخ</TableCell>
                                    <TableCell sx={{ padding: "4px" }}>تفصیل</TableCell>
                                    <TableCell sx={{ padding: "4px" }}>ملګری</TableCell>
                                    <TableCell sx={{ padding: "4px" }}>افغانی</TableCell>
                                </TableRow>
                                <TableRow>
                                    
                                    <TableCell sx={{ padding: "4px" }}>
                                        <TextField
                                            value={filterDate}
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            placeholder="YYYY-MM-DD"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{ padding: "4px" }}>
                                        <TextField
                                            value={filterPartner}
                                            onChange={(e) => setFilterPartner(e.target.value)}
                                            placeholder="فلټر"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </TableCell>
                                    
                                    <TableCell sx={{ padding: "4px" }}>
                                        <TextField
                                            value={filterDescription}
                                            onChange={(e) => setFilterDescription(e.target.value)}
                                            placeholder="فلټر"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{ padding: "4px" }}>
                                        <TextField
                                            value={filterAmount}
                                            onChange={(e) => setFilterAmount(e.target.value)}
                                            placeholder="فلټر"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedCapital.map((entry) => (
                                    <TableRow
                                        key={entry.capital_id}
                                        style={{ backgroundColor: entry?.amount < 0 ? '#ff000029' : '#42ff000f' }}
                                    >
                                        <TableCell>{entry.capital_date}</TableCell>
                                        <TableCell>{entry.description}</TableCell>
                                        <TableCell>{entry.invest_by_name}</TableCell>
                                        <TableCell>{entry.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/* Add a Total Row at the bottom */}
                            {paginatedCapital.length > 0 && (
                                <TableRow style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                                    <TableCell colSpan={3} align="right">Total</TableCell>
                                    <TableCell> 
                                        {paginatedCapital.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0)}
                                    </TableCell>
                                </TableRow>
                            )}


                        </Table>

                        {/* Pagination Component */}
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={filteredCapital.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />


                    </>
                ) : null}
            </>
            <br />


            <Grid container>
                <Grid item lg={12}>
                    <h3>د پیسو استخراج:  پدې معنی چې تاسو له سوداګرۍ څخه پیسې باسئ</h3>
                </Grid>
                <Grid item lg={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Select value={selectedUser} onChange={handleChange} fullWidth>
                                {shareHold?.map((user) => (
                                    <MenuItem key={user.user_id} value={user.user_id}>
                                        {user.username} {user.phonenumber}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField fullWidth label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </Grid>
                        <Grid item lg={3}>
                            <TextField fullWidth label="تفصیل" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Grid>
                        <Grid item lg={3}>
                            <Button fullWidth onClick={addCapital} variant="contained" color="primary">استخراج</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    );
};

export default CapitalRemove;
