import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import EmployeeRegisterPopup from "./components/EmployeeRegisterPopup";
import EmployeeList from "./components/EmployeeList";

const EmployeeRegister = (props) => {
  const [open, setOpen] = useState(false);

  const [ getdata , setGetdata  ] = useState(0)

  // console.log()
  const brsrn = props.brsrn.srn;
  const myfunc = () => {
    setGetdata((old)=>old+1)
    // alert('register')
  }

  return (
    <Box p={3}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Employee
      </Button>
      {console.log(props)}
      <EmployeeRegisterPopup
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => console.log()}
        myfunc={myfunc}
        websrn={props.brsrn.srn}
      />

        
      <EmployeeList brsrn={brsrn} check={getdata} />
    </Box>
  );
};

export default EmployeeRegister;