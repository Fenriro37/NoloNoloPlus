import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import DateRangePicker from './daterangepicker'
import { Stars } from './stars';
import { Tags } from './tags';

export function Card(props) {
  return (
    <div className='m-2 bg-light rounded-3 border border-dark'>
      <Navbar bg="trasparent" expand='false'>
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 w-100">
            <div className='row m-0'>
              <div className='col-5'>
                <img
                  src={props.product.image}
                  alt='Immagine'
                  height='100'
                  width='100'
                />
              </div>
              <div className='col-7 bg-trasparent align-self-center'>
                <div className='text-truncate'>
                  {props.product.title}
                </div>
                <div>
                  {props.product.brand}
                </div>
                <div>
                  {props.product.price} euro al giorno
                </div>
              </div>
            </div>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto p-2 pb-0" navbarScroll>
              <Tags tags={props.product.tags}/>
              <div>{props.product.description}</div>
              <Stars quality={props.product.quality}/>
              <DateRangePicker/>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
    
    
  )
}