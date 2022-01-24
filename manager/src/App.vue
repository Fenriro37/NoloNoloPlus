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
		<input id="searchText" type="text" v-model="text" class="form-control" placeholder="Cerca..." aria-label="Recipient's username" aria-describedby="button-addon2">
		<button class="btn btn-secondary" type="button" id="searchButton" v-on:click="search()">Cerca</button>
	</div>

    <button class="navbar-toggler moveleft" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </nav>

  <div class="collapse text-center text-light bg-dark" id="navbarToggleExternalContent">
    <div class="bg-dark p-2">
      <p> <a @click="logOut" href="http://localhost:8081/public/login.html">Logout</a></p>
      <p><router-link @click.native="childEvent" :to="{ path: '/createArticle'}">Aggiungi articolo</router-link></p>
      <p><router-link @click.native="childEvent" :to="{ path: '/chartClient'}">Analytics Clienti</router-link></p>
      <p><router-link @click.native="childEvent" :to="{ path: '/chartCatalog'}">Analytics Catalogo</router-link></p>
    </div>
  </div>

  <div>
    {{choice}}
  </div>

  <!-- Articoli -->
  <template v-if="choice == 0">
    <Article :filter="request" @clicked="childEvent" />
  </template>

  <!-- Clienti --> 
  <template v-else-if="choice == 1">
    <Client :filter="request" @clicked="childEvent"/>
  </template>

  <!-- Prenotazioni -->
  <template v-else-if="choice == 2">
    <Reservation :filter="request" @clicked="childEvent"/>
  </template>

  <!-- Tutti gli altri components -->
  <template  v-else-if="choice == 3">
    <router-view :key="$route.fullPath" @clicked="backToCatalog"></router-view>
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
        text: '',
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
      //Functions.loginAsWorker()
      Functions.checkCookie()  

      var currentLocation = window.location;
      console.log(currentLocation.href)
      let shortUrl = currentLocation.href.slice(0, 59);
      let urlArticle = currentLocation.href.slice(0, 49);
      let urlClient = currentLocation.href.slice(0, 48);
      let urlReservation = currentLocation.href.slice(0, 53);
      let urlClientChart = currentLocation.href.slice(0, 53);
      let urlArticleChart = currentLocation.href.slice(0, 54);
      let urlCatalogChart = currentLocation.href.slice(0, 54);
      console.log(shortUrl)
      if(currentLocation == 'http://localhost:8081/manager/index.html#/createArticle' ||
        shortUrl == 'http://localhost:8081/manager/index.html#/createReservation' ||
        urlArticle == 'http://localhost:8081/manager/index.html#/article' ||
        urlClient == 'http://localhost:8081/manager/index.html#/client' ||
        urlReservation == 'http://localhost:8081/manager/index.html#/reservation' ||
        urlClientChart == 'http://localhost:8081/manager/index.html#/chartClient' ||
        urlArticleChart == 'http://localhost:8081/manager/index.html#/chartArticle' ||
        urlCatalogChart == 'http://localhost:8081/manager/index.html#/chartCatalog' ){
        this.choice = 3
      }
    },
    methods: {
      search(){
        this.request = this.text
        if(this.selected == 'Articoli')
          this.choice = 0;
        else if(this.selected == 'Clienti')
          this.choice = 1;
        else
          this.choice = 2;
      },

      childEvent () {
          this.choice = 3 // someValue
      },
      backToCatalog(){
        this.choice = 0
      },

      logOut(){
        this.$cookies.remove("jwt")
      }
      
    }
  }
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

.checked {
    color: orange;
    border-color: rgb(0, 0, 0);
    border-width: 0.5em;
}s

.price {
    font-size: x-large;
}

.input-group {
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}

#burgerButton{
    width: 30%;
    height: 10%;
}
  
#burger{ 
    width: 100%;
    height: 100%;
}

/* css navbar*/
.moveleft{
    margin-right: 40px;
}
.moveright{
    margin-left: 40px;
} 

</style>


