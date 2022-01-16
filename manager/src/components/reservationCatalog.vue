<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
<div class="container-fluid p-5">
  <b-form-select  v-model="selectedFilter"  :options="reservationFilter" @change="changeFilter()">Filtra</b-form-select>

  <div  v-for="reservation in reservations" :key="reservation._id">
    <div class="d-flex justify-content-center align-items-center">
      <div class="card mb-1 " style="height: 10em; width:60%; ">
        <div class="card-body h-100">
          <div class="row h-100">
            <div class="col-5 align-items-center h-100"> <img class="myImg " alt="immagine prodotto"  v-bind:src="reservation.productImage"></div>
            <div class="col-7" style="height:100%;"> 
              <h4 class="text-truncate">Id: <router-link @click.native="switchComponent" :to="{name: 'reservation', params: {id: reservation._id}}">{{reservation._id}}</router-link></h4>
              <h4 class="text-truncate">Articolo: <router-link @click.native="switchComponent" :to="{name: 'article',  params: { id: reservation.productId}}">{{reservation.productTitle + ' ' + reservation.productBrand}}</router-link></h4>
              <h4 class="text-truncate">Cliente: <router-link @click.native="switchComponent" :to="{name: 'client', params: {email: reservation.clientEmail}}">{{reservation.clientEmail}}</router-link></h4>
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
    name: "ReservationCatalog",
    props : ['filter'],
    data() {
      return {
        reservations: [],
        catalog: [],
        selectedFilter: 'all',
        reservationFilter: [
          { value: 'all', text: 'Tutte' },
          { value: 'active', text: 'Attive' },
          { value: 'old', text: 'Passate' },
        ]
      }
    },

    created(){
      let query = {
       filter: this.filter,
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
    },
    methods: {
      changeFilter() {
        const current = new Date();      
        const currentDate = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate()
        //tutti i noleggi
        this.reservations = []
        if (this.selectedFilter == "all"){
          for(let i in this.catalog){
            this.reservations.push(this.catalog[i])
          }
        }
        //noleggi attivi
        else if(this.selectedFilter == "active"){
          for(let i in this.catalog){
            let endReservation = this.catalog[i].endDate.year + '-' + this.catalog[i].endDate.month + '-' + this.catalog[i].endDate.day
            if(currentDate <= endReservation)
              this.reservations.push(this.catalog[i])
          }
        }
        //noleggi finiti
        else if(this.selectedFilter == "old"){
          for(let i in this.catalog){
            let endReservation = this.catalog[i].endDate.year + '-' + this.catalog[i].endDate.month + '-' + this.catalog[i].endDate.day
            if(currentDate >= endReservation)
              this.reservations.push(this.catalog[i])
          }
        }
      },
      switchComponent (event) {
         this.$emit('clicked')
      }
    },
    computed: {    },
  }

</script>