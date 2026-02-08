import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';

export const CustomUL = (props) => {
    //console.log(props)
    const [selectvalue, setSelectvalue] = React.useState('');

    const handleChange = (getItem) => {
      setSelectvalue(getItem);
      //console.log([getItem , props.name])
      props.GetSelectedValue([getItem , props.name]);
    };
    return (
        <Box 
        sx={props.style || {}}
        >
          <FormControl fullWidth>         
            <Typography variant='nav' className='navigationClass'>
              <ul>
                <li className='mainBtn'><a>{props.getClass}</a>
                  <ul className="dropdown" >
                    {
                    props.items &&(
                    props.items.map((item , ind)=>
                    <li key={ind}  onClick={()=>handleChange(item)}>{item}</li>
                    )
                    )
                }
                  </ul>
                </li>
              </ul>
            </Typography>
          </FormControl>
        </Box>
      );
}

