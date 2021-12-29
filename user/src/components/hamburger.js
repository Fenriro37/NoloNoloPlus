import React from 'react';

import Cookie from 'js-cookie';
import { Nav, Form, FormControl } from 'react-bootstrap';

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
    window.location.href='/user/index.html';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      isAuthenticated: nextProps.isAuthenticated
    });
  }

  render() {
    if(this.state.isAuthenticated == true) {
      return (
        <Nav
        className='text-center d-flex align-items-center'
        navbarScroll>
          <Nav.Link>
            <Form
            className='element-to-hide-over-350'
            onSubmit={(e) => {
              e.preventDefault();
              this.props.search(e.target.searchInput.value);
            }}>
              <FormControl
                type='search'
                placeholder='Cerca'
                name='searchInput'
                className='me-2'
                aria-label='Cerca'
              />
            </Form>
          </Nav.Link>
          <Nav.Link
          href='#action1'>
            Pagina personale
          </Nav.Link>
          <Nav.Link
          href='#action2'>
            Prenotazioni effettuate
          </Nav.Link>
          <Nav.Link
          onClick={this.logout}>
            Logout
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav
        className='me-auto my-2 my-lg-0 text-center  align-items-center'
        navbarScroll>
          <Nav.Link
          className='w-100'>
            <Form
              className='element-to-hide-over-350'
              onSubmit={(e) => {
                e.preventDefault();
                this.props.search(e.target.searchInput.value);
              }}>
              <FormControl
                type='search'
                placeholder='Cerca'
                name='searchInput'
                className='me-2'
                aria-label='Cerca'/>
            </Form>
          </Nav.Link>
          <Nav.Link
          href='/public/login.html'>
            login
          </Nav.Link>
        </Nav>
      );
    }
  }
}