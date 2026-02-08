import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SelectOnObject = (props)=> {
  //console.log(props)
  const [selectvalue, setSelectvalue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectvalue(event.target.value);
    //console.log([event.target.value , props.name])
    props.GetSelectedValue([event.target.value , props.name]);
  };
  return (
    <Box 
    sx={props.style || {}}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectvalue}
          label="Age"
          onChange={handleChange}
        >
            {
                props.items &&(
                props.items.map((item , ind)=>
                <MenuItem key={ind} value={item.Srn}>{item[props.option]}</MenuItem>
                )
                )
            }
        </Select>
      </FormControl>
    </Box>
  );
}

