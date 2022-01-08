import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { Button, Modal } from 'react-bootstrap';

import { convertDateToObject, datediff, isInArray, convertToDate } from '../services/functions';
import ApiCall from '../services/apiCall';

export class UpdateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Date range picker
      value: [null, null],
      dates: [],
      bookings: [],
      // Reservation
      reservation: props.reservation,
      dailyPrice: (props.reservation.price / datediff(
        new Date(
          props.reservation.startDate.year,
          props.reservation.startDate.month,
          props.reservation.startDate.day),
        new Date(
          props.reservation.endDate.year,
          props.reservation.endDate.month,
          props.reservation.endDate.day
        ))).toFixed(2),
      // Modal
      show: false,
      loading: true,
      done: false
    }
    // Modal
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // Date range picker
    this.disabledDays = this.disabledDays.bind(this);
    // Update reservation button
    this.checkDateRange = this.checkDateRange.bind(this);
    // API call
    this.updateReservation = this.updateReservation.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    });
  }
  
  handleShow() {
    this.setState({
      show: true
    });
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

  updateReservation() {
    console.log('Update reservation');
    // Modifica della prenotazione
    ApiCall.postReservation(this.state.reservation._id, {
      bookingDate: convertDateToObject(new Date()),
      startDate: convertDateToObject(this.state.value[0]),
      endDate: convertDateToObject(this.state.value[1]),
      price: (datediff(this.state.value[0], this.state.value[1]) * this.state.dailyPrice).toFixed(2)
    }).then(() => {
      // Aggiornamento delle prenotazioni del prodotto
      let bookings = this.state.bookings;
      bookings = bookings.filter((e) => {
        if(e.reservationId == this.state.reservation._id) {
          e.startDate = this.state.reservation.startDate;
          e.endDate = this.state.reservation.endDate;
        }
        return true;
      });
      ApiCall.postProduct(this.state.reservation.productId, {
        bookings: bookings
      }).then(() => {
        alert('OK');
      });
    });
  }

  deleteReservation() {
    console.log('Delete reservation');
  }

  componentWillReceiveProps(nextProps) {
    // Convert bookings data to an array of dates where the product is booked
    let datesInTime = convertToDate(nextProps.bookings).map((val) => {
      return val.getTime();
    });
    // Remove the days of the current booking
    let removeDate = convertToDate([this.state.reservation]).map((val) => {
      return val.getTime();
    });
    let newDates = datesInTime.filter((e) => {
      for(let index in removeDate) {
        if(e == removeDate[index]) {
          return false;
        }
      }
      return true;
    });
    // Set the new dates
    this.setState({
      dates: newDates,
      bookings: nextProps.bookings
    }); 
  }

  render() {
    return (
      <>
        {/* Trigger booking editor's modal */}
        <Button
        className='w-100'
        variant="primary"
        onClick={this.handleShow}>
          Modifica prenotazione
        </Button>
        {/* Booking editor's modal */}
        <Modal
        show={this.state.show}
        onHide={this.handleClose}
        keyboard={false}
        centered>
          <Modal.Header
          closeButton>
            <Modal.Title>Modifica prenotazione</Modal.Title>
          </Modal.Header>
          <Modal.Body
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
            <div className='row'>
              <div className='col-8'>
                Prezzo giornaliero:
              </div>
              <div className='col-4 text-end'>
                {this.state.dailyPrice} €
              </div>
            </div>
            <div className='row'>
              <div className='col-8'>
                Giorni di noleggio:
              </div>
              <div className='col-4 text-end'>
                {(this.state.value[0] && this.state.value[1]) ? datediff(this.state.value[0], this.state.value[1]) : 0 }
              </div>
            </div>
            <div className='row mb-2'>
              <div className='col-8'>
                Prezzo totale:
              </div>
              <div className='col-4 text-end'>
                {(this.state.value[0] && this.state.value[1]) ? (datediff(this.state.value[0], this.state.value[1]) * this.state.dailyPrice).toFixed(2) : '0.00'} €
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
          className='d-flex justify-content-between'>
            <Button
              disabled={!this.checkDateRange(this.state.value)}
              className='mt-3 w-100'
              variant='success'
              onClick={(event) => {
                event.preventDefault();
                this.updateReservation();
              }}>
              {this.checkDateRange(this.state.value) ? <span>Modifica ora</span> : <span>Seleziona una data valida</span>}
            </Button>
            <Button
            className='w-100'
            variant="danger"
            onClick={this.deleteReservation}>
              Cancella prenotazione
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Loading modal */}
      </>
    );
  }
}