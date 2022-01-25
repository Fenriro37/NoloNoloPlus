import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import apiCall from '../services/apiCall'
import functions from '../services/functions'
import {Header} from './header.js'

import {Container, Form, Button, Row, Col, Image} from 'react-bootstrap'
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';

export class User extends Component {
  constructor(props) {
    super(props);

    /* 1. Initialize Ref */
    this.textInput = React.createRef(); 

    this.state = {
      userId:"",
      userName:"",
      userSurname:"",
      userBirthday: {day:"",month:"",year:""},
      userPhoneNumber:"",
      userEmail:"",
      userAddress:{street:"",number:"",city:""},
      userPayment:{cardType:"",cardName:"",cardSurname:"",cardExpireYear:"",cardExpireMonth:"",cardCCV:""},
      userSex:"",

      boolModifying: false,
      yearList: [
        {key: 1, year: '2022'},
        {key: 2, year: '2023'}, 
        {key: 3, year: '2024'}, 
        {key: 4, year: '2025'}, 
        {key: 5, year: '2026'}
      ],
      monthList: [
        {key: 1, month: 'Gennaio'},
        {key: 2, month: 'Febbraio'},
        {key: 3, month: 'Marzo'},
        {key: 4, month: 'Aprile'},
        {key: 5, month: 'Maggio'},
        {key: 6, month: 'Giugno'},
        {key: 7, month: 'Luglio'},
        {key: 8, month: 'Agosto'},
        {key: 9, month: 'Settembre'},
        {key: 10, month: 'Ottobre'},
        {key: 11, month: 'Novembre'},
        {key: 12, month: 'Dicembre'}
      ],      
    }
    this.switchModifying = this.switchModifying.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    apiCall.getUser().then((result) => {
      this.setState({
        userId: result.data.data._id,
        userName: result.data.data.userName,
        userSurname: result.data.data.userSurname,
        userBirthday: {
          day: result.data.data.birthday.day,
          month: result.data.data.birthday.month,
          year: result.data.data.birthday.year
        },
        userPhoneNumber: result.data.data.phoneNumber,
        userEmail: result.data.data.email,
        userAddress: {
          street: result.data.data.address.addressStreet,
          number: result.data.data.address.addressNumber,
          city: result.data.data.address.addressCity
        },
        userPayment: {
          cardName: result.data.data.payment.cardName,
          cardSurname: result.data.data.payment.cardSurname,
          cardType: result.data.data.payment.cardType,
          cardExpireYear: result.data.data.payment.cardExpireMonth,
          cardExpireMonth: result.data.data.payment.cardExpireYear,
          cardCCV: result.data.data.payment.cardCCV
        },
        userSex: result.data.data.sex
      })
      console.log(this.state.boolModifying);
    })
  }

