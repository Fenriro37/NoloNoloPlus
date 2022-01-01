import React from 'react';

import { Button, Nav, Navbar, Accordion, Card } from 'react-bootstrap';

import { Reservation } from './reservation';
import { Stars } from './stars';
import { Tags } from './tags';
import { Price } from './price';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      isAuthenticated: props.isAuthenticated,
      discountedPrice: props.product.discount.onSaleType
        ? (props.product.price * (100 - props.product.discount.onSaleValue) / 100).toFixed(2)
        : (props.product.price - props.product.discount.onSaleValue).toFixed(2)
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
            discountedPrice={this.state.discountedPrice}
            originalPrice={this.state.product.price}/>
            <hr/>
            <div className='mb-2'><b>Prenotazione:</b></div>
            {this.state.product.available ? (
              <Reservation
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
            )}

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}