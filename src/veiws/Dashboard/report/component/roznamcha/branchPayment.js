import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { GetRequest } from "../../../../../redux/actions/GetRequest";
import { PostRequest } from "../../../../../redux/actions/PostRequest";

const BranchSelector = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [numericValue, setNumericValue] = useState("");
  const [loading, setLoading] = useState(true);
  const url = useSelector((state) => state.Api);
const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token;
    const dispatch = useDispatch();
  const [comment, setComment] = useState(""); // 🆕 comment state

  // Fetch branches when component loads
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await dispatch(GetRequest(url.BranchGet, userToken, 'SHOW_CLASSES'));
        // const response = await axios.get(url.BranchGet); // adjust URL as needed
        //console.log(response.data)
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async () => {
    //console.log("Selected Branch:", selectedBranch);
    //console.log("Numeric Value:", numericValue);
    // //console.log(props.data.approved)
    const payload = {
        branch: selectedBranch,
        payment: numericValue,
        comment: comment,
    }
    // return false
    await dispatch(PostRequest(url.BranchTransfer, userToken , payload))
    // props.updatefunc()
    // setOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
      sx={{ width: 300, mx: "auto" }}
    >
      {/* Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="branch-select-label">Select Branch</InputLabel>
        <Select
            labelId="branch-select-label"
            value={selectedBranch?.srn || ""}  // display selected branch if any
            label="Select Branch"
            onChange={(e) => {
            const selected = branches.find(
                (branch) => branch.srn === e.target.value
            );
            setSelectedBranch(selected); // ✅ store whole branch object
            }}
        >
            {branches.map((branch) => (
            <MenuItem key={branch.srn} value={branch.srn}>
                {branch.origin} - {branch.address}
            </MenuItem>
            ))}
        </Select>
        </FormControl>


      {/* Numeric input */}
      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={numericValue}
        onChange={(e) => setNumericValue(e.target.value)}
        inputProps={{ min: 0 }}
      />
      <TextField
        fullWidth
        label="Comment"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="حواله یا بانک ټرانسفر معلومات"
      />

      {/* Submit button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedBranch || numericValue === ""}
      >
        Submit
      </Button>
    </Box>
  );
};

export default BranchSelector;
