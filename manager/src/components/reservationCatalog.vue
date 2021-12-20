<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <b-form-select  v-model="selectedFilter"  :options="reservationFilter" @change="changeFilter()">Filtra</b-form-select>
    <div  v-for="reservation in reservations" :key="reservation._id">
      <b-row>
        <b-col cols="3">
          <b-img thumbnail fluid v-bind:src="reservation.image"  alt="Image 1"></b-img>
        </b-col>
        <b-col cols="6">
          <h2>Id prenotazione:<router-link :to="{name: 'reservation', params: {id: reservation._id}}">{{reservation._id}}</router-link></h2>
          <h2>{{reservation.clientName + ' ' + reservation.clientSurname}}
          <h2><router-link :to="{name: 'client', params: {email: reservation.clientEmail}}">{{reservation.clientEmail}}</router-link></h2>
          <h2><router-link :to="{ name: 'article',  params: { id: reservation.productId}}">{{reservation.productTitle + ' ' + reservation.productBrand}}</router-link></h2>            
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import Functions from '../functions/function'
export default {
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
       filter: this.$route.params.filter,
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
      }
    },
    computed: {    },
  }


/*
<b-img thumbnail fluid :src="reservations.productImage"  alt="Image 1"></b-img>
*/ 
</script>