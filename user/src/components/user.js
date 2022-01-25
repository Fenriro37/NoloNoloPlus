import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import apiCall from '../services/apiCall'
import functions, { convertDateToObject } from '../services/functions'
import {Header} from './header.js'

import {Container, Form, Button, Row, Col} from 'react-bootstrap'

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId:"",
      userName:"",
      userSurname:"",
      userBirthday: {day:"",month:"",year:""},
      userPhoneNumber:"",
      userEmail:"",
      userAddress:{street:"",number:"",city:""},
      userPayment:{cardType:"",cardName:"",cardSurname:"",cardExpireYear:"",cardExpireMonth:"",cardCVV:""},
      userSex:"",

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
      
      //Copy
      newSex: "",
      newCardType: "",
      newExprYear: "",
      newExprMonth: "",
      newBirthday: {year: "", month: "", day: ""},
      
      //Settings
      boolModifying: false,
      isAuth: false,
    }
    
    this.switchModifying = this.switchModifying.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    apiCall.getUser().then((result) => {
      this.setState({
        //Init
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
          cardExpireYear: result.data.data.payment.cardExpireYear,
          cardExpireMonth: result.data.data.payment.cardExpireMonth,
          cardCVV: result.data.data.payment.cardCVV
        },
        userSex: result.data.data.sex,

        //Copy
        newSex: result.data.data.sex,
        newCardType: result.data.data.payment.cardType,
        newExprYear: result.data.data.payment.cardExpireYear,
        newExprMonth: result.data.data.payment.cardExpireMonth,
        newBirthday: {year: result.data.data.birthday.year, month: result.data.data.birthday.month, day: result.data.data.birthday.day},

        //Settings
        isAuth: true
      })
    })
  }

  switchModifying = () => {
    const boolModifying = !this.state.boolModifying;
    this.setState({boolModifying: boolModifying});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var tmp = event.target.querySelectorAll('input');

    if (this.state.boolModifying) {
      // Preparo la query da inviare al server
      var query = {};
      // Preparo l'indirizzo e il pagamento (oggetto)
      var address = {
        addressCity: '',
        addressStreet: '',
        addressNumber: ''
      }
      var payment = {
        cardName: "",
        cardSurname: "",
        cardExpireYear: this.state.newExprYear,
        cardExpireMonth: this.state.newExprMonth,
        cardType: this.state.newCardType,
        cardCVV: ""
      }
      for (var i in tmp) {
        if(tmp[i].name == 'userAddressCity') {
          address.addressCity = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userAddressStreet') {
          address.addressStreet = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userAddressNumber') {
          address.addressNumber = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userPaymentName') {
          payment.cardName = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userPaymentSurname') {
          payment.cardSurname = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userPaymentCVV') {
          payment.cardCVV = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        }
      }

      // Controllo le modifiche degli Input
      for (var i in tmp) {
        if(tmp[i].value && tmp[i].placeholder) {
          if(tmp[i].value != '' && tmp[i].value != tmp[i].placeholder) {
            if(tmp[i].name == 'userBirthday') {
              // È stato modificato la data
              query.birthday = {
                year: tmp[i].value.split('-')[0],
                month: tmp[i].value.split('-')[1],
                day: tmp[i].value.split('-')[2]
              }
            } else if(tmp[i].name == 'userAddressCity' || tmp[i].name == 'userAddressStreet' || tmp[i].name == 'userAddressNumber') {
              // È stato modificato l'indirizzo
              query.address = address
            } else if(tmp[i].name == 'userPaymentName' || tmp[i].name == 'userPaymentSurname' || tmp[i].name == 'userPaymentCVV') {
              // È stato modificato il nome o cognome del metodo di pagamento
              query.payment = payment            
            } else {
              console.log(tmp[i].name)
              query[tmp[i].name] = tmp[i].value;
            }           
          }
        }
      }

      // Controllo le modifiche degli Selector
      if(this.state.userSex != this.state.newSex) {
        query.sex = this.state.newSex;
      }
      if(this.state.newCardType != this.state.userPayment.cardType || this.state.newExprMonth != this.state.userPayment.cardExpireMonth || this.state.newExprYear != this.state.userPayment.cardExpireYear) {
        console.log('OK')
        query.payment = payment;
      }

      //Controllo della query
      console.log(query);

      //apiCall.postUser(null, query).then(() => {
      //    alert('success');
      //  }).catch(() => {
      //    alert('error');
      //  });
    }
    this.switchModifying();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <>
      <Header type={"user"} isAuthenticated={this.state.isAuth} />
      <Container className="mb-2 pt-2">
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={!this.state.boolModifying} >
            <Form.Group className="mb-2">
              <Form.Label>User Name:</Form.Label>
              <Form.Control type="text" name="userName" placeholder={this.state.userName} aria-label="Username" aria-describedby="basic-addon1"/>
            </Form.Group>   

            <Form.Group className="mb-2">
              <Form.Label>User Surname:</Form.Label>
              <Form.Control type="text" name="userSurname" placeholder={this.state.userSurname} />
            </Form.Group>    

            <Form.Group className="mb-2">
              <Form.Label>User Password:</Form.Label>
              <Form.Control type="password" name="password" placeholder="password" />
            </Form.Group>

            <Form.Label>User Sex:</Form.Label>
            <Form.Select className="mb-2" 
            value={this.state.newSex}
            onChange={(event) => {this.setState({newSex: event.target.value})} } 
            aria-label="Form Select Sex">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>

            <Form.Group as={Col} className="mb-2">
              <Form.Label>User Birthday:</Form.Label>
              <Form.Control type="date" 
              value={this.state.newBirthday.year + "-" + this.state.newBirthday.month + "-" + this.state.newBirthday.day} 
              name="userBirthday"
              onChange={(event)=>{
                var x = event.target.value.split('-');
                this.setState({newBirthday: {year: x[0], month: x[1], day: x[2]}})
              }}/>
            </Form.Group>
            
            <Form.Group as={Col} className="mb-2">
              <Form.Label>Address City:</Form.Label>
              <Form.Control type="text" name="userAddressCity" placeholder={this.state.userAddress.city} />
            </Form.Group>
              
            <Row>
              <Form.Group as={Col} xs={8} className="mb-2">
                <Form.Label>Address Street:</Form.Label>
                <Form.Control type="text" name="userAddressStreet" placeholder={this.state.userAddress.street} />
              </Form.Group>

              <Form.Group as={Col} xs={4} className="mb-2">
                <Form.Label>Number:</Form.Label>
                <Form.Control type="text" name="userAddressNumber" placeholder={this.state.userAddress.number} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>User Phone Number:</Form.Label>
              <Form.Control type="text" name="userPhoneNumber" placeholder={this.state.userPhoneNumber} />
            </Form.Group>
            
            <Form.Group className="mb-2">
              <Form.Label>User Email:</Form.Label>
              <Form.Control type="email" name="userEmail" readOnly disabled placeholder={this.state.userEmail} />
            </Form.Group>
            
            <Form.Group className="mt-1 mb-2">
              <Form.Label>Card Name:</Form.Label>
              <Form.Control type="text" name="userPaymentName" placeholder={this.state.userPayment.cardName} />
            </Form.Group>
            
            <Form.Group className="mt-1 mb-2">
              <Form.Label>Card Surname:</Form.Label>
              <Form.Control type="text" name="userPaymentSurname" placeholder={this.state.userPayment.cardSurname} />
            </Form.Group>
            
            <Form.Label>Tipo di carta:</Form.Label>
            <Form.Select className="mb-2" 
            value={this.state.newCardType}
            onChange={(event) => {this.setState({newCardType: event.target.value})} } 
            aria-label="Form Select Card Type">
              <option value="debit">Carta di debito</option>
              <option value="credit">Carta di credito</option>
              <option value="prepaid">Carta prepagata</option>
            </Form.Select>
            
            <Row>
              <Form.Label>Card Expiration:</Form.Label>
              <Col xs={8} className="mr-2">
                <Form.Select className="mb-2 mr-0" 
                value={this.state.newExprMonth}
                onChange={(event) => {this.setState({newExprMonth: event.target.value})} } 
                aria-label="Select Card Expiration Month">
                  {this.state.monthList.map( month => (
                    <option key={month.key} value={month.key}>{month.month}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={4} className="ml-0">
                <Form.Select className="mb-2" 
                value={this.state.newExprYear}
                onChange={(event) => {this.setState({newExprYear: event.target.value})} }
                aria-label="Select Card Expiration Year">
                  {this.state.yearList.map( year => (
                    <option key={year.key} value={parseInt(year.key) + 2021}>{year.year}</option>
                  ))}
                </Form.Select>
              </Col>    
            </Row>
            
            <Form.Group className="mb-2">
              <Form.Label>Card CVV:</Form.Label>
              <Form.Control
              type="text"
              name="userPaymentCVV"
              placeholder={this.state.userPayment.cardCVV} />
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