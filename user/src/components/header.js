import React from 'react';

import { Navbar, Container, Form, FormControl } from 'react-bootstrap';

import { Hamburger } from './hamburger';
import { Filters } from './filters';

export class Header extends React.Component {

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
    return (
      <div>
        <Navbar
        className='bg-light w-100'
        expand='false'>
          <Container
          fluid>
            <Navbar.Brand
            href='/user/index.html'
            className='p-0 m-0'>
              <img
                src='https://cdn.discordapp.com/attachments/888778821262790686/926860373775249469/nolonoloplus.png'
                alt='logo NoloNoloPlus'
                height='45px'/>
            </Navbar.Brand>
            <Form
              className='element-to-hide-under-350'
              style={{ width: '60%' }}
              onSubmit={(e) => {
                e.preventDefault();
                this.props.search(e.target.searchInput.value);
              }}>
              <FormControl
                type='search'
                placeholder='Cerca... '
                name='searchInput'
                className='me-2'
                aria-label='Cerca prodotti'/>
            </Form>
            <Navbar.Toggle
            style={{
              height: '45px',
              width: '45px',
              padding: '0px'
            }}
            aria-controls='navbarScroll'/>
            <Navbar.Collapse
              id='navbarScroll'>
              <Hamburger
                isAuthenticated={this.state.isAuthenticated}/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Filters
          showOnlyAvailable={this.props.showOnlyAvailable}
          sort={this.props.sort}/>
      </div>
    );
  }
}