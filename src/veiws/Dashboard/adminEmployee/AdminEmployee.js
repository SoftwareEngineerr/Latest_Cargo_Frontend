import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicAccordionTable from './components/table';
import { GetRequest } from '../../../redux/actions/GetRequest';
import { PostRequest } from '../../../redux/actions/PostRequest';

const AdminEmployee = () => {
    const dispatch = useDispatch();
    const Api = useSelector((state) => state.Api);

    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;

    // ---------------- DATE MANAGEMENT ----------------
    const [startDate, setStartDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    });

    const [endDate, setEndDate] = useState(new Date());

    // ---------------- MAIN DATA STATE ----------------
    const [data, setData] = useState(null);

    // ---------------- HANDLER FROM CHILD ----------------
    const myfunc = (newStart, newEnd) => {
        setStartDate(new Date(newStart));
        setEndDate(new Date(newEnd));
    };

    // ---------------- FETCH DATA ----------------
    const fetchData = async () => {
        try {
            const res = await dispatch(
                PostRequest(Api.BranchGetPayment, userToken, { startDate, endDate })
            );

            // Debug logs
            //console.log("📥 Fetch Date Range:", startDate, endDate);
            //console.log("📦 API Response:", res);

            if (res && res.data) {
                setData(res.data); // Save the data directly
            }

        } catch (err) {
            console.error("❌ Error fetching branch payment data:", err);
        }
    };
    useEffect(() => {
        fetchData();
    }, [dispatch, Api, userToken, startDate, endDate]);

    useEffect(() => {
            //console.log("📦 ==============================================================");

        const handleRefreshOrders = () => {
            //console.log('🔄 Refresh event received — refetching orders...');
            fetchData();
        };

        window.addEventListener('refreshOrders', handleRefreshOrders);

        return () => window.removeEventListener('refreshOrders', handleRefreshOrders);
    }, []);

    // ---------------- RENDER ----------------
    return (
        <div>
            {/* <StatBoxes startDate={startDate} endDate={endDate} /> */}

            {data ? (
                <DynamicAccordionTable
                    myfunc={myfunc}
                    data={data}  // updated data
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminEmployee;