  switchModifying = () => {
    const boolModifying = !this.state.boolModifying;
    this.setState({boolModifying: boolModifying});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("inizio save: " + this.state.boolModifying);
    if (this.state.boolModifying) {
      //Controllo sulla pw
      //if (event.target[2].value == 'password'){
      //  alert('password troppo debole');
      //  return null;
      //}

      //Controllo Input non vuoti
      //for(var index in event.target){
      //  console.log(index);
      //  console.log(event.target[index]);
      //  if(event.target[index] == ''){
      //    alert('Non hai compilato tutti i campi.');
      //    return null;
      //  }
      //}
      
      //Post API
      //const query = {
      //  userName: event.target[0].value,
      //  userSurname: event.target[1].value,
      //}
//
      //console.log(query);

      //apiCall.postUser(null, query).then(() => {
      //    alert('success');
      //  }).catch(() => {
      //    alert('error');
      //  });
    }
    this.switchModifying();
    console.log("switch: " + this.state.boolModifying);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <>
      <Header type={"user"}/>
      <Container className="mb-2">
        <Row className="align-items-center">
          <Col xs={4}>
            <i className="bi bi-person-circle"  style={{fontSize:'4rem'}} alt="Bootstrap" role="img" aria-label="userIcon"></i>
          </Col>
          <Col xs={8} className="text-center">
            <h1>Personal Page</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={!this.state.boolModifying} >
            <Form.Group className="mb-2">
              <Form.Label>User Name:</Form.Label>
              <Form.Control type="text" name="name" placeholder={this.state.userName} aria-label="Username" aria-describedby="basic-addon1"/>
            </Form.Group>   

            <Form.Group className="mb-2">
              <Form.Label>User Surname:</Form.Label>
              <Form.Control type="text" name="surName" placeholder={this.state.userSurname} />
            </Form.Group>    

            <Form.Group className="mb-2">
              <Form.Label>User Password:</Form.Label>
              <Form.Control type="password" placeholder="password" />
            </Form.Group>

            <Form.Label>User Sex:</Form.Label>
            <Form.Select className="mb-2" 
            value={this.state.userSex}
            onChange={(event) => {console.log(event); this.setState({sex: event.target.value})} } 
            aria-label="Form Select Sex">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>

            <Form.Group as={Col} className="mb-2">
              <Form.Label>User Birthday:</Form.Label>
              <Form.Control type="date" 
              placeholder={new Date(this.state.userBirthday.year, this.state.userBirthday.month, this.state.userBirthday.day)} />
            </Form.Group>
            
            <Form.Group as={Col} className="mb-2">
              <Form.Label>Address City:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userAddress.city} />
            </Form.Group>
              
            <Row>
              <Form.Group as={Col} xs={8} className="mb-2">
                <Form.Label>Address Street:</Form.Label>
                <Form.Control type="text" placeholder={this.state.userAddress.street} />
              </Form.Group>

              <Form.Group as={Col} xs={4} className="mb-2">
                <Form.Label>Number:</Form.Label>
                <Form.Control type="text" placeholder={this.state.userAddress.number} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>User Phone Number:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userPhoneNumber} />
            </Form.Group>
            
            <Form.Group className="mb-2">
              <Form.Label>User Email:</Form.Label>
              <Form.Control type="email" placeholder={this.state.userEmail} />
            </Form.Group>
            
            <Form.Group className="mt-1 mb-2">
              <Form.Label>Card Name:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userPayment.cardName} />
            </Form.Group>
            
            <Form.Group className="mt-1 mb-2">
              <Form.Label>Card Surname:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userPayment.cardSurname} />
            </Form.Group>
            
            <Form.Group className="mt-1 mb-2">
              <Form.Label>Card Type:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userPayment.cardType} />
            </Form.Group>
            
            <Row>
              <Form.Label>Card Expiration:</Form.Label>
              <Col xs={8} className="mr-2">
                <Form.Select className="mb-2 mr-0" 
                onChange={(event) => {console.log(event); this.setState({cardExpireMonth: event.target.value})} } 
                aria-label="Select Card Expiration Month">
                  {this.state.monthList.map( month => (
                    <option key={month.key} value={month.key}>{month.month}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={4} className="ml-0">
                <Form.Select className="mb-2" 
                onChange={(event) => {console.log(event); this.setState({cardExpireYear: event.target.value})} }
                aria-label="Select Card Expiration Year">
                  {this.state.yearList.map( year => (
                    <option key={year.key} value={parseInt(year.key) + 2021}>{year.year}</option>
                  ))}
                </Form.Select>
              </Col>    
            </Row>
            
            <Form.Group className="mb-2">
              <Form.Label>Card CVV:</Form.Label>
              <Form.Control type="text" placeholder={this.state.userPayment.cardCCV} />
            </Form.Group>
          </fieldset>
          
          <Button type="submit" value="submit" variant={this.state.boolModifying ? "success" : "primary"}>
            {this.state.boolModifying ? "Salva" : "Modifica"}
          </Button>

        </form>
      </Container>
      </>
    );
  }
}