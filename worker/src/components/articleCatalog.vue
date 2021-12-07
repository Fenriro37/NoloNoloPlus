<template>
  <!-- v-for:articles/clients/reservations {html di uno }-->
  
  <div class="container-fluid p-5">
    <ul>
      <li v-for="article in catalog" :key="article._id">
        <b-row>
          <b-col cols="5">
            <b-img thumbnail fluid v-bind:src="article.image"  alt="Image 1"></b-img>
          </b-col>
          <b-col cols="5">
            <h2> <router-link :to="{ name: 'article',  params: { article: article._id} }">{{article.title + ' ' + article.brand + ' ' + article._id}}</router-link></h2>            
            <h2> {{article.price}}€ </h2>             
          </b-col>
          
        </b-row>
      </li>
    </ul>
  </div>

</template>




<script>
import Functions from '../functions/function'
export default {
  //cast a intero
    data() {
      return {
        catalog: []                
      }
    },

    created(){
      Functions.getAllProduct()
        .then( (result) => {
          console.log(result)
          this.catalog = result.data.data
        }) 
    },
    methods: {    },
  }
/* 
<div>
              <span v-for="iter in parseInt(article.quality)" class="fa fa-star checked big-size" :key="iter"> </span>
              <span v-for="mimmo in (3 - parseInt(article.quality))" class="fa fa-star big-size" :key="mimmo"> </span>
            </div> 
            
            */
</script>
