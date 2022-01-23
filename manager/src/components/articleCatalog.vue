<template>

<div class="container-fluid p-5">
  <div v-for="article in catalog" :key="article._id">
    <div class="d-flex justify-content-center align-items-center">
      <div class="card mb-1 " style="height: 10em; width:60%; ">
        <div class="card-body h-100">
          <div class="row h-100">
            <div class="col-5 align-items-center h-100"> <img class="myImg" alt="immagine prodotto" v-bind:src="article.image"></div>
            <div class="col-7" style="height:100%;">
              <h2 class="mb-2 text-truncate"> <router-link @click.native="switchComponent" :to="{ name: 'article',  params: { id: article._id} }">{{article.title + ' ' + article.brand }}</router-link></h2>   
              <div class="row">
                <div class="col-5">
                  <div class="mb-2 price" v-if="article.discount.onSale"><s>{{article.fixedPrice}}€ </s> {{ discount(article) }}€ </div>
                  <div class="mb-2 price" v-else>{{article.fixedPrice}}€</div>
                </div>
                <div class="col-5">
                  <div class="mb-2 price"> {{article.price }} €/giorno </div> 
                </div>
              </div>
              <span v-for="i in parseInt(article.quality)" class="fa fa-star checked big-size" :key="i"> </span>
              <span v-for="j in (3 - parseInt(article.quality))" class="fa fa-star big-size" :key="j"> </span>
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
    name: "articleCatalog",
    props : ['filter'],
    watch: { 
      filter: function(newVal, oldVal) { // watch it
        console.log(newVal)
        let query = {
        filter: newVal,
        sort: false
        }
        console.log(query)
        Functions.getAllUser(query)
          .then( (result) => {
          console.log(result)
          this.catalog = result.data.data
        }) 
      }
    },
    data() {
      return {
        catalog: [],             
      }
    },

    created(){
      // (this.$route.params.filter !== undefined) ? this.$route.params.filter : 
      this.getArticles()
    },

    update(){ //non funziona
      this.catalog = []
      this.getArticles()
    },

    methods:{
      getArticles(){
        let query = {
        filter:this.filter,
        sort: false
        }
        console.log(query)
        Functions.getAllProduct(query)
        .then( (result) => {
          console.log(result)
          this.catalog = result.data.data
        }) 
      },
      discount: function (article) {
        if(article.discount.onSaleType) //flat
          return article.fixedPrice - article.discount.onSaleValue;
        else  
          return article.fixedPrice - article.fixedPrice * article.discount.onSaleValue / 100;
      },
      switchComponent (event) {
         this.$emit('clicked')
      }
    },
  }
</script>
<style>

.price {
    font-size: x-large;
}

</style>
