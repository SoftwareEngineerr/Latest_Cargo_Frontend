import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import { Input } from '../input/input';
import {DateGlobalConvertor} from './DateGlobalConverter'

export function FullDate(getprops, startOrEndDateNames) {

   ////console.log(getprops)
   const [selectedDate, setSelectedDate] = useState(
    getprops.value ? dayjs(getprops.value) : null
  );
  // const [selectedDate, setSelectedDate] = useState(getprops.name == 'DOB' && (getprops.value == '' || getprops.value == undefined)? dayjs('') : null);
  const [gregoriatDate, setGregorianDate] = useState(new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const [arbic, setArbic] = useState(new Date().toLocaleDateString('ar-TN-u-ca-islamic', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const openCalendar = () => {
      setIsCalendarOpen(true);
    };
  
    const closeCalendar = () => {
      setIsCalendarOpen(false);
    };
  const myfunc = (date) => {
    setIsCalendarOpen(false);
    // function isDateValid(dateStr) {
    //   return !isNaN(new Date(dateStr));
    // }
    // // return isDateValid(date)
    // if (isDateValid != true) return false
    const event = new Date(date.format('DD MMMM YYYY'));


    const getDt = (getparam) => {
      if (getparam == 'fa-IR') {
        const arr = ['دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'];
        const convertmonths = ['جدی', 'دلو', 'حوت', 'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس'];

        const getMonth = event.toLocaleDateString(getparam, { month: 'long' });
        const currentDate = event.toLocaleDateString(getparam, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        const currentDateIntoString = currentDate.toString();
        const getIndMonth = arr.indexOf(getMonth)
        return currentDateIntoString.replace(getMonth, convertmonths[getIndMonth])

      }
      return event.toLocaleDateString(getparam, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    }

    if (date) {      
      // //console.log(date)

      setGregorianDate(getDt('fa-IR'))
      setArbic(getDt('ar-TN-u-ca-islamic'))
    }

  };
 
  const callDateConvertor= (date)=>{
    const getConvertedDate = DateGlobalConvertor(date)
    setGregorianDate(getConvertedDate.gregoriatDate)
    setArbic(getConvertedDate.arabicDate)
    //console.log(getConvertedDate)
  }
  return (
    <Box sx={{ padding: '10px 10px 10px 0px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: getprops.width ? getprops.width : '100%' }}>
        {/* First DatePicker */}
          <DatePicker
          open={isCalendarOpen}
          onOpen={openCalendar}
          onClose={closeCalendar}
          defaultValue={dayjs(Date.now())}
          sx={{ width: '100%' }}
          //value={selectedDate}

          value={selectedDate}
          // value={selectedDate ? selectedDate : getprops.value}
          maxDate={getprops.max ? getprops.max : null} // Set the maximum selectable date
          minDate={getprops.min ? getprops.min : null} // Set the maximum selectable date
          name={getprops && getprops.name}
          // value=""
              onClick={openCalendar}

          // onChange={(date) => {
          //   myfunc(date);
          //   setSelectedDate(date);
          //   getprops && getprops.onChange && getprops.onChange(date.format('D MMMM YYYY'), getprops.name, gregoriatDate, arbic);
          //   getprops && getprops.throwfullevent && getprops.throwfullevent(date);


          // }}
           onChange={(date) => {
            setSelectedDate(date);
            myfunc(date);
            getprops?.onChange?.(date.format('D MMMM YYYY'), getprops.name);
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              {...getprops}
              label={getprops.name == 'startDate' || getprops.name == 'FromDate' || getprops.name == 'ChangeDateTo' ? 'شروع' : getprops.name == 'endDate' ||  getprops.name == 'ToDate'? 'ختم'  : 'Select Date'}
              variant="outlined"
              id="datePicker"
              value={selectedDate}
              //readOnly
              className='datePickerInput'
              onClick={openCalendar}
              onFocus={(e) => e.target.blur()} // Prevent default behavior on focus
              sx={{ width: "100%", ...getprops.sx }}
              // mb={4}
              // value={selectedDate ? selectedDate.format('MMMM YYYY') : null}
              readOnly={true}
              required
            />
          )}

          required
        />
        <Grid className='dateOther' marginTop={1}  container >
          <Grid lg={6} item>
            <Box pr={1}>
              <Input
                value={gregoriatDate}
                // {...getprops}
                style={{ backgroundColor: '#f5f4f4', border: '1px solid #f5f4f4' }}
                name="pashto-Date"
                readOnly
                disabled
              />
            </Box>
          </Grid>
          <Grid lg={6} item>
            <Box pl={1} >
              <Input
                value={arbic}
                // {...getprops}
                style={{ backgroundColor: '#f5f4f4', border: '1px solid #f5f4f4' }}
                name="pashto-Date"
                readOnly
                disabled
              />
            </Box>
          </Grid>
        </Grid>

      </LocalizationProvider>
    </Box>
  );
}
