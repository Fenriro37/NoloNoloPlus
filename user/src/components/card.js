import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { DateRangePicker } from './daterangepicker';
import { Stars } from './stars';
import { Tags } from './tags';
import { Button } from 'react-bootstrap';

export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      discountedPrice: props.product.discount.onSaleType
      ? (props.product.price * (100 - props.product.discount.onSaleValue) / 100).toFixed(2)
      : (props.product.price - props.product.discount.onSaleValue).toFixed(2),
      isAuthenticated: props.isAuthenticated
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAuthenticated: nextProps.isAuthenticated });  
  }

  render() {
    return (
      <div className='m-2 bg-light rounded-3 border border-dark'>
        <Navbar bg="trasparent" expand='false'>
            <Navbar.Toggle aria-controls="navbarScroll" className="border-0 w-100">
              <div className='row m-0 h-100'>
                <div className='col-5 p-0 d-flex align-items-center'>
                  <img
                    className='img-fluid img-responsive align-self-center'
                    src={this.state.product.image}
                    alt='Immagine'
                    max-width='100%'
                    max-height='100%'
                  />
                </div>
                <div className='col-7 bg-trasparent align-self-center' style={{ paddingRight: '0' }}>
                  <div className='text-truncate'>
                    {this.state.product.title}
                  </div>
                  <div>
                    {this.state.product.brand}
                  </div>
                  {this.state.product.discount.onSale
                  ? (
                    <div>
                      <div style={{ color: 'red' }}>
                        {this.state.discountedPrice} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
                      </div>
                      <div style={{ textDecorationLine: 'line-through', fontSize: '0.75em' }}>
                        {this.state.product.price} €
                      </div>  
                    </div> 
                  )
                  : (
                    <div>
                      {this.state.product.price} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
                    </div>  
                  )
                }
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto p-2 pb-0" navbarScroll>
                <Tags tags={this.state.product.tags}/>
                <div style={{"text-align": "justify"}}>
                  {this.state.product.description}
                </div>
                <Stars quality={this.state.product.quality}/>
                {
                  this.state.product.available ? (
                    <DateRangePicker
                      bookings={this.state.product.bookings}
                      finalPrice={this.state.product.discount.onSale ? this.state.discountedPrice : this.state.product.price}
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  ) : (
                    <Button disabled={true}>Prodotto non disponibile</Button>
                  )
                }
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}