import React from 'react';

import { Button, Nav, Navbar } from 'react-bootstrap';

import { Reservation } from './reservation';
import { Stars } from './stars';
import { Tags } from './tags';

export class Card extends React.Component {
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
      <div
      className='m-2 bg-light rounded-3 border border-dark'>
        <Navbar
        bg='trasparent'
        expand='false'>
          <Navbar.Toggle
          aria-controls='navbarScroll'
          className='border-0 w-100'
          style={{ height: '15vh'}}>
            <div
            className='row m-0 h-100'>
              <div
              className='col-5 p-0 d-flex align-items-center align-self-center h-100'>
                <img
                  className='img-fluid img-responsive mx-auto d-block'
                  style={{
                    maxHeight: '100%',
                    maxWidth: '35vw'
                  }}
                  src={this.state.product.image}
                  alt='Immagine'/>
              </div>
              <div
              className='col-7 bg-trasparent align-self-center'
              style={{ paddingRight: '0' }}>
                <div
                className='text-truncate'>
                  {this.state.product.title}
                </div>
                <div>
                  {this.state.product.brand}
                </div>
                {this.state.product.discount.onSale ? (
                <div>
                  <div
                  style={{ color: 'red' }}>
                    {this.state.discountedPrice} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
                  </div>
                  <div
                  style={{ textDecorationLine: 'line-through', fontSize: '0.75em' }}>
                    {this.state.product.price} €
                  </div>
                </div>
                ) : (
                <div>
                  {this.state.product.price} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
                </div>  
                )}
              </div>
            </div>
          </Navbar.Toggle>
          <Navbar.Collapse
          id='navbarScroll'>
            <Nav
            className='me-auto p-2 pb-0'
            navbarScroll>
              <Tags
              tags={this.state.product.tags}/>
              <div
              style={{ textAlign: 'justify' }}>
                {this.state.product.description}
              </div>
              <Stars
              quality={this.state.product.quality}/>
              {this.state.product.available ? (
              <Reservation
                bookings={this.state.product.bookings}
                finalPrice={this.state.product.discount.onSale ? this.state.discountedPrice : this.state.product.price}
                isAuthenticated={this.state.isAuthenticated}
                product={this.state.product}/>
              ) : (
              <Button
              disabled={true}>
                Prodotto non disponibile
              </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}