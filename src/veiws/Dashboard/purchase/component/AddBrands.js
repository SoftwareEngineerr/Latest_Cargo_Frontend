import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AddBrands = ({ open, onClose, brandForm, onFormChange, onSubmit, brands }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="popup-modal">
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}>
                <Typography variant="h6" id="popup-modal" sx={{ mb: 2 }}> نوي برانډ </Typography>
                <TextField fullWidth label="نوم" name="brandName" value={brandForm.brandName} onChange={onFormChange} sx={{ mb: 2 }} />
                {/* <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={onFormChange} sx={{ mb: 2 }} /> */}
                {/* <TextField fullWidth label="Field 3" name="field3" value={formData.field3} onChange={onFormChange} sx={{ mb: 2 }} /> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Submit</Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddBrands;
