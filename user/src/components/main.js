import React from 'react';

import Cookie from 'js-cookie';

import ApiCall from '../services/apiCall';
import { Body } from './body';
import { Header } from './header';

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      isAuthenticated: false
    }
    this.searchProducts = this.searchProducts.bind(this);
    this.showOnlyAvailableProducts = this.showOnlyAvailableProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  // Functions called by header, rendered by body

  searchProducts(filter) {
    console.log('searchProducts(' + filter + ')');
    ApiCall.getAllProduct(filter, true).then((result) => {
      this.setState({
        products: result.data.data,
        filteredProducts: result.data.data
      });
    });
  }

  showOnlyAvailableProducts(isAvailable) {
    console.log('showOnlyAvailableProducts(' + isAvailable + ')');
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
    ApiCall.getAllProduct('', true).then((result) => {
      this.setState({
        products: result.data.data,
        filteredProducts: result.data.data
      });
    });
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
      <div>
        <Header
        search={this.searchProducts}
        showOnlyAvailable={this.showOnlyAvailableProducts}
        sort={this.sortProducts}
        isAuthenticated={this.state.isAuthenticated}
        />
        <Body
        products={this.state.filteredProducts}
        isAuthenticated={this.state.isAuthenticated}
        />
      </div>
    );
  }
}