import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const ExpenseCatSelect = (props) => {
  const [selectvalue, setSelectvalue] = React.useState('');
  const [expCategory , setExpCategory] = React.useState(); // Fetch expCategory outside the component
  const url = useSelector((state) => state.Api.expenseCategory);
  const ownstate = useSelector((state) => state.UpdateState.data);
//   const handleChange = (event: SelectChangeEvent) => {
//     // //console.log(event.target.value)
//     setSelectvalue(event.target.value);

//     const getClassName =  expCategory.find(item => item.Srn === event.target.value)
//     const classNames = getClassName.ClassName + '  ' + getClassName.ClassName_P
//     props.GetSelectedValue([event.target.value, event.target.name, 'ClassName', classNames]);
//   };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectvalue(event.target.value);
    //console.log(props)
    //console.log([event.target.value , props.name])
    props.GetSelectedValue([event.target.value , props.name]);
  };

  React.useEffect(()=>{
    const myfunc = async()=>{
      // Check if data exists in sessionStorage
      const storedData = sessionStorage.getItem("ExpenseCat");
      //console.log(storedData)
      if (storedData) {
        // If data exists, set it to the state
        setExpCategory(JSON.parse(storedData));
      } else {
        // If data doesn't exist, fetch it from the API
        const userToken = JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
        const res = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        });
        if (res.status === 200) {
            //console.log(res)
          setExpCategory(res.data.result);
          // Store the fetched data in sessionStorage
          sessionStorage.setItem("ExpenseCat", JSON.stringify(res.data.result));
        }
      }
    };
    myfunc();
  }, [ownstate]);

  return (
    <Box mt={2} sx={props.style || {}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.data}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectvalue}
          label="Age"
          onChange={handleChange}
          name={props.name}
          required={props.required == true ? true : false}
          style={{ backgroundColor: '#f5f4f4' }}
        >
          {expCategory &&
            expCategory.map((item, ind) => (
              <MenuItem key={ind} value={item.Srn}>
                {item.categoryName} {item.categoryName_P}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
