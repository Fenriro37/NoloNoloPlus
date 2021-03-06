import React from 'react'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { Button, Modal, Spinner } from 'react-bootstrap';

import ApiCall from '../services/apiCall';
import { convertDateToObject, datediff, isInArray, convertToDate } from '../services/functions';

export class MakeReservation extends React.Component {
  constructor(props) {
    super(props);

    const datesInTime = convertToDate(props.bookings).map((val) => {
      return val.getTime();
    });

    this.state = {
      // Date range picker
      value: [null, null],
      dates: datesInTime,
      // Product
      bookings: props.bookings,
      fixedPrice: props.finalFixedPrice,
      variablePrice: props.originalVariablePrice,
      variableDiscount: props.variableDiscount,
      product: props.product,
      // Authorization
      isAuthenticated: props.isAuthenticated,
      // Modal
      show: false,
      loading: true,
      done: false
    }
    // Price
    this.priceCalculator = this.priceCalculator.bind(this);
    // Modal
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // Date range picker
    this.disabledDays = this.disabledDays.bind(this);
    // Update reservation button
    this.checkDateRange = this.checkDateRange.bind(this);
    // API call
    this.makeReservation = this.makeReservation.bind(this);
  }

  priceCalculator() {
    if((this.state.value[0] && this.state.value[1])) {
      if(this.state.variableDiscount.onSale == true && datediff(this.state.value[0], this.state.value[1]) > this.state.variableDiscount.days) {
        let variableTotalPrice
        if(this.state.variableDiscount.onSaleType == true) {
          variableTotalPrice = (datediff(this.state.value[0], this.state.value[1]) * this.state.variablePrice) * (100 - this.state.variableDiscount.onSaleValue) / 100;
        } else {
          variableTotalPrice = (datediff(this.state.value[0], this.state.value[1]) * this.state.variablePrice) - this.state.variableDiscount.onSaleValue;
        }
        return parseFloat(this.state.fixedPrice + variableTotalPrice);
      } else {
        return parseFloat(this.state.fixedPrice + (datediff(this.state.value[0], this.state.value[1]) * this.state.variablePrice));
      }
    } else {
      return 0.0
    }
  }

  handleClose() {
    this.setState({
      show: false
    });
    window.location.replace('/user/reservation')
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
      if(range[0] > range[1] || range[0].toString() == 'Invalid Date' || range[1].toString() == 'Invalid Date') {
        return false;
      } else {
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
    } else {
      return false;
    }
  }

  makeReservation() {
    this.setState({
      loading: true
    });
    this.handleShow();

    // Cerca le informazioni dell'utente
    ApiCall.getUser().then((getUserResult) => {
      // Crea la prenotazione
      const reservation = {
        clientEmail: getUserResult.data.data.email,
        clientName: getUserResult.data.data.userName,
        clientSurname: getUserResult.data.data.userSurname,
        productId: this.state.product._id,
        productTitle: this.state.product.title,
        productBrand: this.state.product.brand,
        productImage: this.state.product.image,
        bookingDate: convertDateToObject(new Date()),
        startDate: convertDateToObject(this.state.value[0]),
        endDate: convertDateToObject(this.state.value[1]),
        isTaken: false,
        isReturned: false,
        totalPrice: this.priceCalculator(),
        fixedPrice: this.state.product.fixedPrice,
        variablePrice: this.state.product.price,
        fixedDiscount: this.state.product.discount,
        variableDiscount: this.state.product.overDays,
        description: '',
        note: ''
      }
      // Aggiunge la prenotazione
      ApiCall.postReservation(null, reservation).then((PostReservationResult) => {
        // Modifica delle prenotazioni del prodotto
        let newBooking = {
          productId: this.state.product._id,
          clientId: getUserResult.data.data.email,
          reservationId: PostReservationResult.data.data._id,
          startDate: convertDateToObject(this.state.value[0]),
          endDate: convertDateToObject(this.state.value[1]),
          total: this.priceCalculator()
        }
        let oldBookings = this.state.bookings;
        oldBookings.push(newBooking);
        // Aggiorna le prenotazioni del prodotto
        ApiCall.postProduct(this.state.product._id, { bookings: oldBookings }).then(() => {
          // OK
          this.setState({
            loading: false,
            done: true
          });
        }).catch(() => {
          this.setState({
            loading: false,
            done: false
          });
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
            disabled={!this.state.isAuthenticated}
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
        <div className='row' tabIndex='0'>
          <div className='col-8'>
            Giorni di noleggio:
          </div>
          <div
          className='col-4 text-end'>
            {this.checkDateRange(this.state.value) ? datediff(this.state.value[0], this.state.value[1]) : 0 }
          </div>
        </div>
        <div className='row mb-2' tabIndex='0'>
          <div className='col-8'>
            Prezzo totale:
          </div>
          <div className='col-4 text-end'>
            {this.checkDateRange(this.state.value) ? this.priceCalculator().toFixed(2) : '0.00'} ???
          </div>
        </div>
        {this.state.isAuthenticated ? (
        <Button
          disabled={!this.checkDateRange(this.state.value)}
          className='mt-11 w-100'
          onClick={(event) => {
            event.preventDefault();
            this.makeReservation();
          }}>
          {this.checkDateRange(this.state.value) ? <span>Prenota ora</span> : <span>Seleziona una data valida</span>}
        </Button>
        ) : (
        <Button 
          className='mt-1 w-100'
          href='/public/login.html'
        >
          Accedi per prenotare
        </Button>
        )}

        <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        centered>
          <Modal.Body>
            {this.state.loading ? (
              <div
              className='d-flex align-items-center'>
                Effetuo la prenotazione&nbsp;
                <Spinner
                variant="primary"
                animation="border"
                role="status">
                  <span
                  className="visually-hidden">
                    Caricamento...
                  </span>
                </Spinner>
              </div>
            ) : (
              this.state.done ? (
                <>
                  Prenotazione effettuata.
                </>
              ) : (
                <>
                  Errore durante la prenotazione.
                </>
              )              
            )}
          </Modal.Body>
          <Modal.Footer>
          <Button
          variant="secondary"
          onClick={this.handleClose}
          disabled={this.state.loading}>
            Chiudi
          </Button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}