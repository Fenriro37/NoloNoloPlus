import React from 'react';

import { Button, Modal } from 'react-bootstrap';

export class UpdateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
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
          <Modal.Body>
          ciao
          {/* {this.state.product.available ? (
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


      </>
    );
  }
}