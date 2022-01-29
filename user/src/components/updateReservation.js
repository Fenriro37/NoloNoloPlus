import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { Button, Modal, Spinner } from 'react-bootstrap';

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
      variableDiscount: props.reservation.variableDiscount,
      // Modal
      showEditModal: false,
      showLoadingModal: false,
      loading: false,
      error: false,
      isEditing: true
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
    this.updateReservation = this.updateReservation.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
  }

  priceCalculator() {
    let fixedPrice;
    if(this.state.reservation.fixedDiscount.onSale == true) {
      if(this.state.reservation.fixedDiscount.onSaleType == true) {
        fixedPrice = (parseFloat(this.state.reservation.fixedPrice) * (100 - parseFloat(this.state.reservation.fixedDiscount.onSaleValue)) / 100);
      } else {
        fixedPrice = (parseFloat(this.state.reservation.fixedPrice) - parseFloat(this.state.reservation.fixedDiscount.onSaleValue));
      }
    } else {
      fixedPrice = parseFloat(this.state.reservation.fixedPrice);
    }

    if((this.state.value[0] && this.state.value[1])) {
      const days = datediff(this.state.value[0], this.state.value[1])
      if(this.state.variableDiscount.onSale == true && days > parseInt(this.state.variableDiscount.days)) {
        let variableTotalPrice
        if(this.state.variableDiscount.onSaleType == true) {
          variableTotalPrice = (days * parseFloat(this.state.reservation.variablePrice)) * (100 - parseFloat(this.state.variableDiscount.onSaleValue)) / 100;
        } else {
          variableTotalPrice = (days * parseFloat(this.state.reservation.variablePrice)) - parseFloat(this.state.variableDiscount.onSaleValue);
        }
        return fixedPrice + variableTotalPrice;
      } else {
        return fixedPrice + (days * parseFloat(this.state.reservation.variablePrice));
      }
    } else {
      return 0.0;
    }
  }

  handleClose() {
    this.setState({
      showEditModal: false
    });
  }
  
  handleShow() {
    this.setState({
      showEditModal: true
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
    this.setState({
      loading: true,
      showLoadingModal: true
    });
    this.handleClose();

    // Modifica della prenotazione
    ApiCall.postReservation(this.state.reservation._id, {
      bookingDate: convertDateToObject(new Date()),
      startDate: convertDateToObject(this.state.value[0]),
      endDate: convertDateToObject(this.state.value[1]),
      price: this.priceCalculator()
    }).then(() => {
      // Aggiornamento delle prenotazioni del prodotto
      let bookings = this.state.bookings;
      bookings = bookings.filter((e) => {
        if(e.reservationId == this.state.reservation._id) {
          e.startDate =  convertDateToObject(this.state.value[0]);
          e.endDate = convertDateToObject(this.state.value[1]);
          e.total = this.priceCalculator()
        }
        return true;
      });
      ApiCall.postProduct(this.state.reservation.productId, {
        bookings: bookings
      }).then(() => {
        this.setState({
          loading: false,
        });
      }).catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
    });
  }

  deleteReservation() {
    this.setState({
      isEditing: false,
      loading: true,
      showLoadingModal: true
    });
    this.handleClose();
    
    ApiCall.deleteReservation(String(this.state.reservation._id)).then(() => {
      let bookings = this.state.bookings;
      bookings = bookings.filter((e) => {
        if(e.reservationId == this.state.reservation._id) {
          return false
        } else {
          return true;
        }
      });
      ApiCall.postProduct(this.state.reservation.productId, {
        bookings: bookings
      }).then(() => {
        this.setState({
          loading: false,
        });
      }).catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
    });
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
    let finalFixedPrice;
    if(this.state.reservation.fixedDiscount.onSale == true) {
      if(this.state.reservation.fixedDiscount.onSaleType == true) {
        finalFixedPrice = parseFloat(this.state.reservation.fixedPrice) * (100 - parseFloat(this.state.reservation.fixedDiscount.onSaleValue)) / 100;
      } else {
        finalFixedPrice = parseFloat(this.state.reservation.fixedPrice) - parseFloat(this.state.reservation.fixedDiscount.onSaleValue);
      }
    } else {
      finalFixedPrice = parseFloat(this.state.reservation.fixedPrice);
    }

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
        show={this.state.showEditModal}
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
                Prezzo fisso:
              </div>
              <div className='col-4 text-end'>
                {(finalFixedPrice).toFixed(2)} €
              </div>
            </div>
            <div className='row'>
              <div className='col-8'>
                Prezzo giornaliero:
              </div>
              <div className='col-4 text-end'>
                {parseFloat(this.state.reservation.variablePrice).toFixed(2)} €
              </div>
            </div>
            {this.state.variableDiscount.onSale ? (
              <div className='row'>
                <div className='col-12' style={{textAlign: 'justify'}}>
                  Sconto {this.state.variableDiscount.onSaleType ? 'del ' : 'di '}
                  {parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2)}
                  {this.state.variableDiscount.onSaleType ? '% ' : '€ '}
                  sul costo giornaliero se superi {this.state.variableDiscount.days} {parseInt(this.state.variableDiscount.days) > 1 ? 'giorni ' : 'giorno '} 
                  di noleggio.
                </div>
              </div>
            ) : <></>}
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
                {this.priceCalculator().toFixed(2)} €
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
        <Modal
        show={this.state.showLoadingModal}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        centered>
          <Modal.Body>
            {this.state.loading ? (
              <div
              className='d-flex align-items-center'>
                Effetuo la {this.state.isEditing ? 'prenotazione.' : 'cancellazione.'}&nbsp;
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
              this.state.error ? (
                <>
                  Errore durante la {this.state.isEditing ? 'prenotazione.' : 'cancellazione.'} 
                </>
              ) : (
                <>
                  {this.state.isEditing ? 'Prenotazione modificata.' : 'Cancellazione effettuata.'}
                </>
              )              
            )}
          </Modal.Body>
          <Modal.Footer>
          <Button
          variant="secondary"
          onClick={() => {
            this.setState({ showLoadingModal: false })
            window.location.reload(false);
          }}
          disabled={this.state.loading}>
            Chiudi
          </Button>
        </Modal.Footer>
        </Modal>
      </>
    );
  }
}