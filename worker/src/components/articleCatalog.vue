<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <b-row>
      <b-col cols="2">
        <b-img thumbnail fluid v-bind:src="articles.image"  alt="Image 1"></b-img>
      </b-col>
      <b-col cols="4">
        <h2>  <router-link to="/article" class="nav-link" >{{articles.title + ' ' + articles.brand}}</router-link></h2>
        <h2> {{articles.price}}€ </h2> 
        <div>
          <span v-for="iter in parseInt(articles.quality)" class="fa fa-star checked big-size" :key="iter"> </span>
          <span v-for="mimmo in (3 - parseInt(articles.quality))" class="fa fa-star big-size" :key="mimmo"> </span>
        </div>
      </b-col>
    </b-row>
  </div>

</template>




<script>
export default {
    data() {
      return {
        articles: 
        {
          identifier: '4124214124124',
          title: 'BICI',
          brand: 'Cazzi',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAeczzlts-cMyzXTBfrWPi70abmF8Hw9dRQA&usqp=CAU',
          quality: 2,
          price: 100,
          discount: {
            onSale: false,
            onSaleType: false,
            onSaleValue: 0
          }  
        }                
      }
    },
    methods: {    },
    computed: {    },
  }


</script>
