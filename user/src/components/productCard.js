import React from 'react';

import { Button, Accordion } from 'react-bootstrap';

import { MakeReservation } from './makeReservation';
import { Stars } from './stars';
import { Tags } from './tags';
import { Price } from './price';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      isAuthenticated: props.isAuthenticated,      
      discountedFixedPrice: props.product.discount.onSale
        ? (
          props.product.discount.onSaleType
            ? (props.product.fixedPrice * parseFloat(100 - props.product.discount.onSaleValue) / 100).toFixed(2)
            : (props.product.fixedPrice - props.product.discount.onSaleValue).toFixed(2)
        ) : (
          props.product.fixedPrice
        )
    }
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
                src={this.state.product.image}
                alt='Immagine'/>
              </div>
              <div
              className='col-6 d-flex align-items-center'>
                <div>
                  <b>{this.state.product.title}</b>
                  <br/>
                  {this.state.product.brand}
                </div>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Tags tags={this.state.product.tags}/>
            <div
            style={{ textAlign: 'justify' }}>
              <b>Descrizione:</b>
              <br/>
              {this.state.product.description}
            </div>
            <Stars
            quality={this.state.product.quality}/>
            <Price
            originalFixedPrice={parseFloat(this.state.product.fixedPrice).toFixed(2)}
            discountedFixdedPrice={parseFloat(this.state.discountedFixedPrice).toFixed(2)}
            originalVariablePrice={parseFloat(this.state.product.price).toFixed(2)}
            variableDiscount={this.state.product.overDays}/>
            <hr/>
            <div className='mb-2'><b>Prenotazione:</b></div>
            {this.state.product.available ? (
              <MakeReservation
                bookings={this.state.product.bookings}
                finalFixedPrice={this.state.product.discount.onSale ? this.state.discountedFixedPrice : this.state.product.fixedPrice}
                originalVariablePrice={this.state.product.price}
                variableDiscount={this.state.product.overDays}
                isAuthenticated={this.state.isAuthenticated}
                product={this.state.product}/>
              ) : (
              <Button
              disabled={true}
              className='w-100'>
                Prodotto non disponibile
              </Button>
            )}

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}