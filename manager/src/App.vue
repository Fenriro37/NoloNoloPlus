<template>
<div id="app">
  <nav class="navbar navbar-dark bg-dark">
    <a href="/manager/index.html">
      <img src='https://cdn.discordapp.com/attachments/888778821262790686/926860373775249469/nolonoloplus.png' class="moveright" alt='logo NoloNoloPlus' height='40px'/>
    </a>

    <div class="input-group">
		<button class="btn btn-secondary dropdown-toggle" id="dropNavBar" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{selected}}</button>
		<div class="dropdown-menu dropdown-menu-right">
			<button class="dropdown-item" type="button" v-on:click="selected = 'Articoli'">Articoli</button>
			<button class="dropdown-item" type="button" v-on:click="selected = 'Clienti'">Clienti</button>
			<button class="dropdown-item" type="button" v-on:click="selected = 'Prenotazioni'">Prenotazioni</button>
		</div>
		<input id="searchText" type="text" v-model="text" class="form-control" @keyup.enter="search" placeholder="Cerca..." aria-label="Barra di ricerca" >
		<button class="btn btn-secondary" type="button" id="searchButton" v-on:click="search()">Cerca</button>
	</div>

    <button class="navbar-toggler moveleft" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </nav>

  <div class="collapse text-center text-light bg-dark" id="navbarToggleExternalContent">
    <div class="bg-dark p-2">
      <p><a @click="logOut" href="/public/login.html">Logout</a></p>
      <p><a @click="create" href="javascript:void(null);"> Aggiungi articolo </a></p>
      <p><a @click="analyticsClient" href="javascript:void(null);">Analytics Clienti</a></p>
      <p><a @click="analyticsAll" href="javascript:void(null);">Analytics Catalogo</a></p>
    </div>
  </div>

  <router-view :key="$route.fullPath" @clicked="backToCatalog"></router-view>

</div>
</template>




<script>
import Functions from './functions/function'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

export default {
    data() {
      return {
        catalog: [],
        text: '',
        selected: 'Articoli',
        choice: 0     
      }
    },
    created(){
      Functions.checkCookie()  
    },
    methods: {
      search(){
        this.request = this.text
        if(this.selected == 'Articoli')
          this.$router.push({ name: 'articleCatalog' , params: { filter: this.text}}).catch(()=>{})
        else if(this.selected == 'Clienti')
          this.$router.push({ name: 'clientCatalog', params: { filter: this.text} }).catch(()=>{})
        else
          this.$router.push({ name: 'reservationCatalog', params: { filter: this.text} }).catch(()=>{})
      },

      logOut(){
        this.$cookies.remove("jwt")
      },

      create(){
        this.$router.push({ path: '/createArticle' }).catch(()=>{})
      },

      analyticsClient(){
        this.$router.push({ name: 'clientChart', params: {id: ''} }).catch(()=>{})
      },

      analyticsAll(){
        this.$router.push({ name: 'chartCatalog' }).catch(()=>{})
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
    margin-top: 0.5em;
    margin-bottom: 0.5em;
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

.navbar-toggler{
    width: 40px;
    height: 40px;
    padding: 0;
}

@media (min-width: 500px) {
    .container-fluid {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media (min-width: 768px) {
    .container-fluid {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media (min-width: 992px) {
    .container-fluid {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
}

</style>


