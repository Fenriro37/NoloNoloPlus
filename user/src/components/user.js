import React, { Component } from "react"
import { Image, Container, Row, Col, Table } from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from '../services/apiCall'

export class User extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      userId:"",
      userName:"",
      userSurname:"",
      userBirthday: {
        day:"",
        month:"",
        year:""
      },
      userPhoneNumber:"",
      userEmail:"",
      userAddress:{
        street:"",
        number:"",
        city:""
      },
      userPayment:{
        cardType:"",
        cardName:"",
        cardSurname:"",
        cardExpireYear:"",
        cardExpireMonth:"",
        cardCCV:""
      },
      userSex:""
    }
  }

  componentDidMount(){
    apiCall.getUser().then((result) => {
      this.setState({
        userId: result.data.data._id,
        userName: result.data.data.userName,
        userSurname: result.data.data.userName,
        userBirthday: result.data.data.birthday,
        //userBirthday.month: result.data.data.birthday.month,
        //userBirthday.year: result.data.data.birthday.year,
        userPhoneNumber: result.data.data.phoneNumber,
        userEmail: result.data.data.email,
        userAddress: result.data.data.address,
        //userAddress.number: result.data.data.address.addressNumber,
        //userAddress.city: result.data.data.address.addressCity,
        userPayment: result.data.data.payment,
        //userPayment.cardName: result.data.data.payment.cardName,
        //userPayment.cardSurname: result.data.data.payment.cardSurname,
        //userPayment.cardExpireYear: result.data.data.payment.cardExpireMonth,
        //userPayment.cardExpireMonth: result.data.data.payment.cardExpireYear,
        //userPayment.cardCCV: result.data.data.payment.card,
        userSex: result.data.data.sex,
      })
    })
  }

  render() {
    return (
      <Container className="pt-2">
        <Row>
          <Col xs="2">
            <i className="bi bi-person-circle"  alt="Bootstrap" role="img" aria-label="userIcon"></i>
          </Col>
          <Col xs="9">
            <Table bordered hover>
              <tbody>
                <tr>
                  <td>User Id:</td>
                  <td>{this.state.userId}</td>
                </tr>
                <tr>
                  <td>User:</td>
                  <td>{this.state.userName} {this.state.userSurname}</td>
                </tr>
                <tr>
                  <td>Birthday:</td>
                  <td>{this.state.userBirthday.year}-{this.state.userBirthday.month}-{this.state.userBirthday.day}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{this.state.userPhoneNumber}</td>
                </tr>
              </tbody>
            </Table>        
          </Col>
        </Row>
      </Container>
    );
  }
}