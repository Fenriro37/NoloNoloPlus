import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Reservation from "./components/Reservation";
import User from "./components/User";
import "./css/App.css"

class App extends Component {  
  render() {
    return (
      <>
        <Navbar />
        <User user={this.props.user} />
      </>
    );
  }
}

//<Reservation prenotazione={this.props.prenotazione}/>

export default App;
