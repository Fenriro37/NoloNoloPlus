import React from 'react'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { Button } from 'react-bootstrap';

import ApiCall from '../services/apiCall';

function convertDateToObject(date) {
  return {
    day: date.getDate().toString(),
    month: (date.getMonth() + 1).toString(),
    year: date.getFullYear().toString()
  }
}

// Metodo che calcola la differenza di due giorni
function datediff(first, second) {
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

export class Reservation extends React.Component {
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
      product: props.product,
      isAuthenticated: props.isAuthenticated
    }

    this.disabledDays = this.disabledDays.bind(this);
    this.checkDateRange = this.checkDateRange.bind(this);
    this.bookReservation = this.bookReservation.bind(this);
  }

  disabledDays(date) {
    if(this.state.dates == null) {
      return null;
    }
    return this.state.dates.includes(date.getTime());
  }

  checkDateRange(range) {
    if(range.length == 2 && this.state.dates != null && range[0] && range[1]) {
      let currentDate = range[0];
      let endDate = range[1];
      while(currentDate <= endDate) {
        if(isInArray(this.state.dates, currentDate) == true) {
          return false;
        }
        currentDate = currentDate.addDays(1);
      }
      return true;
    }
    return false;
  }

  bookReservation() {
    // Controllo delle date
    if(!this.state.value[0] || !this.state.value[1]) {
      return alert('Data prenotazione non valida');
    }
    // Cerca le informazioni dell'utente
    ApiCall.getUser().then((getUserResult) => {
      // Crea la prenotazione
      const reservation = {
        clientEmail: getUserResult.data.data.email,
        clientName: getUserResult.data.data.userName,
        clientSurname: getUserResult.data.data.userSurname,
        productId: this.state.product._id,
        prodcutTitle: this.state.product.title,
        productBrand: this.state.product.brand,
        productImage: this.state.product.image,
        bookingDate: convertDateToObject(new Date()),
        startDate: convertDateToObject(this.state.value[0]),
        endDate: convertDateToObject(this.state.value[1]),
        isTaken: false,
        isReturned: false,
        price: (datediff(this.state.value[0], this.state.value[1]) * this.state.price).toFixed(2),
        description: '',
        note: ''
      }
      // Aggiunge la prenotazione
      ApiCall.postReservation(reservation).then((PostReservationResult) => {
        // Modifica delle prenotazioni del prodotto
        let newBooking = {
          productId: this.state.product._id,
          clientId: getUserResult.data.data.email,
          reservationId: PostReservationResult.data.data._id,
          startDate: convertDateToObject(this.state.value[0]),
          endDate: convertDateToObject(this.state.value[1])
        }
        let oldBookings = this.state.bookings;
        oldBookings.push(newBooking);
        // Aggiorna le prenotazioni del prodotto
        ApiCall.postProduct(this.state.product._id, { bookings: oldBookings }).then(() => {
          // OK
          alert('Prenotazione effettuata con successo');
          window.location.reload(false);
        }); 
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });  
  }

  render() {
    return (
      <div
      className='pb-0 mt-2'>
        <Box className="d-flex justify-content-center mb-2">
          <LocalizationProvider
          dateAdapter={AdapterDateFns}>
            <MobileDateRangePicker
            disablePast
            shouldDisableDate={this.disabledDays}
            startText='Data di inizio'
            endText='Data di fine'
            value={this.state.value}
            onChange={(newValue) => {
              this.setState({
                value: newValue
              });
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps}/>
                <Box
                sx={{ mx: 1 }}>
                  a
                </Box>
                <TextField {...endProps}/>
              </React.Fragment>
            )}
            inputFormat='dd/MM/yyyy'/>
          </LocalizationProvider>
        </Box>
        <div>
          Giorni di noleggio: {(this.state.value[0] && this.state.value[1]) ? datediff(this.state.value[0], this.state.value[1]) : 0 } 
        </div>
        <div>
          Prezzo totale: {(this.state.value[0] && this.state.value[1]) ? (datediff(this.state.value[0], this.state.value[1]) * this.state.price).toFixed(2) : '0.00'} €
        </div>
        {this.state.isAuthenticated ? (
        <Button
          disabled={!this.checkDateRange(this.state.value)}
          className='mt-3 w-100'
          onClick={(event) => {
            event.preventDefault();
            this.bookReservation();
          }}>
          {this.checkDateRange(this.state.value) ? <span>Prenota ora</span> : <span>Seleziona una data valida</span>}
        </Button>
        ) : (
        <Button 
          className='mt-2 w-100'
          href='/public/login.html'
        >
          Accedi per prenotare
        </Button>
        )}
      </div>
    );
  }
}