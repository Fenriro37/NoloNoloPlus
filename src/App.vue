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
        <b-button class="bg-primary" >Cerca</b-button>
      </b-input-group>
    </b-col>

    <b-col cols='1'>
    </b-col>

    <template>
      <div>
        <b-button id="burgerButton" v-b-toggle.sidebar-right><b-img id="burger" src="https://icon-library.com/images/hamburger-menu-icon-png/hamburger-menu-icon-png-2.jpg"></b-img></b-button>
        <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
          <template #default="{ hide }">
            <div class="p-3">
              <nav class="mb-3">
                <b-nav vertical>
                  <router-link to="/createArticle" class="nav-link" >Aggiungi articolo</router-link>
                  <router-link to="/createReservation" class="nav-link" >Aggiungi prenotazione</router-link>
                  <router-link to="/charts" class="nav-link"  >Grafici</router-link>
                  <router-link to="/articleCatalog" class="nav-link" >Catalogo articoli</router-link>
                  <router-link to="/clientCatalog" class="nav-link" >Lista utenti</router-link>
                  <router-link to="/reservationCatalog" class="nav-link" >Lista prenotazioni</router-link>
                  <router-link to="/reservation" class="nav-link" >Esempio prenotazione</router-link>

                  <router-link :to="{path: '/client/' + id}" class="nav-link">Esempio cliente</router-link>

                 

                  <router-link to="/article" class="nav-link" >Esempio articolo</router-link>
                </b-nav>
              </nav>
              <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
            </div>
          </template>
        </b-sidebar>
      </div>
    </template>

  </b-navbar>

  <router-view/>

</div>
</template>




<script>
export default {
    data() {
      return {
        id : 123,
        path: "/client/",
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

#burgerButton{
  width: 30%;
  height: 10%;
}

#burger{ 
  width: 100%;
  height: 100%;
}

</style>