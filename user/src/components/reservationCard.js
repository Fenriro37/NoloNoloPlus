import React from 'react';

import { Accordion, Button, Modal } from 'react-bootstrap';

export class ReservationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: props.reservation,
      isAuthenticated: props.isAuthenticated,
      show: false
      // discountedPrice: props.product.discount.onSaleType
      //   ? (props.product.price * (100 - props.product.discount.onSaleValue) / 100).toFixed(2)
      //   : (props.product.price - props.product.discount.onSaleValue).toFixed(2)
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
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
            {/* ID prenotazione */}
            <div>
              Identificativo della prenotazione:
              <br/>
              <b>{this.state.reservation._id}</b>
              <hr/>
            </div>
            {/* Dati prenotazione */}
            <div>
              <div className='row d-flex justify-content-between'>
                <div className='col-8'>
                  Data prenotazione:
                </div>
                <div className='col-4'>
                  {this.state.reservation.bookingDate.day}/
                  {this.state.reservation.bookingDate.month}/
                  {this.state.reservation.bookingDate.year}
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                Data di inizio noleggio:
                </div>
                <div className='col-4'>
                  {this.state.reservation.startDate.day}/
                  {this.state.reservation.startDate.month}/
                  {this.state.reservation.startDate.year}
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  Data di fine noleggio:
                </div>
                <div className='col-4'>
                  {this.state.reservation.endDate.day}/
                  {this.state.reservation.endDate.month}/
                  {this.state.reservation.endDate.year}  
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  Prezzo totale:
                </div>
                <div className='col-4'>
                  {this.state.reservation.price} €
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  Note del cliente:
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  {this.state.reservation.description}
                </div>
              </div>
            </div>
            {/* Aggiornamento prenotazione */}

            <Button
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
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
              </Modal.Body>
              <Modal.Footer>
                <Button
                variant="secondary"
                onClick={this.handleClose}>
                  Close
                </Button>
                <Button
                variant="primary">
                  Understood
                </Button>
              </Modal.Footer>
            </Modal>

            {/* <div className='mb-2'><b>Prenotazione:</b></div>
            {this.state.product.available ? (
              <MakeReservation
                bookings={this.state.product.bookings}
                finalPrice={this.state.product.discount.onSale ? this.state.discountedPrice : this.state.product.price}
                isAuthenticated={this.state.isAuthenticated}
                product={this.state.product}/>
              ) : (
              <Button
              disabled={true}
              className='w-100'>
                Prodotto non disponibile
              </Button>
            )} */}

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}