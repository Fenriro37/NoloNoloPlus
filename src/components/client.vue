<template>
  <div>
    
    <div class="container-fluid p-5">
      <div class="row mb-5">
        <div class="col-6">
          <!-- Colonne immagine -->
          <img v-bind:src="image" class="img-thumbnail">
        </div>
        <!-- Colonne informazioni articolo -->
        <div class="col-6">
          <div id="productidentifier">
            ID: {{ identifier }}          
          </div>   
          <!-- Titolo -->
          <div>
            <h1>{{ title + ' ' + brand }}</h1>
          </div>
          <!-- Etichette -->
          <div class="mb-2">
            <span class="badge rounded-pill bg-primary" v-for="tag in tags" :key="tag">{{ tag }}</span>
          </div>
          <!-- Stars -->
          <div>
            <span v-for="iter in parseInt(quality)" class="fa fa-star checked big-size" :key="iter"> </span>
            <span v-for="mimmo in (3 - parseInt(quality))" class="fa fa-star big-size" :key="mimmo"> </span>
          </div>
          <!-- Prezzo -->
          <div class="mt-3 mb-3">
            <span v-if="discount.onSale" class="price"><s>{{ price }}€</s> <span id="onSalePrice">{{ getDiscountedPrice }}€</span></span>
            <span v-else class="price">{{ price }} €</span>
          </div>
          <!-- Bottoni -->
          <div>
            <button type="button" id="rentProduct" class="btn btn-lg btn-secondary">Affitta</button>
            <button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" v-on:click="getModalData">Modifica</button>
            <div class="form-check form-switch big-size">
              <input class="form-check-input custom-switch" type="checkbox" id="flexSwitchCheckDefault" :checked="available" v-model="available" @click="changeInStock">
              <label v-if="available" class="form-check-label" for="flexSwitchCheckDefault">Disattiva articolo</label>
              <label v-else class="form-check-label" for="flexSwitchCheckDefault">Attiva articolo</label>
            </div>
          </div>  
        </div>  
      </div>
      <div class="row">
        <h3>Descrizione</h3>
      </div>
      <div class="row mb-3 p-3 border border-secondary border-3 bg-white">
        {{ description }}
      </div>
      <div class="row">
        <h3>Note</h3>
      </div>
      <div class="row mb-3 p-3 border border-secondary border-3 bg-white">
        {{ note }}
      </div>     
    </div>
    
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap";
  import $ from 'jquery'
  import Functions from '../src/functions/function'
  export default {
    data() {
      return {
        identifier: '',
        name: '',
        surname: '',
        sex:'',
        birthday: {
          year: '',
          month: '',
          day: '',
        },
        phoneNumber: '',
        email: '',
        password: 0,
        address: {
          addressStreet: '',
          addressNumber: '',
          addressCity: ''
        },
        payment: {
          cardType: '',
          cardName: '',
          cardSurname: '',
          cardExpireMonth: '',
          cardExpireYear: '',
          cardCCV: ''
        }
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