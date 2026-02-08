import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionData from "./accordiondata";
import { CustomBtn } from "../../../../components/button/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import SuggestionInput from "../../../../components/suggestionInput/suggestionInput";

const DynamicAccordionTable = ({ data = [] }) => {
  const url = useSelector((state)=>state.Api)
  const dispatch = useDispatch()
  const [openRow, setOpenRow] = useState(null);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [shirkatvalue , setShirkatvalue] = useState()
  const [details , setDetails] = useState()
  const [rowData, setRowData] = useState({brsrn:""});
  const [cash , setCash ] = useState()
  const [fetchdata , setFetchData ] = useState(0)


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // //console.log(!payment , payment == 0)
    if (!payment && payment == 0) {
      alert("Please enter a payment amount.");
      return;
    }
    //console.log(data)
    const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
    const payload = {
      pay_out: payment,
      Shirkat_Srn: shirkatvalue
    }
    const fetchdata = async()=>{
      const res = await dispatch(PostRequest(url.ShirkatDetails , userToken , payload))
    }
    fetchdata()
    //console.log("Payment Submitted:", payment);
    setOpen(false);
    setFetchData((old)=>old+1)
  };

  const keys = data[0]
    ? Object.keys(data[0]).filter((k) => k !== "Accordion")
    : [];

  const sortedData = useMemo(() => {
    if (!sortKey || !data) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 3 }}>
        No data available.
      </Typography>
    );
  }

  const toggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  const OpenPopup = (getvalue)=>{
    setOpen(!open)
    setPayment(0)
    setShirkatvalue(getvalue)
  }

    function handleInputChange(e) {
      //console.log(e.target.value)
        setRowData((prevValues) => ({
            ...prevValues,
            shirkat_srn: e.target.value,
        }));
    }
    const myfunc = (get) => {
      //console.log(get)
      setDetails(get)
      const data = get?.records
      const totalShirkatCharges =
        data
          .filter(r => r.type === "order" && (r.status === "delivered" || r.status === "OLD_Dues"))
          .reduce((sum, r) => sum + Number(r.shirkat_charges || 0), 0);

      const totalPayout = data
        .filter(r => r.type === "payment"  || r.status === "return")
        .reduce((sum, r) => sum + (r.pay_out ? Number(r.pay_out) : r.total_fees), 0);

      const getcash = totalShirkatCharges - totalPayout;

      // //console.log("getcash =", getcash);


      // const getcash =  data.filter(r => r.type === "order" && r.status === "delivered").reduce((sum, r) => sum + (Number(r.shirkat_charges) || 0), 0) -  data.filter(r => r.type === "payment").reduce((sum, r) => sum + (Number(r.pay_out) || 0), 0);
      // //console.log(getcash)
      setCash(getcash)
    }
  return (
    <>
    
          <br />
          <br />
          <br />
    <Grid container>
      {/* <Grid item sm={2} xs={12} display="flex">
        <Box sx={{padding: '20px'}}> 
          Shirkat Name  : 
        </Box>
      </Grid> */}
      <Grid item sm={10} xs={12} display="flex">
        {
          console.log(data)
        }
        <SuggestionInput Suggestions={data} name="brsrn" handleInputChange={handleInputChange} />
      </Grid>
      <Grid item sm={2} xs={12} display="flex">
            {
              rowData?.shirkat_srn  ?
              <CustomBtn disable={cash <= 0 ? true : false} data="Pay Shirkat" style={{marginLeft:"10px"}} click={()=>OpenPopup(rowData?.shirkat_srn)} />
              :
              null
            }
      </Grid>
    </Grid>
    <br />
      {/* Payment Popup */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>💰 Enter Payment</DialogTitle>

        <DialogContent>

          
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            <strong>
              Shirkat Name : 
            </strong>
              {details?.summary?.shirkat_name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            <strong>
              Available Cash : 
            </strong>
              {cash}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Please enter the payment amount below:
          </Typography>
          <TextField
            autoFocus
            label="Payment Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={cash <= 0 ? 0 : payment}
            min={0}
            inputProps={{ max: cash , min: 0 }}
            // onChange={(e) => setPayment(e.target.value)}
             onChange={(e) => {
              const val = Number(e.target.value);
              if (val > cash) {
                setPayment(cash);
              } else {
                setPayment(e.target.value);
              }
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>


      {/* <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          width: "95%",
          mx: "auto",
          mt: 4,
        }}
      >
        
        <Table>
          <TableHead sx={{ backgroundColor: "#fafafa" }}>
            <TableRow>
              <TableCell />
              {keys.map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSort(key)}
                >
                  <Box display="flex" alignItems="center">
                    {key.replace(/_/g, " ")}
                    {sortKey === key &&
                      (sortOrder === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                      ))}
                  </Box>
                </TableCell>
              ))}
              <TableCell>
                Pay
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    cursor: "pointer",
                  }}
                  onClick={() => toggleRow(index)}
                >
                  <TableCell>
                    <IconButton size="small">
                      {openRow === index ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  {keys.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                  <TableCell>
                    <CustomBtn data="Pay Shirkat" click={()=>OpenPopup(row.shirkat_srn)} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={keys.length + 1} sx={{ p: 0 }}>
                    <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                      <AccordionData rowData={row} />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {
              rowData.shirkat_srn != undefined ? 
              <AccordionData rowData={rowData} fetchdata={fetchdata} myfunc={(get)=>myfunc(get)} />
              :
              null
            }
    </>
  );
};

export default DynamicAccordionTable;
