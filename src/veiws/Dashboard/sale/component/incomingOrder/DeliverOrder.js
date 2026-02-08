import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GetRequest } from "../../../../../redux/actions/GetRequest";
import { PostRequest } from "../../../../../redux/actions/PostRequest";

const DeliverOrder = ({ order, onClose, onSuccess }) => {
  //console.log(order)
  const url = useSelector((state) => state.Api);
  const dispatch = useDispatch();
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

  const [branches, setBranches] = useState([]); // API data for dropdown
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Handle Submit (forward order)
  const handleSubmit = async () => {
    if (!selectedBranch) return alert("Please select a branch.");
    //console.log(selectedBranch )
    //console.log(order )
    // return false
    setSubmitting(true);
    const payload = {
        track_number: order?.track_number,
        order_srn: order?.srn,
        image: order?.image,
        origin: order?.origin,
        status : 'forward',
        comment: 'Forwarded to new branch',
        newBranchSrn: selectedBranch?.srn,
        newBranchAddres: selectedBranch?.address, // ✅ added
    };

    try {
      const res = await dispatch(PostRequest(url.ForwardOrder, userToken, payload));
      if (res?.success) {
        alert("✅ Order forwarded successfully!");
        onSuccess?.();
      } else {
        alert("❌ Failed to forward order.");
      }
    } catch (error) {
      console.error("Forward error:", error);
      alert("⚠ Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Deliver Order #{order?.track_number}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel id="branch-select-label">Select Branch</InputLabel>
            <Select
                labelId="branch-select-label"
                value={selectedBranch?.srn || ""}
                label="Select Branch"
                onChange={(e) => {
                const branch = branches.find(b => b.srn === e.target.value);
                setSelectedBranch(branch); // store full object
                }}
            >
                {branches.map((branch) => (
                <MenuItem key={branch.srn} value={branch.srn}>
                    {branch.origin} — {branch.address}
                </MenuItem>
                ))}
            </Select>
        </FormControl>


          <Box textAlign="right">
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Forwarding..." : "Submit"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DeliverOrder;
