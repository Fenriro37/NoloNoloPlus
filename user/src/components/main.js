import React from 'react'
import { Header } from './header'
import { List } from './list'
import ApiCall from '../services/apiCall';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: []
    }
    this.searchProducts = this.searchProducts.bind(this);
    this.showOnlyAvailableProducts = this.showOnlyAvailableProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  searchProducts(filter) {
    console.log("searchProducts(" + filter + ")");
    ApiCall.getAllProduct(filter, true).then((result) => {
      this.setState({
        products: result.data.data,
        filteredProducts: result.data.data
      });
    });
  }

  showOnlyAvailableProducts(isAvailable) {
    console.log("showOnlyAvailableProducts(" + isAvailable + ")");
    let products = [];
    if(isAvailable == true) {
      for(let index in this.state.products) {
        if(this.state.products[index].available == isAvailable) {
          products.push(this.state.products[index]);
        }
      }
    } else {
      products = this.state.products;
    }
    this.setState({
      filteredProducts: products
    });
  }

  sortProducts(isIncreasing) {
    console.log("sortProducts(" + isIncreasing + ")");
    let products = this.state.products;
    products.sort(function(a, b) { return a.price - b.price})
    if(isIncreasing == false) {
      products.reverse();
    }
    console.log(products);
    this.setState({
      products: products,
      filteredProducts: products
    });
  }
  
  componentDidMount() {
    ApiCall.getAllProduct('', true).then((result) => {
      this.setState({
        products: result.data.data,
        filteredProducts: result.data.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header
          search={this.searchProducts}
          showOnlyAvailable={this.showOnlyAvailableProducts}
          sort={this.sortProducts}
        />
        <List products={this.state.filteredProducts}/>
      </div>
    )
  }
}