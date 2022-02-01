import React from 'react';

import { Accordion, Button } from 'react-bootstrap';
import ApiCall from '../services/apiCall';
import { convertDateToObject, datediff } from '../services/functions';
import { UpdateReservation } from './updateReservation';
import { Invoice } from './invoice';

export class ReservationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: props.reservation,
      bookings: [],
      show: false,
      status: ''
    }
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

  componentDidMount() {
    let status = ''
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);
    const endDate = new Date(this.state.reservation.endDate.year, this.state.reservation.endDate.month - 1, this.state.reservation.endDate.day);
    if(this.state.reservation.isTaken == false && this.state.reservation.isReturned == false) {
      status = 'Prenotato';
    } else if(this.state.reservation.isTaken == true && this.state.reservation.isReturned == false && today <= endDate) {
      status = 'Attivo';
    } else {
      status = 'Concluso';
    }
    this.setState({
      status: status
    });
    ApiCall.getProduct(this.state.reservation.productId).then((result) => {
      this.setState({
        bookings: result.data.data.obj.bookings
      });
    });
  }

  render() {
    let finalFixedPrice;
    let finalVariablePrice;
    if(this.state.reservation.fixedDiscount.onSale == true) {
      if(this.state.reservation.fixedDiscount.onSaleType == true) {
        finalFixedPrice = parseFloat(this.state.reservation.fixedPrice) * (100 - parseFloat(this.state.reservation.fixedDiscount.onSaleValue)) / 100;
      } else {
        finalFixedPrice = parseFloat(this.state.reservation.fixedPrice) - parseFloat(this.state.reservation.fixedDiscount.onSaleValue);
      }
    } else {
      finalFixedPrice = parseFloat(this.state.reservation.fixedPrice);
    }

    const days = datediff(
      new Date(this.state.reservation.startDate.year, this.state.reservation.startDate.month, this.state.reservation.startDate.day),
      new Date(this.state.reservation.endDate.year, this.state.reservation.endDate.month, this.state.reservation.endDate.day));
    if(this.state.reservation.variableDiscount.onSale == true && days > parseInt(this.state.reservation.variableDiscount.days)) {
      if(this.state.reservation.variableDiscount.onSaleType == true) {
        finalVariablePrice = days * parseFloat(this.state.reservation.variablePrice) * (100 - parseFloat(this.state.reservation.variableDiscount.onSaleValue)) / 100;
      } else {
        finalVariablePrice = days * parseFloat(this.state.reservation.variablePrice) - parseFloat(this.state.reservation.variableDiscount.onSaleValue);
      }
    } else {
      finalVariablePrice = days * parseFloat(this.state.reservation.variablePrice);
    }

    return (
      <Accordion
      className='m-2 bg-light rounded-3 border border-dark'>
        <Accordion.Item
        eventKey='0'>
          <Accordion.Header>
            <div
            className='row'
            style={{ width: '95%', height: '12.5vh' }}>
              <div
              className='col-6 h-100 d-flex align-items-center'>
                <img
                className='img-fluid img-responsive mx-auto d-block'
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
                src={this.state.reservation.productImage}
                alt={'Immagine del prodotto ' + this.state.reservation.productTitle}/>
              </div>
              <div
              className='col-6 d-flex align-items-center'>
                <div>
                  <b>{this.state.reservation.productTitle}</b>
                  <br/>
                  {this.state.reservation.productBrand}
                  <br/>
                  <b>
                    {this.state.reservation.bookingDate.day}/
                    {this.state.reservation.bookingDate.month}/
                    {this.state.reservation.bookingDate.year}
                  </b>
                </div>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {/* Dati principali prenotazione */}
            <div tabIndex='0'>
              Identificativo della prenotazione:
              <br/>
              <b>{this.state.reservation._id}</b>
            </div>
            <hr/>
            {/* Dati secondari prenotazione */}
            <div>
              <div className='row d-flex justify-content-between' tabIndex='0'>
                <div className='col-8'>
                  <b>Data prenotazione:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.bookingDate.day}/
                  {this.state.reservation.bookingDate.month}/
                  {this.state.reservation.bookingDate.year}
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                  <b>Status:</b>
                </div>
                <div className='col-4 text-end'>
                  <b>{this.state.status}</b>
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                <b>Data di inizio noleggio:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.startDate.day}/
                  {this.state.reservation.startDate.month}/
                  {this.state.reservation.startDate.year}
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                <b>Data di fine noleggio:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.endDate.day}/
                  {this.state.reservation.endDate.month}/
                  {this.state.reservation.endDate.year}  
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                <b>Prezzo fisso:</b>
                </div>
                <div className='col-4 text-end'>
                  {parseFloat(finalFixedPrice).toFixed(2)} €
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                <b>Prezzo variabile:</b>
                </div>
                <div className='col-4 text-end'>
                  {parseFloat(finalVariablePrice).toFixed(2)} €
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-8'>
                <b>Prezzo totale:</b>
                </div>
                <div className='col-4 text-end'>
                  {parseFloat(this.state.reservation.totalPrice).toFixed(2)} €
                </div>
              </div>
              {
              new Date() > new Date(this.state.reservation.endDate.year, this.state.reservation.endDate.month - 1, this.state.reservation.endDate.day) && this.state.reservation.isReturned == false && this.state.reservation.isTaken == true ?
              (
                <div className='row' tabIndex='0'>
                  <div className='col-8'>
                    <b>Penale:</b>
                  </div>
                  <div className='col-4 text-end'>
                    {parseFloat(this.state.reservation.totalPrice * 0.1).toFixed(2)} €
                  </div>
                </div>
              ) : <></>
              }
              <div className='row' tabIndex='0'>
                <div className='col-12'>
                  <b>Dettagli:</b>
                </div>
              </div>
              <div className='row' tabIndex='0'>
                <div className='col-12'>
                  {this.state.reservation.description} <br/>
                  {
                    this.state.reservation.onSale ? (
                      'Sconto ' + (this.state.variableDiscount.onSaleType ? 'del ' : 'di ') + parseFloat(this.state.variableDiscount.onSaleValue).toFixed(2) + (this.state.variableDiscount.onSaleType ? '% ' : '€ ') + 'sul costo giornaliero se superi' + this.state.variableDiscount.days + (parseInt(this.state.variableDiscount.days) > 1 ? 'giorni ' : 'giorno ') + 'di noleggio.'
                    ) : ''
                  }
                </div>
              </div>
            </div>
            <hr/>
            {/* Aggiornamento prenotazione */}
            {this.state.status == 'Prenotato' ? (
              <UpdateReservation
              reservation={this.state.reservation}
              bookings={this.state.bookings}
              />
            ) : (
              this.state.status == 'Attivo' ? (
                <Button
                className='w-100'
                disabled>
                  Prenotazione attiva
                </Button>
              ) : (
                <Invoice
                reservation={this.state.reservation}/>
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}