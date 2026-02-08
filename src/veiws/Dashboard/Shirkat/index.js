import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DynamicAccordionTable from './components/table';
import { GetRequest } from '../../../redux/actions/GetRequest';

const Shirkat = () => {
    const dispatch = useDispatch();
    const Api = useSelector((state) => state.Api);
    const UpdateState = useSelector((state) => state.UpdateState);
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(
                    GetRequest(Api.Shirkatlist, userToken, "")
                );
                //console.log("✅ API Response:", res); // Debugging
                setData(res.data); // ✅ Set the data directly
            } catch (err) {
                console.error("Error fetching branch payment data:", err);
            }
        };

        fetchData();
    }, [dispatch, Api, userToken , UpdateState]);

    return (
        <div>
            {data ? (
                <DynamicAccordionTable data={data} /> // ✅ Pass the data directly
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Shirkat;
