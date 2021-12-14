import React from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import ApiCall from '../services/apiCall';
import Cookie from 'js-cookie';

function GetHamburger(props) {
  if(props.isAuthenticated === true) {
    return (
      <span>
        <Nav.Link href="#action1">Pagina personale</Nav.Link>
        <Nav.Link href="#action2">Prenotazioni effettaute</Nav.Link>
        <Nav.Link href="#action3">Logout</Nav.Link>
      </span>
    )
  } else {
    return (
      <div>
        <Nav.Link href="#action4">Login</Nav.Link>
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
    // START TEST
    // const email = 'han.chu@studio.unibo.it';
    // const password = '1234567890';
    // ApiCall.login(email, password)
    // .then((result) => {
    //   Cookie.set('jwt', result.data.data);
    //   this.setState({
    //     isAuthenticated: true
    //   });
    // })
    // .catch(() => {
    //   this.setState({
    //     isAuthenticated: false
    //   })
    // });
    // END TEST
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