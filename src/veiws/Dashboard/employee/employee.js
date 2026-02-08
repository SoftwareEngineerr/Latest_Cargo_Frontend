import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import EmployeeRegisterPopup from "./components/EmployeeRegisterPopup";
import EmployeeList from "./components/EmployeeList";

const EmployeeRegister = () => {
  const [open, setOpen] = useState(false);

  const [ getdata , setGetdata  ] = useState(0)

  const myfunc = () => {
    setGetdata((old)=>old+1)
    // alert('register')
  }

  return (
    <Box p={3}>
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Add Employee
      </Button> */}

      <EmployeeRegisterPopup
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => console.log()}
        myfunc={myfunc}
      />

      <EmployeeList check={getdata} />
    </Box>
  );
};

export default EmployeeRegister;
