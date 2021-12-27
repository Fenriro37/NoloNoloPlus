import React from 'react';
import Cookie from 'js-cookie';
import { Nav } from 'react-bootstrap';
import config from './../config'

export class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.isAuthenticated
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    Cookie.remove('jwt');
    window.location.href=config.site202131Url + '/user/index.html';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAuthenticated: nextProps.isAuthenticated });  
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
          <Nav.Link href={config.site202131Url + '/public/login.html'}>Login</Nav.Link>
        </div>
      )
    }
  }
}