import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const PRENOTAZIONE = {
  id:"61b32c599feb188f09c3c38f",
  clientEmail:"facchinetti@gmail.com",
  productId:"616fe38696d1e399a0d12244",
  price:778,
  bookingDate:{day:5, month:12, year:2021},
  startDate:{day:19, month:12, year:2021},
  endDate:{day:26, month:12, year:2021},
  isTaken:false,
  isReturned:false,
  description:"78",
  note:"",
  productTitle:"Bicicletta",
  productBrand:"RockRiderda",
  image:"https://acquisti.corriere.it/wp-content/uploads/2021/05/BIciclette-Via-Veneto.jpeg",
  clientName:"GPDIMERDAdawddwa",
  clientSurname:"Tapirodaw"
}

const USER = {
  id:"61cadade449b2a2222672da8",
  userName:"Mattia",
  userSurname:"Matteo",
  birthday:{year:2010, month:10, day:23},
  phoneNumber:5648646846484,
  email:"jake@gmail.com",
  password:"$2a$10$pWBabGuHugHQn2aK8WaG5ul56VhwBI6fRssYYua68zqz/O5Zqx9We",
  address:{addressStreet:22222, addressNumber:22222, addressCity:"Emleieoa"},
  payment:{
    cardType:"debit",
    cardName:"cacacacacaca",
    cardSurname:"cacacacaca",
    cardExpireMonth:1,
    cardExpireYear:2021,
    cardCCV:485,
  },
  sex:"Female"
}

ReactDOM.render(
  <React.StrictMode>
    <App prenotazione={PRENOTAZIONE} user={USER}/>
  </React.StrictMode>,
  document.getElementById('root')
  );
  