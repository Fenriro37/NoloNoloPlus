<template>
  <div class="container-fluid " >
    <h1> Account </h1>
    <div class="row ">
      <div class="col-3 ">
        <p>Nome:</p>
      </div>
      <div class="col-9 ">
        <input type="text" :value="name">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p>Cognome:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="surname">
      </div>
    </div>
    
    <div class="row">
      <div class="col-3">
        <p>Sesso:</p>
      </div>
      <div class="col-9">
        <select class="form-select" aria-label="Default select example">
          <option value="1" selected>M</option>
          <option value="2">F</option>
          <option value="3">Altro</option>
        </select>
      </div>
    </div>
      
    <div class="row">
      <div class="col-3">
        <p>Numbero di Telefono:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="phoneNumber">
      </div>
    </div>
      
    <div class="row">
      <div class="col-3">
        <p>E-mail:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="email">
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col-3">
        <b>Data di nascita</b>
      </div>
    </div>

    <div class="row">  
      <div class="col-3">
        <p>Giorno:</p>
      </div>
      <div class="col-9">
        <input type="number" :value="birthday.day" min="1" max="31">          
      </div>
    </div>
    
    <div class="row">  
      <div class="col-3">
        <p>Mese:</p>
      </div>
      <div class="col-9">
        <input type="number" :value="birthday.month" min="1" max="12">  
      </div>
    </div> 

    <div class="row">  
      <div class="col-3">
        <p>Anno:</p>
      </div>
      <div class="col-9">
        <input type="number" :value="birthday.year" min="1940" max="2021">  
      </div>
    </div>   

    <hr>

    <div class="row">
      <div class="col-3">
        <b>Indirizzo</b>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        Via:
      </div>
      <div class="col-9">
        <input type="text" :value="address.addressStreet">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        Numero:
      </div>
      <div class="col-9">
        <input type="number" :value="address.addressNumber">
      </div>
    </div> 

    <div class="row">
      <div class="col-3">
        Città:
      </div>
      <div class="col-9">
        <input type="text" :value="address.addressCity">
      </div>
    </div>

    <hr>

    <div class="row">
      <b>Pagamenti</b>
    </div>
    <div class="row">
      <div class="col-3">
        <p>Tipo di carta:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="payment.cardType">
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <p>Nome carta:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="payment.cardName">
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <p>Proprietario:</p>
      </div>
      <div class="col-9">
        <input type="text" :value="payment.cardSurname">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p>Data scadenza:</p>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p>Mese:</p>
      </div>

      <div class="col-9">
        <input type="number" :value="payment.cardExpireMonth" min="1" max="12">  
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p>Anno:</p>
      </div>        
      <div class="col-9">
        <input type="number" :value="payment.cardExpireYear" min="2021" max="2025">
      </div>
    </div>

    <button type="button" id="rentProduct" class="btn btn-lg btn-secondary">Modifica</button>
    <button type="button" class="btn btn-lg btn-danger"  >Cancella</button>
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap";
  import $ from 'jquery'
  //import Functions from '../src/functions/function'
  export default {
    data() {
      return {
        identifier: '4485423185',
        name: 'Mario',
        surname: 'Mari',
        sex:'M',
        birthday: {
          year: '1990',
          month: '11',
          day: '30',
        },
        phoneNumber: '3506451389',
        email: 'example@gmail.com',
        password: 'cacca',
        address: {
          addressStreet: 'Via dei cazzi',
          addressNumber: '13',
          addressCity: 'Bologna'
        },
        payment: {
          cardType: 'debito',
          cardName: 'Visa',
          cardSurname: 'Vitali',
          cardExpireMonth: '7',
          cardExpireYear: '24',
          cardCVV: '111'
        },
      }
    },
    methods: {},
     
    computed: {},
  }
  //////////////////////////////////////FINE VUE - INIZIO JS///////////////////////////////////////
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
html {
    height: auto;
    min-height: 100% !important;
    background-color: #294870;
}
body {
    font-family: tahoma;
    background-color: transparent;
    height: 100%;
}
.container-fluid {
    background-color: rgb(201, 201, 238);
}
.input-group {
    margin-left: auto;
    margin-right: auto;
}
.input-group-text {
    width: 2.5em;
}

.btn-lg {
    margin-right: 0.5em;
    margin-bottom: 0.5rem;
}
.row {
  margin-bottom: 0.5em ;
}
</style>