import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Custombranch = (props) => {
  const [selectvalue, setSelectvalue] = React.useState('');
  const [branchItems, setBranchItems] = React.useState([]);
  const Api = useSelector((state) => state.Api);

  // ✅ Fetch and cache branches
  const fetchBranches = React.useMemo(() => {
    return async () => {
      try {
        const token = sessionStorage.getItem('User_Data')
          ? JSON.parse(sessionStorage.getItem('User_Data')).token
          : null;
        if (!token) return;

        // ✅ Check sessionStorage first
        const cachedBranches = sessionStorage.getItem('branchItems');
        if (cachedBranches) {
          setBranchItems(JSON.parse(cachedBranches));
          return;
        }

        // 🛰️ API Call only if no cache
        const response = await axios.get(Api.BranchGet, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const branchNames = response.data.data;
          setBranchItems(branchNames);
          sessionStorage.setItem('branchItems', JSON.stringify(branchNames));
        }
      } catch (error) {
        console.error('❌ Failed to fetch branches:', error);
      }
    };
  }, [Api.BranchGet]);

  React.useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectvalue(selectedValue);

    // ✅ Find the full branch object
    const selectedBranch = branchItems.filter((item)=>item.srn == selectedValue)
    const getvalue = {
      parcel_destination: selectedBranch[0].address,
      parcel_destination_branch: selectedBranch[0].srn
    }
    // //console.log(getvalue)
      props.GetSelectedValue([getvalue, props.name]);
    
  };

  return (
    <Box sx={props.style || {}}>
      <FormControl fullWidth>
        <InputLabel id={`label-${props.name}`}>Destination ولایت دریافت کننده</InputLabel>
        <Select
          labelId={`label-${props.name}`}
          id={`select-${props.name}`}
          value={selectvalue}
          label={props.name}
          onChange={handleChange}
          required={props.required == true}
        >
          {branchItems.length > 0 &&
            branchItems.map((item, ind) => (
              <MenuItem key={ind} value={item.srn}>
                {item.address} {/* ✅ or item.address if you want */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
