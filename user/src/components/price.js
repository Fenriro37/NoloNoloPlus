import React from 'react';

export class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPrice: parseFloat(this.props.originalPrice),
      discountedPrice: parseFloat(this.props.discountedPrice)
    }
  }

  render() {
    console.log(this.state.originalPrice)
    console.log(this.state.discountedPrice)
    if(this.state.originalPrice != this.state.discountedPrice) {
      return (
        <div>
          <span style={{ textDecorationLine: 'line-through'}}>
            <b>Prezzo: </b> {this.state.originalPrice} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
          </span>
          <br/>
          <span style={{ color: 'red' }}>
            <b>Prezzo scontato: </b> {this.state.discountedPrice} € <span style={{ fontSize: '0.75em' }}>al giorno</span>  
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <b>Prezzo: </b> {this.state.originalPrice} € <span style={{ fontSize: '0.75em' }}>al giorno</span>
        </div>
      );
    }
    
  }
}