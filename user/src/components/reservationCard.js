import React from 'react';

import { Accordion, Button } from 'react-bootstrap';
import ApiCall from '../services/apiCall';
import { Invoice } from './invoice';
import { UpdateReservation } from './updateReservation';

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
    if(this.state.reservation.isTaken == false && this.state.reservation.isReturned == false) {
      status = 'Prenotato';
    } else if(this.state.reservation.isTaken == true && this.state.reservation.isReturned == false) {
      status = 'Attivo';
    } else if(this.state.reservation.isTaken == true && this.state.reservation.isReturned == true) {
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
                alt='Immagine'/>
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
            <div>
              Identificativo della prenotazione:
              <br/>
              <b>{this.state.reservation._id}</b>
            </div>
            <hr/>
            {/* Dati secondari prenotazione */}
            <div>
              <div className='row d-flex justify-content-between'>
                <div className='col-8'>
                  <b>Data prenotazione:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.bookingDate.day}/
                  {this.state.reservation.bookingDate.month}/
                  {this.state.reservation.bookingDate.year}
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  <b>Status:</b>
                </div>
                <div className='col-4 text-end'>
                  <b>{this.state.status}</b>
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                <b>Data di inizio noleggio:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.startDate.day}/
                  {this.state.reservation.startDate.month}/
                  {this.state.reservation.startDate.year}
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                <b>Data di fine noleggio:</b>
                </div>
                <div className='col-4 text-end'>
                  {this.state.reservation.endDate.day}/
                  {this.state.reservation.endDate.month}/
                  {this.state.reservation.endDate.year}  
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                <b>Prezzo totale:</b>
                </div>
                <div className='col-4 text-end'>
                  {parseFloat(this.state.reservation.price).toFixed(2)} €
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                <b>Dettagli:</b>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  {this.state.reservation.description}
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
                <Invoice/>
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}