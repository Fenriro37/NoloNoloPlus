import React from 'react'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import { Button } from 'react-bootstrap';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export default function DateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <div className='pb-0 mt-2'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateRangePicker
          disablePast
          shouldDisableDate={disableWeekends}
          startText="Data di inizio"
          endText="Data di fine"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 1 }}> a </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
          InputProps={{
            style: {
              height: 40,
              padding: 5
            }
          }}
          style={{height:"40", padding:"5"}}
        />
      </LocalizationProvider>
      <Button className="mt-2 w-100">Prenota ora</Button>
    </div>
  );
}