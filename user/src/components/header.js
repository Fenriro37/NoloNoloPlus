import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Dropdown } from 'react-bootstrap';
import { Hamburger } from './hamburger';
import { Filters } from './filters';

export class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Navbar bg="light" expand='false'>
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                src='https://cdn.discordapp.com/attachments/918079016651604009/918082983964061726/CAtena_montuosa.png'
                alt='logo'
                height='35'
              />
            </Navbar.Brand>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                this.props.search(e.target.searchInput.value);
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                name="searchInput"
                className="me-2"
                aria-label="Search"

              />
            </Form>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                  className="me-auto my-2 my-lg-0"
                  navbarScroll
              >
              <Hamburger/>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Filters
          showOnlyAvailable={this.props.showOnlyAvailable}
          sort={this.props.sort}
        />
      </div>
    )
  }
}