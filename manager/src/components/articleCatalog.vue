<template>

<div class="container-fluid p-2">
  <div v-for="article in catalog" :key="article._id">
    <div class="d-flex justify-content-center align-items-center">
      <div class="card mb-1 mt-1 w-100" style="height: 10em; width:90%; ">
        <div class="card-body h-100 w-100">
          <div class="row h-100">
            <div class="col-5 d-flex align-items-center h-100"> <img class="myImg" tabindex="0" :alt="'immagine '+ article.title + ' ' + article.brand" v-bind:src="article.image"></div>
            <div class="col-7 p-2" style="height:100%;">
              <h2 class="mb-2 text-truncate"> <router-link :to="{ name: 'article',  params: { id: article._id} }">{{article.title + ' ' + article.brand }}</router-link></h2>   
              <div class="row">
                <div class="col-5">
                  <div class="mb-2 price" tabindex="0" :aria-label="'Prezzo fisso: '+discount(article)" v-if="article.discount.onSale"><s>{{article.fixedPrice}}€ </s> {{ discount(article) }}€ </div>
                  <div class="mb-2 price" tabindex="0" :aria-label="'Prezzo fisso: '+article.fixedPrice"   v-else>{{article.fixedPrice}}€</div>
                </div>
                <div class="col-5">
                  <div class="mb-2 price" tabindex="0" :aria-label="'Prezzo giornaliero: '+article.price"> {{article.price }} €/giorno </div> 
                </div>
              </div>
              <div tabindex="0" :aria-label=" article.quality +' stella/e su tre'">
              <span v-for="i in parseInt(article.quality)"  class="fa fa-star checked big-size" :key="i"> </span>
              <span v-for="j in (3 - parseInt(article.quality))" class="fa fa-star big-size" :key="j"> </span>
              </div>
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
        catalog: [],             
      }
    },

    mounted(){
      // (this.$route.params.filter !== undefined) ? this.$route.params.filter : 
      this.getArticles()
    },

    update(){ //non funziona
      this.catalog = []
      this.getArticles()
    },

    methods:{
      getArticles(){
        let filter = (this.$route.params.filter !== undefined) ? this.$route.params.filter : ''
        let query = {
        filter:filter,
        sort: false
        }
        Functions.getAllProduct(query)
        .then( (result) => {
          console.log(result)
          this.catalog = result.data.data
        })
        .catch( (error) => {
          // alert('Problema nel caricamento dei dati');
          this.$router.push({ name: 'home' , params: { filter: ''}})
        }) 
      },
      discount: function (article) {
        if(!article.discount.onSaleType) //flat
          return (article.fixedPrice - article.discount.onSaleValue).toFixed(2);
        else  
          return (article.fixedPrice - article.fixedPrice * article.discount.onSaleValue / 100).toFixed(2);
      },
    },
  }
</script>
<style>

.price {
    font-size: x-large;
}

</style>
