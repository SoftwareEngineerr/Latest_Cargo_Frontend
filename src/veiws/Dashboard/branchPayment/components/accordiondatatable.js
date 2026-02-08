import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
  Chip,
} from "@mui/material";
import NameHistoryShirkat from "../../../../components/namehistory/namehistoryShirkat";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatAfghanDate } from "../../../../components/Date/afghandate";

export default function PaymentsTable({ payments, cash , loan , printRef , data}) {
  const [page, setPage] = useState(0);
  console.log(payments, cash, loan, printRef, data)
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Sort by newest date first
  const sortedPayments = useMemo(() => {
    return [...payments].sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
    );
  }, [payments]);

  // ✅ Pagination
  const paginatedPayments = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedPayments.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, sortedPayments]);

  // ✅ Totals
  const totals = useMemo(() => {
    const totalPayIn = payments.reduce(
      (sum, p) => sum + (Number(p.pay_in) || 0),
      0
    );
    const totalPayOut = payments.reduce(
      (sum, p) => sum + (Number(p.pay_out) || 0),
      0
    );
    return { totalPayIn, totalPayOut, balance: totalPayIn - totalPayOut };
  }, [payments]);


    const [loading, setLoading] = useState(false);
    const [shirkat, setShirkat] = useState([]);
    const [branchProgress, setBranchProgress] = useState([]);
    const url = useSelector((state) => state.Api);
    const token = sessionStorage.getItem("User_Data")
      ? JSON.parse(sessionStorage.getItem("User_Data")).token
      : null;
   // ✅ Fetch Shirkat from API or sessionStorage
    const fetchShirkat = async () => {
      try {
        setLoading(true);
  
        const stored = sessionStorage.getItem("shirkat");
        if (stored) {
          setShirkat(JSON.parse(stored));
          return;
        }
  
        const res = await axios.get(url.Shirkat, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data || [];
  
        setShirkat(data);
        sessionStorage.setItem("shirkat", JSON.stringify(data));
      } catch (err) {
        console.error("❌ Error fetching shirkat", err);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Fetch Shirkat from API or sessionStorage
    const fetchBranchProgress = async () => {
      try {
        setLoading(true);
   
  
        const res = await axios.get(url.branchProgressByAdmin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data || [];
  
        setBranchProgress(data);
       } catch (err) {
        console.error("❌ Error fetching shirkat", err);
      } finally {
        setLoading(false);
      }
    };
  
    // ✅ Load initial data on mount
    useEffect(() => {
      fetchShirkat();
  
      // ✅ Listen for updates from RegisterShopModal
      const handleShirkatUpdate = () => {
        const stored = sessionStorage.getItem("shirkat");
        if (stored) setShirkat(JSON.parse(stored));
      };
  
      window.addEventListener("shirkatUpdated", handleShirkatUpdate);
  
      return () => {
        window.removeEventListener("shirkatUpdated", handleShirkatUpdate);
      };
    }, []);

    
  const myfunc = (getvalue) => {
    // //console.log(getvalue , shirkat)
    const data = shirkat.filter((item)=>item.srn == getvalue)
    // //console.log(data)
    return data?.[0]?.name
  }

    
  return (
    <Container sx={{ mt: 4 }} ref={printRef}>
     <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5">
        Branch Payments
      </Typography>

      {/* <Typography variant="h5">
        Load Branch Parcels
      </Typography> */}

    </Box>

      {/* <NameHistoryShirkat /> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>Description</TableCell> */}
              <TableCell>Pay Type</TableCell>
              {/* <TableCell>Parcel Incoming From</TableCell> */}
              {/* <TableCell align="right">Pay Type SRN</TableCell> */}
              <TableCell align="right" sx={{ color: "green" }}>
                Pay In
              </TableCell>
              <TableCell align="right" sx={{ color: "red" }}>
                Pay Out
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedPayments.map((p) => (
              <TableRow key={p.srn}>
                <TableCell>{p.srn}</TableCell>
                <TableCell>
                  {formatAfghanDate(p.Date)}<br />
                  {/* Description : {p.description || ""} */}
                  {
                    p.description ? (
                      <>
                        <strong>
                          Description : 
                        </strong>
                          {p.description}
                      </>
                    )
                     :
                    "-"
                  }
                </TableCell>
                {/* <TableCell>{p.description || "—"}</TableCell> */}
                <TableCell>
                 <Chip
                    label={
                      p.paytype === "CASH"
                        ? "Parcel"
                        : p.paytype === "EMP_SALARY"
                        ? "Employee Salary"
                        : p.paytype === "EMP_ADVANCED"
                        ? "Employee Advanced"
                        : p.paytype
                    }
                    size="small"
                  sx={{
                    backgroundColor:
                      p.paytype === "CASH"
                        ? "#E3F2FD"   // light blue
                        : p.paytype === "EMP_SALARY"
                        ? "#FFF8E1"   // light yellow
                        : p.paytype === "EMP_ADVANCED"
                        ? "#E0F7FA"   // light cyan
                        : p.paytype === "EXPENSE"
                        ? "#FFEBEE"   // light red
                        : "#E8F5E9",  // light green

                    color:
                      p.paytype === "CASH"
                        ? "#0D47A1"
                        : p.paytype === "EMP_SALARY"
                        ? "#B28900"
                        : p.paytype === "EMP_ADVANCED"
                        ? "#007B83"
                        : p.paytype === "EXPENSE"
                        ? "#B71C1C"
                        : "#1B5E20",

                    fontWeight: 600,
                    borderRadius: "8px",
                  }}

                  />
                  <br />
                 {
                  p.paytype === "SHIRKAT" ? (
                    <span>
                      <strong>Parcel Coming From</strong>: {myfunc(p.paytype_srn)}
                    </span>
                  ) : (
                    <span>
                      {/* Other payment type */}
                    </span>
                  )
                }

                </TableCell>
               
                <TableCell align="right" sx={{ color: "green" }}>
                  {p.pay_in ? p.pay_in.toLocaleString() : "—"}
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  {p.pay_out ? p.pay_out.toLocaleString() : "—"}
                </TableCell>
              </TableRow>
            ))}

            {/* ✅ Totals Row */}
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell colSpan={3} align="right">
                <strong>Totals:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "green" }}>
                <strong>{totals.totalPayIn.toLocaleString()}</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "red" }}>
                <strong>{totals.totalPayOut.toLocaleString()}</strong>
              </TableCell>
            </TableRow>

            
            {/* <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
              <TableCell colSpan={4} align="right">
                <strong>Net Balance:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "blue" }}>
                <strong>{totals.balance.toLocaleString()}</strong>
              </TableCell>
            </TableRow> */}
             <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
              <TableCell colSpan={4} align="right">
                <strong>loan:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "blue" }}>
                <strong>{loan}</strong>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
              <TableCell colSpan={4} align="right">
                <strong>Expense:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "blue" }}>
                <strong>{data?.[6]?.Expense}</strong>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
              <TableCell colSpan={4} align="right">
                <strong>Salary:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "blue" }}>
                <strong>{data?.[6]?.Advanced + data?.[6]?.Salary}</strong>
              </TableCell>
            </TableRow>
             {/* <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
              <TableCell colSpan={6} align="right">
                <strong>cash:</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "blue" }}>
                <strong>{cash}</strong>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={payments.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>
    </Container>
  );
}
