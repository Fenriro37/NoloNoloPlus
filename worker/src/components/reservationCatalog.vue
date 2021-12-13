<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <div  v-for="reservation in catalog" :key="reservation._id">
      <b-row>
        <b-col cols="3">
          <b-img thumbnail fluid v-bind:src="reservation.image"  alt="Image 1"></b-img>
        </b-col>
        <b-col cols="6">
          <h2>Id prenotazione:<router-link :to="{name: 'reservation', params: {id: reservation._id}}">{{reservation._id}}</router-link></h2>
          <h2>{{reservation.clientName + ' ' + reservation.clientSurname}}
          <h2><router-link :to="{name: 'client', params: {email: reservation.clientEmail}}">{{reservation.clientEmail}}</router-link></h2>
          <h2>{{reservation.productTitle + ' ' + reservation.productBrand}}</h2>
          <h2><router-link :to="{ name: 'article',  params: { article: reservation.productId}}">{{reservation.productId}}</router-link></h2>            
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
        catalog: [],
        reservations: 
        {
          clientEmail:'mario.draghi@gmail.com',
          articleId:'156945145614',
          articleTitle:'Bici',
          articlesBrand:'deGasperi',
          productImage:'https://acquisti.corriere.it/wp-content/uploads/2021/05/BIciclette-Via-Veneto.jpeg',
          startYear: '1990',
          startMonth: '12',
          startDay: '10',
          endYear: '1990',
          endMonth: '12',
          endDay: '30',
          rentalOccurred: true,
          returned: false,  
        }                
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
        }) 
    },
    methods: {    },
    computed: {    },
  }


/*
<b-img thumbnail fluid :src="reservations.productImage"  alt="Image 1"></b-img>
*/ 
</script>