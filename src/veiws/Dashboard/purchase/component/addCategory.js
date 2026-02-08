import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AddCategory = ({ open, onClose, formData, onFormChange, onSubmit, categories }) => {
    // //console.log(formData)
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
                <Typography variant="h6" id="popup-modal" sx={{ mb: 2 }}> نوي کیټګري </Typography>
                <TextField fullWidth label="نوم" name="catName" value={formData.catName} onChange={onFormChange} sx={{ mb: 2 }} />
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

export default AddCategory;
