import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import UpdateBranchDetails from "./popup";
import { CustomBtn } from "../../../../components/button/button";
import PaymentsTable from "./accordiondatatable";
import Moredetails from "./moredetails";

const AccordionData = ({ rowData, startDate, endDate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;
  const Url = useSelector((state) => state.Api);
  const cache = useRef({});
  const printRef = useRef();


  const cardStyle = {
        p: 3,
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      };


  // //console.log(rowData)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Branch_Summary_${rowData?.srn}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const srn = rowData?.srn;
      if (!srn) return;

      const cacheKey = `${srn}-${startDate}-${endDate}`;

      if (cache.current[cacheKey]) {
        setDetails(cache.current[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const payload = {
          FromDate: startDate,
          ToDate: endDate,
        };
        const res = await dispatch(
          PostRequest(`${Url.BranchDetails}${srn}`, userToken, payload)
        );
        const data = res?.data;
        setDetails(data);
        cache.current[cacheKey] = data;
      } catch (error) {
        console.error("Error fetching accordion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, Url, rowData, userToken, startDate, endDate]);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress size={28} />
        <Typography variant="body2" color="text.secondary">
          Loading details...
        </Typography>
      </Box>
    );
  }

  if (!details?.Accordion?.length) {
    return (
      <Typography sx={{ p: 3, color: "text.secondary" }}>
        No details available.
      </Typography>
    );
  }

  const data = details.Accordion;


  return (
    <Box sx={{ p: 3, backgroundColor: "#fffefc" }}>
      {/* Header */}
      <UpdateBranchDetails
            open={open}
            onClose={handleClose}
            getdata={rowData}
        /> 
  

      {/* Printable Section */}

        <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* <Typography variant="h6" fontWeight={700} color="#1976d2">
          Branch Summary
        </Typography> */}
{/* 
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            textTransform: "none",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "#e3f2fd",
              borderColor: "#1976d2",
            },
          }}
        >
          Print Summary
        </Button> */}

        <Box sx={{maxWidth: '300px',marginRight: "30px"}}>
          <CustomBtn click={handleOpen} type="button" data="Update Details" />
        </Box>
        <Box>
            <Typography
              variant="h6"
              sx={{ color: "#1976d2", fontWeight: 600 }}
            >
              New Parcels : {data[0]["Total Orders"]} 

              {/* New parcels: {data[3]["New parcels"] + data[3]["On the way Orders"]};   */}
               {/* Dileverd: {data[3]["Dileverd"]} */}

            </Typography>
        </Box>
      </Box>
      

        {/* <Moredetails data={data} printRef={printRef} /> */}
      <PaymentsTable printRef={printRef} payments={details.payments} loan={data[5]['Shirkat Payment']} cash={details.cash} data={data}  />
    </Box>
  );
};

export default AccordionData;
