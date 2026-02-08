import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import ShirkatRecords from "./detailstable";

const ShirkatDetails = ({rowData ,fetchdata, myfunc}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;
  const Url = useSelector((state) => state.Api);
  const UpdateState = useSelector((state) => state.UpdateState);

    useEffect(() => {
    const fetchData = async () => {
      const srn = rowData?.shirkat_srn;
      setLoading(true);
      try {
        const res = await dispatch(GetRequest(`${Url.ShirkatInfo}${srn}`, userToken, ""));
        setData(res?.data);
        myfunc(res.data)
      } catch (error) {
        console.error("Error fetching Shirkat details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, Url, userToken , rowData , fetchdata , UpdateState]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 1 }}>Loading Shirkat Details...</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}>
        No shirkat details found.
      </Typography>
    );
  }

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    background: "linear-gradient(145deg, #ffffff, #f8f9fb)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    cursor: "default",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
  };

  const stats = [
    {
      label: "Total Orders",
      value: `${data.summary.total_orders} (${data.summary.total_fees})`,
      icon: <ShoppingCartIcon sx={{ color: "#1976d2" }} />,
      color: "#1976d2",
    },
    {
      label: "Paid Orders",
      value: `${data.summary.total_paid_orders} (${data.summary.total_paid_fees})`,
      icon: <MonetizationOnIcon sx={{ color: "#2e7d32" }} />,
      color: "#2e7d32",
    },
    {
      label: "Shirkat Paid",
      value: data.summary.customer_paid,
      icon: <BusinessCenterIcon sx={{ color: "#0288d1" }} />,
      color: "#0288d1",
    },
    {
      label: "Shirkat Pending",
      value: data.summary.customer_pending,
      icon: <BusinessCenterIcon sx={{ color: "#f57c00" }} />,
      color: "#f57c00",
    },
    {
      label: "Total Pay Out",
      value: data.summary.total_pay_out,
      icon: <AccountBalanceWalletIcon sx={{ color: "#d32f2f" }} />,
      color: "#d32f2f",
    },
    {
      label: "Net Pay Out",
      value: data.summary.net_pay_out,
      icon: (
        <AccountBalanceWalletIcon
          sx={{ color: data.summary.net_pay_out >= 0 ? "#43a047" : "#d32f2f" }}
        />
      ),
      color: data.summary.net_pay_out >= 0 ? "#43a047" : "#d32f2f",
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        background: "linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%)",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        color="primary"
        gutterBottom
        sx={{ mb: 1 }}
      >
        {data.summary.shirkat_name} Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        📍 Address: {data.summary.address} | ☎️ Phone: {data.summary.phone1}
        {/* {data.summary.phone2 ? `, ${data.summary.phone2}` : ""} */}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* {stats.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {item.icon}
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ ml: 1, color: "text.primary" }}
                >
                  {item.label}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: item.color }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))} */}

        {/* <Grid item xs={12}>
          <Paper sx={{ ...cardStyle, background: "#e3f2fd" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccountBalanceWalletIcon sx={{ color: "#1976d2" }} />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ ml: 1, color: "text.primary" }}
              >
                Our Payment
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight={700} sx={{ color: "#1976d2" }}>
              {data.summary.our_payment}
            </Typography>
          </Paper>
        </Grid> */}
      </Grid>
      <ShirkatRecords data={data.summary} records={data.records} />
    </Box>
  );
};

export default ShirkatDetails;
