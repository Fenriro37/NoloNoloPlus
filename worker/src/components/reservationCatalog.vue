<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <b-row>
      <b-col cols="2">
        <b-img thumbnail fluid :src="reservations.productImage"  alt="Image 1"></b-img>
      </b-col>
      <b-col cols="3">
        <h2><router-link to="/client" class="nav-link">{{reservations.clientEmail}}</router-link></h2>
        <h2><router-link to="/article" class="nav-link">{{reservations.articleId}}</router-link></h2>
        <h2>{{reservations.articleTitle + ' ' + reservations.articlesBrand}}</h2>
      </b-col>
      <b-col cols="3">
        <h3>Inizio prenotazione: {{reservations.startDay + "/" + reservations.startMonth + "/" + reservations.startYear}}</h3>
        <h3>Fine prenotazione: {{reservations.endDay + "/" + reservations.endMonth + "/" + reservations.endYear}}</h3>
        <b-form-checkbox :checked="reservations.rentalOccurred" disabled>Avvenuto Ritiro</b-form-checkbox>
        <b-form-checkbox :checked="reservations.returned" disabled>Avvenuta Restituzione</b-form-checkbox>
      </b-col>
    </b-row>
  </div>

</template>

<script>
export default {
    data() {
      return {
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
    methods: {    },
    computed: {    },
  }


</script>