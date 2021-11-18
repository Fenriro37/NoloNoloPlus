<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="col-6">
        <b-img v-bind:src="bookedArticles.image" class="img-thumbnail"></b-img>
      </div>
      <div class="col-6">
        <p> {{bookedArticles.title + ' ' +bookedArticles.brand}}</p>
        <p> Id Articolo: <a href="">{{ bookedArticles.identifier}}</a></p>
        <p> Id Cliente: <a href="">{{ identifier}}</a></p>
        <p>Prezzo: {{bookedArticles.price}}€ (da rivedere)</p>
      </div>
    </div>
    <div class="row">
      <p>Data richiesta prenotazione: {{bookingRequest.day + '/' + bookingRequest.month + '/' + bookingRequest.year}}</p>  
    </div>
    <div class="row">
      <div class="col-4">
        <p>Data inizio prenotazione: {{bookingStart.day + '/' + bookingStart.month + '/' + bookingStart.year}}</p> 
      </div>
      <div class="col-4">
        <input type="checkbox">
        <label > Avvenuta Consegna</label>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p>Data fine prenotazione: {{bookingEnd.day + '/' + bookingEnd.month + '/' + bookingEnd.year}}</p> 
      </div>
      <div class="col-4">
        <input type="checkbox">
        <label > Avvenuta Restituzione </label>
      </div>
    </div>
    <div class="row"><p>{{notes}}</p></div>
    <div class="row"><p>{{privateNotes}}</p></div>

    <button class="btn btn-lg btn-secondary"> Modifica</button>
    <button class="btn btn-lg btn-danger"> Cancella prenotazione</button>
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
        identifier:'54564894851654', //IDcliente(nome cognome)
        bookedArticles: {     //uno o più articoli [](se ci sono più articoli le date combaciano)
          identifier:'156945145614',
          title:'Bici',
          brand:'deGasperi',
          image:'https://acquisti.corriere.it/wp-content/uploads/2021/05/BIciclette-Via-Veneto.jpeg',
          price:'2000',
          discount: {    //per risalire allo sconto 
            onSale: false,
            onSaleType: false,  //percentuale o fisso
            onSaleValue: 0
          },
        },
        bookingRequest: {     //data 1 (quando viene effettuato)
          year: '1990',
          month: '11',
          day: '30',
        },
        bookingStart: {     //data 2 (da)
          year: '1990',
          month: '12',
          day: '10',
        },
        bookingEnd: {     //data 3 (a)
          year: '1990',
          month: '12',
          day: '30',
        },
        rentalOccurred: false,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        notes:'Questa è una prenotazione',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'Questo è privato'                //note 2 (dettagli non visibili al cliente)
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
.tab{
  padding-left: 2.5em;
}
.delete {
  float: right
}
.img-thumbnail {
    padding: 0.5em;
    background-color: rgb(156, 156, 156);
    border: 0px;
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}
.delete {
  float: right
}
</style>