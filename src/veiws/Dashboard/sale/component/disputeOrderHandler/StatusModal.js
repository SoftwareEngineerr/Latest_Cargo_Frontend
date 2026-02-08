import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Fade,
  Chip,
  Grid
} from '@mui/material';
import Fileimage from '../../../../../components/image/Fileimage';

const StatusModal = ({ open, onClose, comment, setComment, image, setImage, onSubmit, data }) => {
  const [status, setStatus] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [getimage , setGetimage ] = useState()

  const handleFileChange = (file) => {
    //console.log(file)
    // setGetimage(file);
  };

  const handleSubmit = () => {
    if (!data?.srn) return alert('Order SRN missing!');
    const payload = {
      order_srn: data.srn,
      status,
      comment,
      image: getimage,
    };
    onSubmit(payload);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 3,
            boxShadow: 24,
            outline: 'none',
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {/* Header */}
          <Typography variant="h5" fontWeight={600} mb={2}>
            Update Order Status
          </Typography>

          {/* Parcel Info */}
          <Box
            sx={{
              bgcolor: 'grey.100',
              borderRadius: 2,
              p: 2,
              mb: 3,
              fontSize: 15,
            }}
          >
            <Stack spacing={0.6}>
              {data ? (
              <Box
                sx={{
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    fontSize: 15,
                }}
                >
                <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid item xs={12} sm={6}>
                    <Typography><b>Sender:</b> {data.sender_name}</Typography>
                    <Typography><b>Phone:</b> {data.sender_phone}</Typography>
                    <Typography><b>Address:</b> {data.sender_address}</Typography>
                    <Typography><b>Weight:</b> {data.parcel_weight}</Typography>
                    <Typography><b>Delivery Date:</b> {data.delivery_date}</Typography>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} sm={6}>
                    <Typography><b>Destination:</b> {data.parcel_destination}</Typography>
                    <Typography><b>Address:</b> {data.receiver_address}</Typography>

                    <Typography sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <b>Current Status:&nbsp;</b>
                        <Chip
                        label={
                            Number(data.status) === 0
                            ? "Pending"
                            : Number(data.status) === 1
                            ? "On the Way"
                            : Number(data.status) === 2
                            ? "Delivered"
                            : "Unknown"
                        }
                        color={
                            Number(data.status) === 0
                            ? "warning"
                            : Number(data.status) === 1
                            ? "info"
                            : Number(data.status) === 2
                            ? "success"
                            : "default"
                        }
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600 }}
                        />
                    </Typography>

                    {data.description && (
                        <Typography sx={{ color: "text.secondary", mt: 1 }}>
                        <b>Description:</b> {data.description}
                        </Typography>
                    )}
                    </Grid>
                </Grid>
                </Box>
              ) : null}

            </Stack>
          </Box>

          {/* Status Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="0">Pending</MenuItem>
              <MenuItem value="1">On the Way</MenuItem>
              <MenuItem value="2">Delivered</MenuItem>
              <MenuItem value="3">Returned</MenuItem>
            </Select>
          </FormControl>

          {/* Comment Field */}
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Image Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={500} mb={1}>
              Upload Image
            </Typography>
            <Fileimage
            name="image"
            GetSelectedValue={(value) => setGetimage(value[0])} // 👈 Pass callback
            />

          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ px: 3, borderRadius: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default StatusModal;
