import React from 'react'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import { Button } from 'react-bootstrap';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function isInArray(array, value) {
  let tmp;
  return !!array.find(item => {
    tmp = new Date(item);
    return tmp.getTime() == value.getTime()
  });
}

function convertToDate(array) {
  // Inizializzazione delle variabili
  let index = 0;
  let dates = [];
  // Cicla sulle prenotazioni di un prodotto
  for(index in array) {
    // Cattura la data d'inizio di una prenotazione
    const startDate = new Date(
      parseInt(array[index].startDate.year),
      parseInt(array[index].startDate.month) - 1,
      parseInt(array[index].startDate.day)
    );
    // Cattura la data di fine di una prenotazione
    const endDate = new Date(
      parseInt(array[index].endDate.year),
      parseInt(array[index].endDate.month) - 1,
      parseInt(array[index].endDate.day)
    );
    // Aggiunge nell'array le date nell'intervallo
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
    }
  }
  return dates;
}

export default function DateRangePicker(props) {
  const [value, setValue] = React.useState([null, null]);

  const dates = convertToDate(props.bookings).map((val) => { return val.getTime() });
  const disabledDays = (date) => { return dates.includes(date.getTime()) };
  const checkDateRange = (range) => {
    if(range.length == 2) {
      let currentDate = range[0];
      let endDate = range[1];
      console.log(dates);
      while (currentDate <= endDate) {
        if(isInArray(dates, currentDate) == true) {
          console.log('NO')
          return false;
        }
        currentDate = currentDate.addDays(1);
      }
    }
    console.log('SI')
    return true;
  }

  return (
    <div className='pb-0 mt-2'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateRangePicker
          disablePast
          shouldDisableDate={disabledDays}
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
          mask={'MM/DD/YYYY'}
          onAccept={(value) => { checkDateRange(value) } }
        />
      </LocalizationProvider>
      <Button className="mt-2 w-100">Prenota ora</Button>
    </div>
  );
}