import React from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import { Button } from 'react-bootstrap';

// Metodo che calcola la differenza di due giorni
function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
}

// Metodo per incrementare una data
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// Metodo che cerca se una data (date) è all'interno di un array di date
function isInArray(array, date) {
  let element;
  return !!array.find(item => {
    element = new Date(item);
    return element.getTime() == date.getTime()
  });
}

// Metodo per convertire le prenotazioni (array) di un array (dates) di date
// nei quali il prodotto non è prenotato. Una prenotazione ha una data di
// inizio e di fine.
function convertToDate(array) {
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

export class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);

    const datesInTime = convertToDate(props.bookings).map((val) => {
      return val.getTime();
    });

    this.state = {
      value: [null, null],
      dates: datesInTime,
      bookings: props.bookings,
      price: props.finalPrice,
      isAuthenticated: props.isAuthenticated
    }

    this.disabledDays = this.disabledDays.bind(this);
    this.checkDateRange = this.checkDateRange.bind(this);
  }

  disabledDays(date) {
    if(this.state.dates == null) {
      return null;
    }
    return this.state.dates.includes(date.getTime());
  }

  checkDateRange(range) {
    if(range.length == 2 && this.state.dates != null) {
      let currentDate = range[0];
      let endDate = range[1];
      while (currentDate <= endDate) {
        if(isInArray(this.state.dates, currentDate) == true) {
          return false;
        }
        currentDate = currentDate.addDays(1);
      }
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAuthenticated: nextProps.isAuthenticated });  
  }

  render() {
    return (
      <div className='pb-0 mt-2'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateRangePicker
            disablePast
            shouldDisableDate={this.disabledDays}
            startText="Data di inizio"
            endText="Data di fine"
            value={this.state.value}
            onChange={(newValue) => {
              this.setState({
                value: newValue
              });
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 1 }}> a </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
            inputFormat="dd/MM/yyyy"
            onAccept={(value) => { this.checkDateRange(value) }}
          />
        </LocalizationProvider>
        <div>
          Giorni di noleggio: {
            (this.state.value[0] && this.state.value[1])
            ? datediff(this.state.value[0], this.state.value[1])
            : 0
          } 
        </div>
        <div>
          Prezzo totale: {
            (this.state.value[0] && this.state.value[1])
            ? (datediff(this.state.value[0], this.state.value[1]) * this.state.price).toFixed(2)
            : 0.00
          } €
        </div>
        {
        this.state.isAuthenticated
        ? (
          <Button 
            className="mt-2 w-100"
            onClick={() => {
              console.log("Prenotazione!");
            }}
            href="/user/index.html"
          >Prenota ora</Button>
        )
        : (
          <Button 
            className="mt-2 w-100"
            href="/public/login.html"
          >Accedi per prenotare</Button>
        )
        }
      </div>
    );
  }
}