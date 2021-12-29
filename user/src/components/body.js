import React from 'react'

import { Card } from './card.js'

export class Body extends React.Component {
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
    if(this.props.products.length == 0) {
      return <div/>;
    } else {
      const lista = this.props.products.map((product) => {
        return (
          <Card
            key={product._id}
            product={product}
            isAuthenticated={this.state.isAuthenticated}
          />
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