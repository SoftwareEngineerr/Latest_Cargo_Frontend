import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const MainClass = (props) => {
  const [selectvalue, setSelectvalue] = React.useState('');
  const [classes , setClasses] = React.useState(); // Fetch classes outside the component
  const url = useSelector((state) => state.Api.ShowClass);
  const ownstate = useSelector((state) => state.UpdateState.data);
  const handleChange = (event: SelectChangeEvent) => {
    // //console.log(event.target.value)
    setSelectvalue(event.target.value);

    const getClassName =  classes.find(item => item.Srn === event.target.value)
    const classNames = getClassName.ClassName + '  ' + getClassName.ClassName_P
    props.GetSelectedValue([event.target.value, event.target.name, 'ClassName', classNames]);
  };

  React.useEffect(()=>{
    //console.log('is it changing');
    const myfunc = async()=>{
      // Check if data exists in sessionStorage
      const storedData = sessionStorage.getItem("Classes");
      if (storedData) {
        // If data exists, set it to the state
        setClasses(JSON.parse(storedData));
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
          setClasses(res.data.result);
          // Store the fetched data in sessionStorage
          sessionStorage.setItem("Classes", JSON.stringify(res.data.result));
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
          {classes &&
            classes.map((item, ind) => (
              <MenuItem key={ind} value={item.Srn}>
                {item.ClassName} {item.ClassName_P}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
