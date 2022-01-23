import React from 'react'

import { ProductCard } from './productCard'
import { ReservationCard } from './reservationCard'

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.isAuthenticated
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });  
  }

  render() {
    if(this.props.elements.length == 0) {
      return (
        <div
        style={{height: '75vh'}}
        className='d-flex justify-content-center align-items-center'>
          Non ci sono contenuti
        </div>
      );
    } else {
      if(this.props.type == 'product') {
        const lista = this.props.elements.map((element) => {
          return (
            <ProductCard
            key={element._id}
            product={element}
            isAuthenticated={this.state.isAuthenticated}/>
          );
        });
        return (
          <div
          id='body'>
            {lista}
          </div>
        );
      } else if(this.props.type == 'reservation') {
        const lista = this.props.elements.map((element) => {
          return (
            <ReservationCard
            key={element._id}
            reservation={element}/>
          );
        });
        return (
          <div
          id='body'>
            {lista}
          </div>
        );
      } 
    }
  }
}