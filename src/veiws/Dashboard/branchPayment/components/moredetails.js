import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
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
import PrintIcon from "@mui/icons-material/Print";

const Moredetails = ({data, printRef})  => {
    // const data = data.data
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
    
  return (
    <div>
        <Box ref={printRef}>
        <Grid container spacing={2}>
          {/* Example Card */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ShoppingCartIcon
                  sx={{ color: "#1976d2", fontSize: 30, mr: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#1976d2", fontWeight: 600 }}
                >
                  Total Orders
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#2e7d32",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                {data[0]["Total Orders"]}
              </Typography>
            </Paper>
          </Grid>

          {/* ... rest of your Grid items */}
          
          {/* Cash In */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountBalanceWalletIcon sx={{ color: "#388e3c", fontSize: 28, mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#388e3c", fontWeight: 600 }}>
                  Cash In
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#2e7d32",
                  textAlign: "center",
                }}
              >
                {data[1]["Cash In"]}
              </Typography>
            </Paper>
          </Grid>

          {/* Shirkat Summary */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <BusinessCenterIcon sx={{ color: "#1976d2", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
                  Shirkat Summary
                </Typography>
              </Box>
              <Typography sx={{ mb: 0.5 }}>
                Shirkat Payment: <strong>{data[2]["Shirkat Payment"]}</strong>
              </Typography>
              <Typography>
                Shirkat Charges from Customer: <strong>{data[2]["Shirkat Charges from Customer"]}</strong>
              </Typography>
            </Paper>
          </Grid>

          {/* Branch Orders Status */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AssignmentIcon sx={{ color: "#1976d2", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
                  Branch Orders Status
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "#e8f5e9" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }} fontWeight={600} color="#2e7d32">
                      <ArrowDownwardIcon sx={{ fontSize: 18, color: "#2e7d32", mr: 1 }} />
                      Incoming Orders
                    </Typography>
                    {/* <Typography>Created: <strong>{data[3]["Other Created Orders"]}</strong></Typography> */}
                    {/* <Typography>Pending: <strong>{data[3]["Other Pending Orders"]}</strong></Typography> */}
                    {/* <Typography>On The Way: <strong>{data[3]["Other On The Way"]}</strong></Typography> */}
                    <Typography>Other On The Way: <strong>{data[3]["Other On The Way"]}</strong></Typography>
                    <Typography>Other Out for delivery: <strong>{data[3]["Other Out for delivery"]}</strong></Typography>
                    <Typography>Other Received: <strong>{data[3]["Other Received"]}</strong></Typography>
                    <Typography>Other Damage: <strong>{data[3]["Other Damage"]}</strong></Typography>
                    <Typography>Other Lost: <strong>{data[3]["Other Lost"]}</strong></Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "#e3f2fd" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }} fontWeight={600} color="#1976d2">
                      <ArrowUpwardIcon sx={{ fontSize: 18, color: "#1976d2", mr: 1 }} />
                      Outgoing Orders
                    </Typography>
                    <Typography>New parcels: <strong>{data[3]["New parcels"]}</strong></Typography>
                    <Typography>On the way Orders: <strong>{data[3]["On the way Orders"]}</strong></Typography>
                    <Typography>In the Branch: <strong>{data[3]["In the Branch"]}</strong></Typography>
                    <Typography>Out For Delivery: <strong>{data[3]["Out For Delivery"]}</strong></Typography>
                    <Typography>Received: <strong>{data[3]["Received"]}</strong></Typography>
                    <Typography>Damage: <strong>{data[3]["Damage"]}</strong></Typography>
                    <Typography>lost: <strong>{data[3]["lost"]}</strong></Typography>
                    <Typography>Dileverd: <strong>{data[3]["Dileverd"]}</strong></Typography>
                  </Box>
                </Grid>

              </Grid>
            </Paper>
          </Grid>

          {/* Incoming Payments */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MonetizationOnIcon sx={{ color: "#1976d2", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
                  Incoming Payments
                </Typography>
              </Box>
              <Typography>
                Incoming Orders Payment: <strong>{data[4]["Incoming Orders Payment"]}</strong>
              </Typography>
              <Typography>
                Incoming More Fee: <strong>{data[4]["Incoming More Fee"]}</strong>
              </Typography>
            </Paper>
          </Grid>

          {/* Expense, Salary & Advanced */}
          <Grid item xs={12} sm={6}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <BusinessCenterIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: 600 }}>
                  Expense & Salary
                </Typography>
              </Box>
              <Typography>Expense: <strong>{data[6]["Expense"]}</strong></Typography>
              <Typography>Salary: <strong>{data[6]["Salary"]}</strong></Typography>
              <Typography>Advanced: <strong>{data[6]["Advanced"]}</strong></Typography>
            </Paper>
          </Grid>

          {/* Grand Total Summary (full width) */}
          <Grid item xs={12}>
            <Paper sx={cardStyle}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PaymentsIcon sx={{ color: "#1976d2", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
                  Grand Total Summary
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountBalanceWalletIcon sx={{ color: "#2e7d32", mr: 1 }} />
                <Typography>
                  Cash Orders: <strong>{data[5]["Cash Orders"]}</strong>
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ArrowUpwardIcon sx={{ color: "#388e3c", mr: 1 }} />
                <Typography>
                  Incoming From Other Branch: <strong>{data[5]["Incoming From Other Branch"]}</strong>
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ArrowDownwardIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography>
                  Shirkat Payment: <strong>{data[5]["Shirkat Payment"]}</strong>
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MonetizationOnIcon  sx={{ color: "#2f89d3ff", mr: 1 }} />
                <Typography>
                  Expense: <strong>{data[6]["Expense"]}</strong>
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountBalanceWalletIcon sx={{ color: "#3dd32fff", mr: 1 }} />
                <Typography>
                  Salary: <strong>{data[6]["Salary"]}</strong>
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <BusinessCenterIcon sx={{ color: "#f2df0aff", mr: 1 }} />
                <Typography>
                  Advanced : <strong>{data[6]["Advanced"]}</strong>
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderColor: "#d32f2f", borderBottomWidth: 2, opacity: 0.8 }} />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    color: "#d32f2f",
                    fontSize: "1.1rem",
                  }}
                >
                  Grand Total: {data[5]["Grand Total"]}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

Moredetails.propTypes = {}

export default Moredetails