import React from 'react';

import { Button, Modal, Table } from 'react-bootstrap';
import { datediff } from '../services/functions';

export class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: props.reservation,
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
    const days = datediff(
      new Date(
        this.state.reservation.startDate.year,
        this.state.reservation.startDate.month - 1,
        this.state.reservation.startDate.day),
      new Date(
        this.state.reservation.endDate.year,
        this.state.reservation.endDate.month - 1,
        this.state.reservation.endDate.day)
    );
    const fixedPrice = (parseFloat(this.state.reservation.fixedPrice) / 122 * 100);
    const variablePrice = (parseFloat(this.state.reservation.variablePrice) / 122 * 100);
    const discountedFixedPrice = this.state.reservation.fixedDiscount.onSale
    ? (
      this.state.reservation.fixedDiscount.onSaleType
      ? (
        fixedPrice * (100 - parseFloat(this.state.reservation.fixedDiscount.onSaleValue)) / 100
      ) : (
        fixedPrice - (parseFloat(this.state.reservation.fixedDiscount.onSaleValue) / 122 * 100)
      )
    ) : (
      fixedPrice
    )
    const discountedVariablePrice = this.state.reservation.variableDiscount.onSale && days > parseFloat(this.state.reservation.variableDiscount.days)
    ? (
      this.state.reservation.variableDiscount.onSaleType
      ? (
        days * variablePrice * (100 - parseFloat(this.state.reservation.variableDiscount.onSaleValue)) / 100
      ) : (
        (days * parseFloat(this.state.reservation.variablePrice) - parseFloat(this.state.reservation.variableDiscount.onSaleValue)) / 122 * 100
      )
    ) : (
      variablePrice * days
    )
    var penale =
      (
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
        >
        new Date(
          this.state.reservation.endDate.year, 
          this.state.reservation.endDate.month - 1, 
          this.state.reservation.endDate.day
        )
        && this.state.reservation.isReturned == false
        && this.state.reservation.isTaken == true
      ) ? (
        this.state.reservation.totalPrice / 100 * 10
      ) : (
        0
      );

    return (
      <>
      <Button
      className='w-100'
      onClick={this.handleShow}>
        Richiedi fattura
      </Button>

      <Modal
      fullscreen='lg-down'
      size='xl'
      show={this.state.show}
      onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>Fattura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3 element-to-hide-over-768'>
            Se sei da un dispositivo mobile, gira il device per una migliore lettura.
          </div>
          <Table bordered responsive>
            <tbody>
              <tr>
                <td colSpan={3}>{this.state.reservation.clientName} {this.state.reservation.clientSurname} - {this.state.reservation.clientEmail}</td>
                <td colSpan={3}>NoloNoloPlus</td>
              </tr>
              <tr>
                <td colSpan={3}>Fattura: {this.state.reservation._id}</td>
                <td colSpan={3}>Data: {this.state.reservation.endDate.day}/{this.state.reservation.endDate.month}/{this.state.reservation.endDate.year}</td>
              </tr>
              <tr>
                <th className='text-center'>Descrizione</th>
                <th className='text-center'>QNT</th>
                <th className='text-center'>Prezzo</th>
                <th className='text-center'>Sconto</th>
                <th className='text-center'>IVA</th>
                <th className='text-center'>Imponibile</th>
              </tr>
              <tr>
                <td>{this.state.reservation.productTitle} {this.state.reservation.productBrand} (fisso)</td>
                <td className='text-end'>1</td>
                <td className='text-end'>{fixedPrice.toFixed(2)} €</td>
                <td className='text-end'>{this.state.reservation.fixedDiscount.onSale ? (this.state.reservation.fixedDiscount.onSaleType ? ((parseFloat(this.state.reservation.fixedDiscount.onSaleValue)).toFixed(2) + '%') : ((100 - discountedFixedPrice / fixedPrice * 100).toFixed(2) + '%')) : '0%'}</td>
                <td className='text-end'>22%</td>
                <td className='text-end'>{discountedFixedPrice.toFixed(2)} €</td>
              </tr>
              <tr>
                <td>{this.state.reservation.productTitle} {this.state.reservation.productBrand} (variabile)</td>
                <td className='text-end'>{days}</td>
                <td className='text-end'>{variablePrice.toFixed(2)} €</td>
                <td className='text-end'>{this.state.reservation.variableDiscount.onSale && days > this.state.reservation.variableDiscount.days ? (this.state.reservation.variableDiscount.onSaleType ? ((parseFloat(this.state.reservation.variableDiscount.onSaleValue)).toFixed(2) + '%') : ((100 - discountedVariablePrice / days / variablePrice * 100).toFixed(2) + '%')) : '0%'}</td>
                <td className='text-end'>22%</td>
                <td className='text-end'>{discountedVariablePrice.toFixed(2)} €</td>
              </tr>
              <tr>
                <td colSpan={5}>Totale imponibile</td>
                <td className='text-end'>{(discountedFixedPrice + discountedVariablePrice).toFixed(2)} €</td>
              </tr>
              <tr>
                <td colSpan={5}>IVA</td>
                <td className='text-end'>{((discountedFixedPrice + discountedVariablePrice + penale) * 0.22).toFixed(2)} €</td>
              </tr>
              {
                new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) > new Date(this.state.reservation.endDate.year, this.state.reservation.endDate.month - 1, this.state.reservation.endDate.day) && this.state.reservation.isReturned == false && this.state.reservation.isTaken == true ?
                (
                  <tr>
                    <td colSpan={5}>Penale</td>
                    <td className='text-end'>{penale.toFixed(2)} €</td>
                  </tr>
                ) : (
                  <></>
                )
              }
              <tr>
                <td colSpan={5}><b>Totale Fattura</b></td>
                <td className='text-end'>{((discountedFixedPrice + discountedVariablePrice) * 1.22 + penale).toFixed(2)} €</td>
              </tr>
              <tr>
                <td>Dettagli:</td>
                <td colSpan={5}>{this.state.reservation.description}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer
        className='d-flex justify-content-start'>
          <Button 
          variant="secondary" 
          onClick={this.handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}