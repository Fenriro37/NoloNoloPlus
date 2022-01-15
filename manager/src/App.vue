<template>
<div id="app">
  <nav class="navbar navbar-dark bg-dark">
    <a href="/manager/index.html">
      <img src='https://cdn.discordapp.com/attachments/888778821262790686/926860373775249469/nolonoloplus.png' class="moveright" alt='logo NoloNoloPlus' height='40px'/>
    </a>

    <div class="input-group ">
		<button class="btn btn-secondary dropdown-toggle" id="dropNavBar" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{selected}}</button>
		<div class="dropdown-menu dropdown-menu-right">
			<button class="dropdown-item" type="button" v-on:click="selected = 'Articoli'">Articoli</button>
			<button class="dropdown-item" type="button" v-on:click="selected = 'Clienti'">Clienti</button>
			<button class="dropdown-item" type="button" v-on:click="selected = 'Prenotazioni'">Prenotazioni</button>
		</div>
		<input id="searchText" type="text" v-model="request" class="form-control" placeholder="Cerca..." aria-label="Recipient's username" aria-describedby="button-addon2">
		<button class="btn btn-secondary" type="button" id="searchButton" v-on:click="search()">Cerca</button>
	</div>

    <button class="navbar-toggler moveleft" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </nav>

  <div class="collapse text-center text-light bg-dark" id="navbarToggleExternalContent">
    <div class="bg-dark p-2">
    <p class="">Login/Logout</p>
    <router-link to="/createArticle">Aggiungi articolo</router-link>
    <br>
    <router-link to="/chart"  >Grafici</router-link>
    </div>
  </div>

  <!-- Articoli -->
  <template v-if="choice == 0">
    <Article :filter="request"/>
  </template>

  <!-- Clienti --> 
  <template v-else-if="choice == 1">
    <Client :filter="request"/>
  </template>

  <!-- Prenotazioni -->
  <template v-else-if="choice == 2">
    <Reservation :filter="request"/>
  </template>

  <!-- Tutti gli altri components -->
  <template  v-else-if="choice == 3">
    <router-view :key="$route.fullPath"></router-view>
  </template>

</div>
</template>




<script>
import Functions from './functions/function'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";
import Article from './components/articleCatalog'
import Client from './components/clientCatalog'
import Reservation from './components/reservationCatalog';

export default {
    data() {
      return {
        catalog: [],
        request: '',
        selected: 'Articoli',
        choice: 0     
      }
    },
    components: {
      Article,
      Client,
      Reservation
    },
    created(){
      Functions.loginAsWorker()

      console.log("ccccc")
      
    },
    methods: {
      search(){
        if(this.selected == 'Articoli')
          this.choice = 0;
        else if(this.selected == 'Clienti')
          this.choice = 1;
        else
          this.choice = 2;
      }
    }
  }



/*

<style>
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

#burgerButton{
  width: 30%;
  height: 10%;
}

#burger{ 
  width: 100%;
  height: 100%;
}
</style>
*/
</script>

<style>
html {
    height: auto;
    min-height: 100% !important;
    background-color: rgba(77, 76, 76, 0.118);
}
body {
    font-family: tahoma;
    background-color: transparent;
    height: 100%;
}
.container-fluid {
    margin-left: auto;
    margin-right: auto;
    background-color: transparent;
}
.myImg {
    border: 0px;
    display: block;
    max-height: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
} 
/* padding: 0.5em;
background-color: rgb(156, 156, 156); */
.input-group {
    margin-left: auto;
    margin-right: auto;
    width: 60%;
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

#burgerButton{
    width: 30%;
    height: 10%;
  }
  
#burger{ 
    width: 100%;
    height: 100%;
  }


.heigt-group{
    height: 2em;
}

#formButtons{
    visibility: hidden;
}

/* usato per nascondere select in navbar.html */
.invisible{
    display: none;
}

/* css navbar*/
.moveleft{
    margin-right: 40px;
}
.moveright{
    margin-left: 40px;
}

.navbar-toggler{
    width: 40px;
    height: 40px;
    padding: 0;
}


/* creazione articolo*/
.delete {
    float: right;
    margin: 0;
  }
  

</style>


