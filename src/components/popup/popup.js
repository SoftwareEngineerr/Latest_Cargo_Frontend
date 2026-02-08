import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Popup() {
  const [open, setOpen] = useState(false);
  const modal = useSelector((state) => state.Modal);

  const handleClick = () => {
    setOpen(true);
    //console.log(modal ? modal.severity ? modal.severity :'error' : 'error')
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(()=>{
    handleClick();
  },[modal])

  return (
    <>
    <Stack spacing={2} sx={{ width: "100%" }}>
     {
      modal.data ?
      modal.severity == 'Success' ?
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          <Typography variant="p" sx={{    position: 'relative', top: '3px'}}>
            {modal.data ? modal.data.message : null}
          </Typography>
        </Alert>
      </Snackbar>

          :
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
            <Typography variant="p" sx={{    position: 'relative', top: '3px'}}>
              {modal.data ? modal.data.message : null}
            </Typography>
          </Alert>
        </Snackbar>
        :
        null
     }
    </Stack>
    </>
  );
}
