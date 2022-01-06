import React from 'react';

import Cookie from 'js-cookie';

import ApiCall from '../services/apiCall';
import { List } from './list';
import { Header } from './header';

export class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      isAuthenticated: false
    }
    this.searchProducts = this.searchProducts.bind(this);
    this.showProducts = this.showProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  // Functions called by header, rendered by List

  searchProducts(filter) {
    console.log('searchProducts(' + filter + ')');
    ApiCall.getAllProduct(filter, true).then((result) => {
      this.setState({
        products: result.data.data,
        filteredProducts: result.data.data
      });
    });
  }

  showProducts(type) {
    // type == 1: all products
    // type == 2: available
    // type == 3: unavailable
    console.log('showProducts(' + type + ')');
    let products = [];
    if(type > 1) {
      let isAvailable = type == 2 ? true : false
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
    console.log('sortProducts(' + isIncreasing + ')');
    let products = this.state.products;
    products.sort((a, b) => {
      return a.price - b.price;
    });
    if(isIncreasing == false) {
      products.reverse();
    }
    this.setState({
      products: products,
      filteredProducts: products
    });
  }
  
  componentDidMount() {
    this.searchProducts('');
    if(Cookie.get('jwt')) {
      ApiCall.getUser().then(() => {
        this.setState({
          isAuthenticated: true
        });
      }).catch(() => {
        this.setState({
          isAuthenticated: false
        });
      });
    }
  }

  render() {
    return (
      <>
        <Header
        type='product'
        search={this.searchProducts}
        show={this.showProducts}
        sort={this.sortProducts}
        isAuthenticated={this.state.isAuthenticated}/>
        <List
        type='product'
        elements={this.state.filteredProducts}
        isAuthenticated={this.state.isAuthenticated}/>
      </>
    );
  }
}