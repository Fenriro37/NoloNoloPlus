import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { Button, Modal } from 'react-bootstrap';

import { convertDateToObject, datediff, isInArray, convertToDate } from '../services/functions';

export class UpdateReservation extends React.Component {
  constructor(props) {
    super(props);

    const datesInTime = convertToDate(props.bookings).map((val) => {
      return val.getTime();
    });

    this.state = {
      value: [null, null],
      dates: datesInTime,
      show: false,
      dailyPrice: 0,
      reservation: props.reservation
    }

    this.disabledDays = this.disabledDays.bind(this);
    this.checkDateRange = this.checkDateRange.bind(this);
    // this.bookReservation = this.bookReservation.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
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

  render() {
    return (
      <>
        <Button
        className='w-100'
        variant="primary"
        onClick={this.handleShow}>
          Modifica prenotazione
        </Button>

        <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}>
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
                disabled
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
          </Modal.Body>
          <Modal.Footer
          className='d-flex justify-content-between'>
            <Button
              disabled={!this.checkDateRange(this.state.value)}
              className='mt-3 w-100'
              variant='success'
              onClick={(event) => {
                event.preventDefault();
                this.bookReservation();
              }}>
              {this.checkDateRange(this.state.value) ? <span>Prenota ora</span> : <span>Seleziona una data valida</span>}
            </Button>
            <Button
            variant="secondary"
            onClick={this.handleClose}>
              Esci
            </Button>
            <Button
            variant="danger">
              Cancella prenotazione
            </Button>
          </Modal.Footer>
        </Modal>


      </>
    );
  }
}