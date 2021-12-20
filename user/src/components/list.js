import React from 'react'
import { Card } from './card.js'

export class List extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if(this.props.products.length === 0) {
      return <div/>;
    } else {
      const lista = this.props.products.map((product) => {
        return (
          <Card
            key={product._id}
            product={product}
          />
        );
      });
      return (
        <div>
          {lista}
        </div>
      );
    }
  }
}