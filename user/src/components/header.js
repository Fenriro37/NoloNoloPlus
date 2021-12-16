import React from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import ApiCall from '../services/apiCall';
import Cookie from 'js-cookie';

function logout() {
  Cookie.remove('jwt');
  window.location.href="http://localhost:8081/user/index.html";
}

function GetHamburger(props) {
  if(props.isAuthenticated === true) {
    return (
      <span>
        <Nav.Link href="#action1">Pagina personale</Nav.Link>
        <Nav.Link href="#action2">Prenotazioni effettuate</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </span>
    )
  } else {
    return (
      <div>
        <Nav.Link href="http://localhost:8081/public/login.html">Login</Nav.Link>
      </div>
    )
  }
}

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
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
    return(
      <Navbar bg="light" expand='false'>
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src='https://cdn.discordapp.com/attachments/918079016651604009/918082983964061726/CAtena_montuosa.png'
              alt='logo'
              height='35'
            />
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              // onClick={}
            />
          </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                navbarScroll
            >
            <GetHamburger isAuthenticated={this.state.isAuthenticated}/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

}