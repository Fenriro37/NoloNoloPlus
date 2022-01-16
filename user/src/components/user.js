import React, { Component } from "react"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from '../services/apiCall'
import {Header} from './header.js'

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
      userPayment:{cardType:"",cardName:"",cardSurname:"",cardExpireYear:"",cardExpireMonth:"",cardCCV:""},
      userSex:""
    }
  }

  componentDidMount(){
    apiCall.getUser().then((result) => {
      this.setState({
        userId: result.data.data._id,
        userName: result.data.data.userName,
        userSurname: result.data.data.userSurname,
        userBirthday: result.data.data.birthday,
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
      <>
      <Header type={"user"}/>
      <Container className="pt-2">
        sasa
      </Container>
      </>
    );
  }
}

/*
<i className="bi bi-person-circle"  style={{fontSize:'4rem'}} alt="Bootstrap" role="img" aria-label="userIcon"></i>
<Row>
  <Col>
    <h6>{this.state.userName} {this.state.userSurname} 
    <Button variant="primary" size="sm">
      <i class="bi bi-pencil-square"></i>
    </Button></h6>
    <hr />
  </Col>
</Row>*/