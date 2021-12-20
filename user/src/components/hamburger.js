import React from 'react';
import ApiCall from '../services/apiCall';
import Cookie from 'js-cookie';
import { Nav } from 'react-bootstrap';

export class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    Cookie.remove('jwt');
    window.location.href="http://localhost:8081/user/index.html";
  }

  componentDidMount() {
    if(Cookie.get('jwt')) {
      ApiCall.getUser()
      .then(() => {
        this.setState({
          isAuthenticated: true
        });
      })
      .catch(() => {
        this.setState({
          isAuthenticated: false
        });
      });
    }
  }

  render() {
    if(this.state.isAuthenticated === true) {
      return (
        <div className="text-center">
          <Nav.Link href="#action1">Pagina personale</Nav.Link>
          <Nav.Link href="#action2">Prenotazioni effettuate</Nav.Link>
          <Nav.Link onClick={this.logout}>Logout</Nav.Link>
        </div>
      )
    } else {
      return (
        <div className="text-center">
          <Nav.Link href="http://localhost:8081/public/login.html">Login</Nav.Link>
        </div>
      )
    }
  }
}