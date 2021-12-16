import React from 'react'
import { Header } from './header'
import { List } from './list'
import ApiCall from '../services/apiCall';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  search(filter) {
    ApiCall.getAllProduct(filter, true)
  }

  componentDidMount() {
    ApiCall.getAllProduct('', true).then((result) => {
      this.setState({
        products: result.data.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header function={search}/>
        <List products={this.state.products}/>
      </div>
    )
  }
}