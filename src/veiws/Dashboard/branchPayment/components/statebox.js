import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  LocalShippingRounded,
  CheckCircleRounded,
  PendingActionsRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { PostRequest } from "../../../../redux/actions/PostRequest";

const StatBoxes = (props) => {
  const dispatch = useDispatch();
  const Url = useSelector((state) => state.Api);
  const [startDate , setStartDate] = useState(props.startDate)
  const [endDate , setEndDate ] = useState(props.endDate)
  const userToken =
    JSON.parse(sessionStorage.getItem("User_Data"))?.token || undefined;
  const [data, setData] = useState();

  useEffect(() => {
    console.log(props)
    const fetchData = async () => {
      try {
        const res = await dispatch(PostRequest(Url.BranchSummary,userToken, {startDate: props.startDate , endDate:props.endDate}));
        console.log(res)
        const stats = [
          {
            id: 2,
            value: (res?.orders_summary?.totalOrders || 0),
            label: "ټوټل پارسلونه",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
           {
            id: 2,
            value: res?.orders_summary?.totalDeliveredOrders,
            label: "ټوټل ډیلیور پارسلونه",
            color: "linear-gradient(135deg, #f5e8ebff, #e6c8c8ff)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#a51212ff" }} />
            ),
          },
          {
            id: 2,
            value:  res?.orders_summary?.totalNonDeliveredOrders,
            label: "ټوټل پاته پارسلونه",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
          
          {
            id: 1,
            md: 6,
            value: res?.orders_summary?.totalOldDuesOrders,
            label: "زاړه پورونه ",
            color: "linear-gradient(135deg, #f5e8ebff, #e6c8c8ff)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#a51212ff" }} />
            ),
          },
           {
            id: 1,
            md: 6,
            value:  res?.orders_summary?.returnOrders,
            label: "ټوټل پاته پارسلونه",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },



          
           {
            id: 2,
            value: res?.orders_summary?.TotalOrdersCustomerPayments,
            label: "  مسترد شوی پارسل ",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
           {
            id: 2,
            value: res?.orders_summary?.DeliveredOrdersCustomerPayments,
            label: "دمشتریانو اخستل",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
           {
            id: 2,
            value: res?.orders_summary?.NonDeliveredOrdersCustomerPayments,
            label: " پر مشتریانو پاته",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },

          
           {
            id: 2,
            value: res?.orders_summary?.TotalOrdersShirkatPayments,
            label: " ټوټل شرکت  ",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
           {
            id: 2,
            value: res?.orders_summary?.TotalShirkatPaymentsDeliveredParcels,
            label: " ټوټل شرکت ډیلیور  ",
            color: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Light Blue
            icon: (
              <LocalShippingRounded sx={{ fontSize: 40, color: "#1565c0" }} />
            ),
          },
           {
            id: 2,
            value: res?.orders_summary?.TotalShirkatPaymentsNonDeliveredParcels,
            label: " پا ته ټوټل شرکت  ",
            color: "linear-gradient(135deg, #f5e8ebff, #e6c8c8ff)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#a51212ff" }} />
            ),
          },

          {
            id: 4,
            value: res?.orders_summary?.ourRentsCollections,
            label: "کرایه",
             color: "linear-gradient(135deg, #ede7f6, #d1c4e9)", // Light Purple
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#6a1b9a" }} />
            ),
          },
          {
            id: 3,
            value: res?.orders_summary?.TotalRentsOfDelivered,
            label: "رسید کرایه",
            color: "linear-gradient(135deg, #fff3e0, #ffe0b2)", // Light Orange
            icon: (
              <PendingActionsRounded sx={{ fontSize: 40, color: "#ef6c00" }} />
            ),
          },
          {
            id: 5,
            value: res?.orders_summary?.TotalRentsOfNonDelivered,
            label: "پاته کرایه",
             color: "linear-gradient(135deg, #f5e8ebff, #e6c8c8ff)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#a51212ff" }} />
            ),
          },
          {
            id: 6,
            value: res?.overallBalance?.balance,
            label: "مکمله دخل",
             color: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#1a530eff" }} />
            ),
          },
          //   {
          //   id: 3,
          //   value: res?.orders_summary?.ourRentsCollections,
          //   label: "کرایه",
          //   color: "linear-gradient(135deg, #fff3e0, #ffe0b2)", // Light Orange
          //   icon: (
          //     <PendingActionsRounded sx={{ fontSize: 40, color: "#ef6c00" }} />
          //   ),
          // },
          {
            id: 5,
            value: res?.paidToShirkat?.paidToShirkat,
            label: "شرکتو ته توضیع",
            color: "linear-gradient(135deg, #f5e8ebff, #e6c8c8ff)", // Light Green
            icon: (
              <CheckCircleRounded sx={{ fontSize: 40, color: "#a51212ff" }} />
            ),
          },
          
          // {
          //   id: 6,
          //   value: ((res?.overallBalance?.balance + res?.paidToShirkat?.paidToShirkat) -  res?.orders_summary?.TotalOrdersShirkatPayments  ),
          //   label: "ګټه / تاوان",
          //    color: "linear-gradient(135deg, #ebe8f5ff, #d1c8e6ff)", // Light Green
          //   icon: (
          //     <CheckCircleRounded sx={{ fontSize: 40, color: "#200e53ff" }} />
          //   ),
          // },
        ];

        setData(stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, [dispatch, Url.BranchSummary, userToken , props.startDate , props.endDate]);

  const MotionBox = motion(Box);

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: { xs: 2, sm: 4 },
        py: 3,
        fontFamily: "'Poppins', sans-serif",
        width: "100%",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {data
          ? data.map((item, index) => (
              <Grid item xs={12} sm={6} md={item?.md ? item.md : 4} key={item.id}>
                <MotionBox
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    position: "relative",
                    background: item.color,
                    borderRadius: "20px",
                    color: "#333",
                    textAlign: "center",
                    overflow: "hidden",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    height: "100%",
                    py: 4,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {/* Faint Background Number */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      fontSize: "5.5rem",
                      fontWeight: 800,
                      color: "rgba(0,0,0,0.05)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {item.value}
                  </Box>

                  {/* Foreground Content */}
                  <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {item.icon}
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ fontSize: "2rem" }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        mt: 0.5,
                        opacity: 0.8,
                      fontSize:'20px'
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </MotionBox>
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

export default StatBoxes;
