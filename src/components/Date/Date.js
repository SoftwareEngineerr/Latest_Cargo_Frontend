import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

export function Date(getprops) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  const myfunc = (date) => {
    //console.log('Selected Month:', date.format('MMMM YYYY'));
  };

  useEffect(() => {
    setSelectedDate(dayjs());
  }, []);

  const maxSelectableDate = dayjs().endOf('month'); // Set the maximum selectable date to the end of the current month

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%' }}>
      <DatePicker
        sx={{ width: '100%' }}
        views={['month']}
        value={selectedDate}
        maxDate={maxSelectableDate} // Set the maximum selectable date
        name={getprops && getprops.name} 
        onChange={(date) => {
          myfunc(date);
          setSelectedDate(date);
          getprops && getprops.onChange && getprops.onChange(date);
        }}
        renderInput={(props) => (
          <TextField
            {...props}
            {...getprops}
            label="Select Month"
            variant="outlined"
            value={selectedDate ? selectedDate.format('MMMM YYYY') : null}
          />
        )}
      />
    </LocalizationProvider>
  );
}
