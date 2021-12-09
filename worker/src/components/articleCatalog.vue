<template>
  <div class="container-fluid p-5">
    <div v-for="article in catalog" :key="article._id">
      <b-row>
        <b-col cols="5">
          <b-img thumbnail fluid v-bind:src="article.image"  alt="Image 1"></b-img>
        </b-col>
        <b-col cols="5">
          <h2> <router-link :to="{ name: 'article',  params: { article: article._id} }">{{article.title + ' ' + article.brand }}</router-link></h2>            
          <h2> {{article.price}}€ </h2> 
          <span v-for="i in parseInt(article.quality)" class="fa fa-star checked big-size" :key="i"> </span>
          <span v-for="j in (3 - parseInt(article.quality))" class="fa fa-star big-size" :key="j"> </span>          
        </b-col>          
      </b-row>
    </div>
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

</script>
