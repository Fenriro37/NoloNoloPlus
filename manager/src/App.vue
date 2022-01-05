<template>
<div id="app">
  <b-navbar toggleable="lg" type="dark" variant="dark">

    <b-col cols='1'>
    </b-col>

    <b-col cols='6'>
      <b-input-group class="noborder">
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <b-form-input id="ricerca" placeholder="Search..." v-model="search"></b-form-input>
        <b-button @click="$router.push({name: selected + 'Catalog', params: {filter: search}}).catch(()=>{});">Click to Navigate</b-button>
      </b-input-group>
    </b-col>

    <b-col cols='1'>
    </b-col>

    <template>
      <div>
        <b-button id="burgerButton" v-b-toggle.sidebar-right><b-img id="burger" src="https://icon-library.com/images/hamburger-menu-icon-png/hamburger-menu-icon-png-2.jpg"></b-img></b-button>
        <b-sidebar id="sidebar-right" title="Operazioni" right shadow>
          <template #default="{ hide }">
            <div class="p-3">
              <nav class="mb-3">
                <b-nav vertical>
                  <router-link to="/home" class="nav-link" >Home</router-link>
                  <router-link to="/createArticle" class="nav-link" >Aggiungi articolo</router-link>
                  <router-link :to="{name: 'chart', params: {products: articles}}" class="nav-link"  >Grafici</router-link>

                  <a>Login/Logout</a>
                </b-nav>
              </nav>
              <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
            </div>
          </template>
        </b-sidebar>
      </div>
    </template>

  </b-navbar>
  <router-view :key="$route.fullPath"></router-view>

</div>
</template>




<script>
import Functions from './functions/function'
export default {
    data() {
      return {
        articles: [],
        search: '',
        selected: 'article',
        options: [
          { value: 'article', text: 'Articoli' },
          { value: 'client', text: 'Clienti' },
          { value: 'reservation', text: 'Prenotazioni' },
        ]       
      }
    },
    created(){
      Functions.loginAsWorker()
      
    },


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

#burgerButton{
  width: 30%;
  height: 10%;
}

#burger{ 
  width: 100%;
  height: 100%;
}

</style>