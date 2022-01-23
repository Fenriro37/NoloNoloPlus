import React from "react"

import Cookie from 'js-cookie';

import ApiCall from "../services/apiCall";
import { Header } from "./header";
import { List } from "./list";

export class Reservation extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      filteredReservations: [],
      isAuthenticated: false
    }
    this.searchReservations = this.searchReservations.bind(this);
    this.showReservations = this.showReservations.bind(this);
    this.sortReservations = this.sortReservations.bind(this);
  }

  // Functions called by header, rendered by List

  searchReservations(filter) {
    console.log('searchReservations(' + filter + ')');
    ApiCall.getAllReservation(filter, true).then((result) => {
      this.setState({
        reservations: result.data.obj,
        filteredReservations: result.data.obj
      });
    });
  }

  showReservations(type) {
    // type == 1: all products
    // type == 2: not started
    // type == 3: active
    // type == 4: closed
    console.log('showReservations(' + type + ')');
    let reservations = [];
    if(parseInt(type) > 1) {
      for(let index in this.state.reservations) {
        switch(parseInt(type)) {
          case 2:
            if(this.state.reservations[index].isTaken == false && this.state.reservations[index].isReturned == false) {
              reservations.push(this.state.reservations[index]);
            }
            break;
          case 3:
            if(this.state.reservations[index].isTaken == true && this.state.reservations[index].isReturned == false) {
              reservations.push(this.state.reservations[index]);
            }
            break;
          case 4:
            if(this.state.reservations[index].isTaken == true && this.state.reservations[index].isReturned == true) {
              reservations.push(this.state.reservations[index]);
            }
            break;
          default:
            return
        }
      }
    } else {
      reservations = this.state.reservations;
    }
    this.setState({
      filteredReservations: reservations
    });
  }

  sortReservations(isIncreasing) {
    console.log('sortReservations(' + isIncreasing + ')');
    let reservations = this.state.reservations;
    reservations.sort((a, b) => {
      return new Date(a.bookingDate.year, a.bookingDate.month, a.bookingDate.day,) - new Date(b.bookingDate.year, b.bookingDate.month, b.bookingDate.day);
    });
    if(isIncreasing == false) {
      reservations.reverse();
    }
    this.setState({
      reservations: reservations,
      filteredReservation: reservations
    });
  }

  componentDidMount() {
    this.searchReservations('');
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
        type='reservation'
        search={this.searchReservations}
        show={this.showReservations}
        sort={this.sortReservations}
        isAuthenticated={this.state.isAuthenticated}/>
        <List
        type='reservation'
        elements={this.state.filteredReservations}
        isAuthenticated={this.state.isAuthenticated}/>
      </>
		);
	}
}