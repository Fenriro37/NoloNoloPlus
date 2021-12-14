import React from 'react'
import { Card } from './card.js'
import ApiCall from '../services/apiCall.js'

export class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    ApiCall.getAllProduct('', true).then((result) => {
      this.setState({
        products: result.data.data
      });
    });
  }
  
  render() {
    if(this.state.products.length === 0) {
      return <div/>;
    } else {
      const lista = this.state.products.map((product) => {
        return (
          <Card
            key={product._id}
            title={product.title}
            brand={product.brand}
            price={product.price}
            image={product.image}
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