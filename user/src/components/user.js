import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ApiCall from '../services/apiCall'
import { Header } from './header.js'

import { Form, Button, Row, Col, Modal, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {

      // Variables for Select-Value
      yearList: [
        { key: 1, year: '2022' },
        { key: 2, year: '2023' }, 
        { key: 3, year: '2024' }, 
        { key: 4, year: '2025' }, 
        { key: 5, year: '2026' }
      ],
      monthList: [
        { key: 1,  month: 'Gennaio' },
        { key: 2,  month: 'Febbraio' },
        { key: 3,  month: 'Marzo' },
        { key: 4,  month: 'Aprile' },
        { key: 5,  month: 'Maggio' },
        { key: 6,  month: 'Giugno' },
        { key: 7,  month: 'Luglio' },
        { key: 8,  month: 'Agosto' },
        { key: 9,  month: 'Settembre' },
        { key: 10, month: 'Ottobre' },
        { key: 11, month: 'Novembre' },
        { key: 12, month: 'Dicembre '}
      ],    

      // User original value
      userId:'',
      userName:'',
      userSurname:'',
      userBirthday: {
        day: '',
        month: '',
        year: ''
      },
      userPhoneNumber:'',
      userEmail:'',
      userAddress: {
        street: '',
        number: '',
        city: ''
      },
      userPayment: {
        cardOwner: '',
        cardType: '',
        cardCode: '',
        cardExpireYear: '',
        cardExpireMonth: '',
        cardCVV: ''
      },
      userSex:'',

      // User new value
      newSex: '',
      newCardType: '',
      newExprYear: '',
      newExprMonth: '',
      newBirthday: {
        year: '', 
        month: '', 
        day: ''
      },
      
      // Settings
      boolModifying: false,
      isAuth: false,

      // Modal
      show: false,
      loading: true,
      done: false,
    }
    
    // Binding of functions
    this.switchModifying = this.switchModifying.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  switchModifying() {
    const boolModifying = !this.state.boolModifying;
    this.setState({boolModifying: boolModifying});
  }

  handleClose() {
    this.setState({
      show: false
    });
    window.location.reload(false);
  }
  
  handleShow() {
    this.setState({
      show: true
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    var tmp = event.target.querySelectorAll('input');

    if (this.state.boolModifying) {
      this.handleShow();
      // Preparo la query da inviare al server
      var query = {};
      // Preparo l'indirizzo e il pagamento (oggetto)
      var address = {
        addressCity: '',
        addressStreet: '',
        addressNumber: ''
      };
      var payment = {
        cardOwner: '',
        cardCode: 0,
        cardExpireYear: this.state.newExprYear,
        cardExpireMonth: this.state.newExprMonth,
        cardType: this.state.newCardType,
        cardCVV: 0
      };
      for (var i in tmp) {
        if(tmp[i].name == 'userAddressCity') {
          address.addressCity = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userAddressStreet') {
          address.addressStreet = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userAddressNumber') {
          address.addressNumber = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userPaymentOwner') {
          payment.cardOwner = tmp[i].value ? tmp[i].value : tmp[i].placeholder;
        } else if(tmp[i].name == 'userPaymentCardCode') {
          payment.cardCode = tmp[i].value ? parseInt(tmp[i].value) : parseInt(tmp[i].placeholder);
        } else if(tmp[i].name == 'userPaymentCVV') {
          payment.cardCVV = tmp[i].value ? parseInt(tmp[i].value) : parseInt(tmp[i].placeholder);
        }
      }
       // Controllo le modifiche degli Input
       for (var i in tmp) {
        if(tmp[i].value && tmp[i].placeholder) {
          if(tmp[i].value != '' && tmp[i].value != tmp[i].placeholder) {
            if(tmp[i].name == 'userAddressCity' || tmp[i].name == 'userAddressStreet' || tmp[i].name == 'userAddressNumber') {
              // È stato modificato l'indirizzo
              query.address = address;
            } else if(tmp[i].name == 'userPaymentCardCode' || tmp[i].name == 'userPaymentOwner' || tmp[i].name == 'userPaymentCVV') {
              // È stato modificato il nome o cognome del metodo di pagamento
              query.payment = payment;
            } else if(tmp[i].name == 'userPhoneNumber') { 
              query.phoneNumber = parseInt(tmp[i].value)
            } else {
              query[tmp[i].name] = tmp[i].value;
            }          
          }
          if(tmp[i].name == 'userPassword' && tmp[i].value == 'Password') {
            query.password = tmp[i].value;
          }
        }
      }
      // Controllo le modifiche dei Selector
      if(this.state.userSex != this.state.newSex) {
        query.sex = this.state.newSex;
      }
      if(this.state.newCardType != this.state.userPayment.cardType || this.state.newExprMonth != this.state.userPayment.cardExpireMonth || this.state.newExprYear != this.state.userPayment.cardExpireYear) {
        query.payment = payment;
      }
      // Controllo della data
      if(
        this.state.newBirthday.day != this.state.userBirthday.day ||
        this.state.newBirthday.month != this.state.userBirthday.month ||
        this.state.newBirthday.year != this.state.userBirthday.year
        ) {
        query.birthday = this.state.newBirthday;
      }
      // Chiamata API
      ApiCall.postUser(null, query).then(() => {
        this.setState({
          loading: false,
          done: true
        });
      }).catch(() => {
        this.setState({
          loading: false,
          done: false
        });
      });
    }
    this.switchModifying();
  }

  componentDidMount() {
    ApiCall.getUser().then((result) => {
      this.setState({
        // Initializazion of the user original value
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
          cardOwner: result.data.data.payment.cardOwner,
          cardCode: result.data.data.payment.cardCode,
          cardType: result.data.data.payment.cardType,
          cardExpireYear: result.data.data.payment.cardExpireYear,
          cardExpireMonth: result.data.data.payment.cardExpireMonth,
          cardCVV: result.data.data.payment.cardCVV
        },
        userSex: result.data.data.sex,
        // Initializazion of the user new value
        newSex: result.data.data.sex,
        newCardType: result.data.data.payment.cardType,
        newExprYear: result.data.data.payment.cardExpireYear,
        newExprMonth: result.data.data.payment.cardExpireMonth,
        newBirthday: {
          year: result.data.data.birthday.year, 
          month: result.data.data.birthday.month, 
          day: result.data.data.birthday.day
        },
        // Settings
        isAuth: true
      });
    }).catch(() => {
      window.location.replace('/public/login.html')
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
    window.location.reload(false);
  }
  
  handleShow() {
    this.setState({
      show: true
    });
  }

  render() {
    return (
      <>
      <Header
      type='user'
      isAuthenticated={this.state.isAuth}/>

      <div
      id='cont'
      className='mt-2 mb-2'
      aria-label='Pagina Utente'>
        <form
        className='m-0 p-0'
        onSubmit={this.handleSubmit}>
          <fieldset
          className='m-0 p-0'
          disabled={!this.state.boolModifying}>
            <h2 className='mt-0 mb-2'>Dati personali</h2>
            <Form.Group className='mb-2'>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
              type='text'
              name='userName'
              placeholder={this.state.userName} 
              aria-label='Nome utente:'/>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Cognome:</Form.Label>
              <Form.Control 
              type='text' 
              name='userSurname' 
              placeholder={this.state.userSurname}
              aria-label='Cognome utente:'/>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label
              tabindex={this.state.boolModifying ? '0' : '-1'}>
                Email (non modificabile):
              </Form.Label>
                <Form.Control 
                type='email' 
                name='userEmail' 
                readOnly
                disabled 
                placeholder={this.state.userEmail}
                aria-label='Email:'/>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
              type='password' 
              name='userPassword' 
              placeholder='password'
              aria-label='Password:'/>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Genere:</Form.Label>
              <Form.Select
              className='mb-2' 
              value={this.state.newSex}
              onChange={(event) => {
                this.setState({
                  newSex: event.target.value
                });
              }} 
              aria-label='Genere:'>
                <option value='male'>Uomo</option>
                <option value='female'>Donna</option>
                <option value='other'>Altro</option>
              </Form.Select>
            </Form.Group>
           
            <Form.Group as={Col} className='mb-2'>
              <Form.Label>Data di Nascita:</Form.Label>
              <Form.Control
              type='date' 
              value={this.state.newBirthday.year + '-' + 
              (this.state.newBirthday.month < 10 ? '0' + this.state.newBirthday.month : this.state.newBirthday.month) + '-' + 
              (this.state.newBirthday.day < 10 ? ('0' + this.state.newBirthday.day) : this.state.newBirthday.day)}
              max="2004-02-03"
              min="1900-01-01"
              name='userBirthday'
              aria-label='Data di nascita:'
              onChange={(event) => {
                var x = event.target.value.split('-');
                this.setState({
                  newBirthday: {
                    year: parseInt(x[0]),
                    month: parseInt(x[1]), 
                    day: parseInt(x[2])
                  }
                });
              }}/>
            </Form.Group>
            
            <Form.Group as={Col} className='mb-2'>
              <Form.Label>Paese/Città di residenza:</Form.Label>
              <Form.Control
              type='text'
              name='userAddressCity' 
              placeholder={this.state.userAddress.city}
              aria-label='Città:'/>
            </Form.Group>
              
            <Row>
              <Form.Group as={Col} xs={8} className='mb-2'>
                <Form.Label>Via di Residenza:</Form.Label>
                <Form.Control 
                type='text' 
                name='userAddressStreet' 
                placeholder={this.state.userAddress.street}
                aria-label='Via'/>
              </Form.Group>

              <Form.Group as={Col} xs={4} className='mb-2'>
                <Form.Label>Numero:</Form.Label>
                <Form.Control 
                type='text' 
                name='userAddressNumber' 
                placeholder={this.state.userAddress.number}
                aria-label='Numero civico: '/>
              </Form.Group>
            </Row>

            <Form.Group className='mb-2'>
              <Form.Label>Numero di Telefono:</Form.Label>
              <Form.Control
              className='remove-spin-box'
              type='number' 
              name='userPhoneNumber'
              placeholder={this.state.userPhoneNumber}
              aria-label='Numero di cellulare:'/>
            </Form.Group> 
          
            <h2 className='mt-4 mb-2'>Metodo di Pagamento</h2>

            <Form.Group className='mb-2'>
              <Form.Label>Intestatario:</Form.Label>
              <Form.Control 
              type='text' 
              name='userPaymentOwner' 
              placeholder={this.state.userPayment.cardOwner}
              aria-label='Intestatario della carta:'/>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Numero della Carta:</Form.Label>
              <Form.Control 
              type='number'
              className='remove-spin-box'
              name='userPaymentCardCode' 
              placeholder={this.state.userPayment.cardCode}
              aria-label='Numero della carta:'/>
            </Form.Group>
            
            <Form.Group className='mb-2'>
              <Form.Label>Tipo di Carta:</Form.Label>
              <Form.Select 
              className='mb-2' 
              value={this.state.newCardType}
              aria-label='Tipologia di carta:'
              onChange={(event) => {
                this.setState({
                  newCardType: event.target.value
                });
              }} 
              aria-label='Form Select Card Type'>
                <option value='debit'>Carta di debito</option>
                <option value='credit'>Carta di credito</option>
                <option value='prepaid'>Carta prepagata</option>
              </Form.Select>
            </Form.Group>
            
            <Row>
              <Form.Label>Scadenza della Carta:</Form.Label>
              <Col xs={8}>
                <Form.Select 
                className='mb-2' 
                value={this.state.newExprMonth}
                aria-label='Mese di scadenza della carta:'
                onChange={(event) => {
                  this.setState({
                    newExprMonth: parseInt(event.target.value)
                  });
                }}>
                  {this.state.monthList.map((month) => (
                    <option key={month.key} value={month.key}>{month.month}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={4}>
                <Form.Select
                className='mb-2' 
                value={this.state.newExprYear}
                aria-label='Anno di scadenza della carta:'
                onChange={(event) => {
                  this.setState({
                    newExprYear: parseInt(event.target.value)
                  });
                }}>
                  {this.state.yearList.map((year) => (
                    <option key={year.key} value={parseInt(year.key + 2021)}>{year.year}</option>
                  ))}
                </Form.Select>
              </Col>    
            </Row>
            
            <Form.Group className='mb-2'>
              <Form.Label>CVV:</Form.Label>
              <Form.Control
              type='number'
              className='remove-spin-box'
              name='userPaymentCVV'
              placeholder={this.state.userPayment.cardCVV}
              aria-label='CVV della carta:'/>
            </Form.Group>
          </fieldset>
          <Button 
          className='mt-2 mb-2 w-100' 
          type='submit' 
          value='submit' 
          variant={this.state.boolModifying ? 'success' : 'primary'}>
            {this.state.boolModifying ? 'Salva' : 'Modifica'}
          </Button>
        </form>
      </div>
      <Modal
      show={this.state.show}
      onHide={this.handleClose}
      backdrop='static'
      keyboard={false}
      centered>
        <Modal.Body>
          {this.state.loading ? (
            <div
            className='d-flex align-items-center'>
              Salvataggio&nbsp;
              <Spinner
              variant='primary'
              animation='border'
              role='status'>
                <span
                className='visually-hidden'>
                  Caricamento...
                </span>
              </Spinner>
            </div>
          ) : (this.state.done ? (<>Modifiche effettuate.</>) : (<>Errore durante il salvataggio delle modifiche.</>)
          )}
        </Modal.Body>
        <Modal.Footer>
        <Button
        variant='secondary'
        onClick={this.handleClose}
        disabled={this.state.loading}>
          Chiudi
        </Button>
      </Modal.Footer>
      </Modal>
      </>
    );
  }
}
