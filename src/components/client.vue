<template>
  <div class="container-fluid " >
    <h1> Account </h1>

    <div class="row ">
      <div class="col-3 ">
        <p><span v-if="boolModify">* </span>Nome:</p>
      </div>
      <div class="col-9 ">
        <!-- ModifyOn/Off -->
        <input id="name" type="text" :value="name"  :readonly="!boolModify">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Cognome:</p>
      </div>
      <div class="col-9">
        <input id="surname" type="text" :value="surname" :readonly="!boolModify">
      </div>
    </div>

    <div class="row ">
      <div class="col-3 ">
        <p>ID:<span v-if="boolModify">(non modificabile)</span></p>
      </div>
      <div class="col-9 ">
        <input type="text" :value="identifier" readonly>
      </div>
    </div>
    
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Sesso:</p>
      </div>
      <div class="col-9">
        <select id="sex" class="form-select" aria-label="Default select example" :disabled="!boolModify">
          <option value="M" :selected="sex === 'M'" >M</option>
          <option value="F" :selected="sex === 'F'">F</option>
          <option value="A" :selected="sex === 'other'">Altro</option>

        </select>
      </div>
    </div>
      
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Numbero di Telefono:</p>
      </div>
      <div class="col-9">
        <input id="phoneNumber" type="text" :value="phoneNumber" :readonly="!boolModify">
      </div>
    </div>
      
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>E-mail:</p>
      </div>
      <div class="col-9">
        <input id="email" type="text" :value="email" :readonly="!boolModify">
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
        <p><span v-if="boolModify">* </span>Giorno:</p>
      </div>
      <div class="col-9">
        <input type="number" id="day" :value="birthday.day" min="1" max="31" :readonly="!boolModify">          
      </div>
    </div>
    
    <div class="row">  
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Mese:</p>
      </div>
      <div class="col-9">
        <input type="number" id="month" :value="birthday.month" min="1" max="12" :readonly="!boolModify">  
      </div>
    </div> 

    <div class="row">  
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Anno:</p>
      </div>
      <div class="col-9">
        <input id="year" type="number" :value="birthday.year" min="1940" max="2021" :readonly="!boolModify">  
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
        <span v-if="boolModify">* </span>Via:
      </div>
      <div class="col-9">
        <input id="street" type="text" :value="address.addressStreet" :readonly="!boolModify">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <span v-if="boolModify">* </span>Numero:
      </div>
      <div class="col-9">
        <input id="streetNumber" type="number" :value="address.addressNumber" :readonly="!boolModify">

      </div>
    </div> 

    <div class="row">
      <div class="col-3">
        <span v-if="boolModify">* </span>Città:
      </div>
      <div class="col-9">
        <input id="city" type="text" :value="address.addressCity" :readonly="!boolModify">
      </div>
    </div>

    <hr>

    <div class="row">
      <b>Pagamenti</b>
    </div>
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Tipo di carta:</p>
      </div>
      <div class="col-9">
        <input id="cardType" type="text" :value="payment.cardType" :readonly="!boolModify">
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Nome carta:</p>
      </div>
      <div class="col-9">
        <input id="cardName" type="text" :value="payment.cardName" :readonly="!boolModify">
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <p><span v-if="boolModify">* </span>Proprietario:</p>
      </div>
      <div class="col-9">
        <input id="cardOwner" type="text" :value="payment.cardSurname" :readonly="!boolModify">
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p>Data scadenza:</p>
      </div>
    </div>

    <div class="row" >
      <div class="col-3 tab">
        <p><span v-if="boolModify">* </span>Mese:</p>
      </div>
      <div class="col-9">
        <input id="expireMonth" type="number" :value="payment.cardExpireMonth" min="1" max="12" :readonly="!boolModify"> 
      </div>
    </div>

    <div class="row">
      <div class="col-3 tab">
        <p><span v-if="boolModify">* </span>Anno:</p>
      </div>        
      <div class="col-9">
        <input id="expireYear" type="number" :value="payment.cardExpireYear" min="2021" max="2025" :readonly="!boolModify">
      </div>
    </div>

    <button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary" v-on:click="boolModify = true">Modifica</button>
    <button v-if="boolModify" type="button" class="btn btn-lg btn-success" @click="saveData" >Salva</button>
    <button v-if="boolModify" type="button" class="btn btn-lg btn-danger" @click="undoChange">Annulla</button>


    <button type="button" class="btn btn-lg btn-danger delete">Elimina cliente</button>
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
        sex: 'M',
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
        //Modalità Modifica
        boolModify: false,
      }
    },
    methods: {
      saveData(){
        let query = {}
        if(document.getElementById('name').value != this.name)
          query.userName = document.getElementById('name').value;
          
        if(document.getElementById('surname').value != this.surname)
          query.userSurname = document.getElementById('surname').value;
          
        if(document.getElementById('sex').value != this.sex)
          query.sex = document.getElementById('sex').value;
          
        if(document.getElementById('phoneNumber').value != this.phoneNumber)
          query.phoneNumber = document.getElementById('phoneNumber').value;
          
        if(document.getElementById('email').value != this.email)
          query.email = document.getElementById('email').value;
          
        if(document.getElementById('day').value != this.birthday.day){
          if(query.birthday === undefined){
            query.birthday = {}
          }
          query.birthday.day = document.getElementById('day').value;
        }
          
        if(document.getElementById('month').value != this.birthday.month){
          if(query.birthday === undefined){
            query.birthday = {}
          }
          query.birthday.month = document.getElementById('month').value;
        }
        if(document.getElementById('year').value != this.birthday.year){
          if(query.birthday === undefined){
            query.birthday = {}
          }
          query.birthday.year = document.getElementById('year').value;
        }
        if(document.getElementById('street').value != this.address.addressStreet){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressStreet = document.getElementById('street').value;
        }
          
        if(document.getElementById('streetNumber').value != this.address.addressNumber){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressNumber = document.getElementById('streetNumber').value;
        }
        if(document.getElementById('city').value != this.address.addressCity){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressCity = document.getElementById('city').value;
        }
        if(document.getElementById('cardType').value != this.payment.cardType){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardType = document.getElementById('cardType').value;
        }
        if(document.getElementById('cardName').value != this.payment.cardName){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardName = document.getElementById('cardName').value;
        }
        if(document.getElementById('cardOwner').value != this.payment.cardSurname){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardSurname = document.getElementById('cardOwner').value;
        }
        if(document.getElementById('expireMonth').value != this.payment.cardExpireMonth){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardExpireMonth = document.getElementById('expireMonth').value;
        }
        if(document.getElementById('expireYear').value != this.payment.cardExpireYear){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardExpireYear = document.getElementById('expireYear').value;
        }
        console.log(query);
        Function.saveDataClient(this.identifier, query).then(response => {
          if(response.status == '200'){
            this.name = document.getElementById('name').value
            this.surname = document.getElementById('surname').value
            this.sex = document.getElementById('sex').value
            this.phoneNumber = document.getElementById('phoneNumber').value
            this.email = document.getElementById('email').value
            this.birthday.day = document.getElementById('day').value
            this.birthday.month = document.getElementById('month').value
            this.birthday.year = document.getElementById('year').value
            this.address.addressStreet = document.getElementById('street').value
            this.address.addressNumber = document.getElementById('streetNumber').value
            this.address.addressCity = document.getElementById('city').value            
            this.payment.cardType = document.getElementById('cardType').value
            this.payment.cardName = document.getElementById('cardName').value
            this.payment.cardSurname = document.getElementById('cardOwner').value
            this.payment.cardExpireMonth = document.getElementById('expireMonth').value
            this.payment.cardExpireYear = document.getElementById('expireYear').value
            
            this.boolModify = false;
          }
        
        })
      },

      undoChange(){
        document.getElementById('name').value = this.name
        document.getElementById('surname').value = this.surname

        let prevSex;
        if(this.sex === 'M'){prevSex = 'M'}
        else if(this.sex === 'F'){prevSex = 'F'}
        else {prevSex = 'A'}
        document.getElementById('sex').value = prevSex;

        document.getElementById('phoneNumber').value = this.phoneNumber
        document.getElementById('email').value = this.email
        document.getElementById('day').value = this.birthday.day
        document.getElementById('month').value = this.birthday.month
        document.getElementById('year').value = this.birthday.year
        document.getElementById('street').value = this.address.addressStreet
        document.getElementById('streetNumber').value = this.address.addressNumber
        document.getElementById('city').value = this.address.addressCity
        document.getElementById('cardType').value = this.payment.cardType
        document.getElementById('cardName').value = this.payment.cardName
        document.getElementById('cardOwner').value = this.payment.cardSurname
        document.getElementById('expireMonth').value = this.payment.cardExpireMonth
        document.getElementById('expireYear').value = this.payment.cardExpireYear
        this.boolModify = false;
      }

    },
     
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
.tab{
  padding-left: 2.5em;
}
.delete {
  float: right
}
</style>
