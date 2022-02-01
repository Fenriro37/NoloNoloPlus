<template>
  
<div class="container-fluid ">
  <button class="btn btn-secondary dropdown-toggle mt-2" id="dropNavRes" aria-label="selettore delle prenotazioni" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{text}}</button>
  <div class="dropdown-menu dropdown-menu-right">
    <button class="dropdown-item" type="button" v-on:click="selectedFilter = 'all'; changeFilter()">Tutte</button>
    <button class="dropdown-item" type="button" v-on:click="selectedFilter = 'active'; changeFilter()">Attive</button>
    <button class="dropdown-item" type="button" v-on:click="selectedFilter = 'old'; changeFilter()">Passate</button>
  </div>

  <div  v-for="reservation in reservations" :key="reservation._id">
    <div class="d-flex justify-content-center align-items-center">
      <div class="card mb-1 " style="height: 10em; width:60%; ">
        <div class="card-body h-100">
          <div class="row h-100">
            <div class="col-5 align-items-center h-100"> <img class="myImg " tabindex="0" :alt="'immagine' + reservation.productTitle + ' ' + reservation.productBrand "  v-bind:src="reservation.productImage"></div>
            <div class="col-7" style="height:100%;"> 
              <h4 class="text-truncate">Id: <router-link :aria-label="'Id prenoatazione'+  reservation._id" :to="{name: 'reservation', params: {id: reservation._id}}">{{reservation._id}}</router-link></h4>
              <h4 class="text-truncate">Articolo: <router-link :aria-label="'Articolo prenotato: '+ reservation.productTitle + ' ' + reservation.productBrand" :to="{name: 'article',  params: { id: reservation.productId}}">{{reservation.productTitle + ' ' + reservation.productBrand}}</router-link></h4>
              <h4 class="text-truncate">Cliente: <router-link :aria-label="'email cliente prenotante' + reservation.clientEmail" :to="{name: 'client', params: {email: reservation.clientEmail}}">{{reservation.clientEmail}}</router-link></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Functions from '../functions/function'
export default {
    data() {
      return {
        text: 'Tutte',
        reservations: [],
        catalog: [],
        selectedFilter: 'all',
      }
    },

    mounted(){
      let filter = (this.$route.params.filter !== undefined) ? this.$route.params.filter : ''
      let query = {
       filter: filter,
       sort: false
      }
      Functions.getAllReservation(query)
        .then( (result) => {
          console.log(result)
          this.catalog = result.data.obj
          for(let i in this.catalog){
            this.reservations.push(this.catalog[i])
          }
        })
        .catch( (error) => {
          alert('Problema nel caricamento dei dati');
          this.$router.push({ name: 'home' , params: { filter: ''}})
        }) 
    },
    methods: {
      changeFilter() {
        const current = new Date();      
        const currentDate = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate()
        //tutti i noleggi
        this.reservations = []
        if (this.selectedFilter == "all"){
          this.text = 'Tutte'
          for(let i in this.catalog){
            this.reservations.push(this.catalog[i])
          }
        }
        //noleggi attivi
        else if(this.selectedFilter == "active"){
          this.text = 'Attive'
          for(let i in this.catalog){
            let endReservation = this.catalog[i].endDate.year + '-' + this.catalog[i].endDate.month + '-' + this.catalog[i].endDate.day
            if(currentDate <= endReservation)
              this.reservations.push(this.catalog[i])
          }
        }
        //noleggi finiti
        else if(this.selectedFilter == "old"){
          this.text = 'Passate'
          for(let i in this.catalog){
            let endReservation = this.catalog[i].endDate.year + '-' + this.catalog[i].endDate.month + '-' + this.catalog[i].endDate.day
            if(currentDate >= endReservation)
              this.reservations.push(this.catalog[i])
          }
        }
      },
    },
    computed: {    },
  }

</script>