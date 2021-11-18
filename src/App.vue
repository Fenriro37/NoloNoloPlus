<template>
<div id="app">
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-col cols='1'>
      <!--<router-link to="/" class="nav-link">Home</router-link> -->
    </b-col>

    <b-col cols='6'>
      <b-input-group class="noborder">
        <b-form-select v-model="selected" :options="options">        </b-form-select>
        <b-form-input id="ricerca" placeholder="Search..."></b-form-input>
        <b-button class="bg-primary" v-on:click='smista'>Cerca</b-button>
      </b-input-group>
    </b-col>

    <b-col cols='1'>
    </b-col>

    <b-col cols='2'>
       <router-link to="/createArticle" class="nav-link" tag="b-button">Aggiungi articolo</router-link>

    </b-col>
    <b-col cols='2'>
       <router-link to="/createReservation" class="nav-link" tag="b-button">Aggiungi prenotazione</router-link>
    </b-col>
  </b-navbar>

  <router-view/>
          <!-- v-for:articles/clients/reservations {html di uno }-->
  <!--
  <div class="container-fluid p-5">
     <b-row>


        <b-col cols="2">
          <b-img thumbnail fluid v-bind:src="articles.image"  alt="Image 1"></b-img>
        </b-col>
        <b-col cols="4">
          <h2>  <b-link href="#articles.identifier">{{articles.title + ' ' + articles.brand}}</b-link> </h2>
          <h2> {{articles.price}}€ </h2> 
          <div>
           <span v-for="iter in parseInt(articles.quality)" class="fa fa-star checked big-size" :key="iter"> </span>
            <span v-for="mimmo in (3 - parseInt(articles.quality))" class="fa fa-star big-size" :key="mimmo"> </span>
          </div>
        </b-col>
      </b-row>
  </div>
  -->
  
</div>
</template>




<script>
export default {
    data() {
      return {
        articles: {
          identifier: '4124214124124',
          title: 'BICI',
          brand: 'Cazzi',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAeczzlts-cMyzXTBfrWPi70abmF8Hw9dRQA&usqp=CAU',
          quality: 2,
          price: 100,
          discount: {
            onSale: false,
            onSaleType: false,
            onSaleValue: 0
        },
        },
        clients: [],
        reservations: [],

        selected: 'a',
        options: [
          { value: 'a', text: 'Articoli' },
          { value: 'c', text: 'Clienti' },
          { value: 'p', text: 'Prenotazioni' },
        ]
      }
    },
    methods: {    },
    computed: {    },
  }


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


.checked {
    color: orange;
    border-color: rgb(0, 0, 0);
    border-width: 0.5em;
}
.big-size {
    transform: scale(1.4);
    margin-right: 0.5em;
}
</style>