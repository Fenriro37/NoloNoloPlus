<template>
  <div>
    <div class="container-fluid p-5">
      <div>
        <h1> Account </h1>
        <div class="row mb-5">
          <div class="col-3">
            <p>Name</p>
          </div>
          <div class="col-3">
            <input type="text" :value="name" >  
            <p>{{name}}</p>
          </div>
          <div class="col-3">
            <p>Surname</p>
          </div>
          <div class="col-3">
            <input type="text" :value="surname" readonly><br>
          </div>
        </div>
      </div>
    </div>
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
          year: '1890',
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
          cardCCV: '111'
        },
      ////////////////////// DATI MODALE /////////////////////////////////////////////////////////////////
        modalName: '',
        modalSurname: '',
        modalSex:'',       
        modalYear: '',
        modalMonth: '',
        modalDay: '',        
        modalPhoneNumber: '',
        modalEmail: 'exam@gmail.com',
        modalPassword: 'ca',
        modalAddressStreet: ' dei cazzi',
        modalAddressNumber: '',
        modalAddressCity: '',
        modalCardType: '',
        modalCardName: '',
        modalCardSurname: '',
        modalCardExpireMonth:'',
        modalCardExpireYear: '',
        modalCardCCV: '',
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
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(201, 201, 238);
}
.img-thumbnail {
    padding: 0.5em;
    background-color: rgb(156, 156, 156);
    border: 0px;
    display: block;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}
.input-group {
    margin-left: auto;
    margin-right: auto;
}
.checked {
    color: orange;
    border-color: rgb(0, 0, 0);
    border-width: 0.5em;
}
.price {
    font-size: x-large;
}
.input-group-text {
    width: 2.5em;
}
#myDDButton {
    background-color: hsl(0, 0%, 82%);
}
.big-size {
    transform: scale(1.4);
    margin-right: 0.5em;
}
.badge {
    font-size: medium;
    margin-right: 0.125em;
}
.btn-lg {
    margin-right: 0.5em;
    margin-bottom: 0.5rem;
}
#onSalePrice {
    color: rgb(232, 38, 38);
}
.form-switch {
    margin-left: 7.2em;
}
.custom-switch {
    margin-right: 0.5em;
}
#rentProduct {
    color: black;
    background-color: rgb(254, 165, 45);
    border-color: rgb(254, 165, 45);
}
</style>