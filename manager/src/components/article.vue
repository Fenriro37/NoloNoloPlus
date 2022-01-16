<template>
  <div>
    <div class="container-fluid p-5">
      <b-row class="mb-5">
        <b-col cols="6">
          <!-- Colonne immagine -->
          <b-img v-bind:src="image" class="img-thumbnail"></b-img>
        </b-col>
        <!-- Colonne informazioni articolo -->
        <b-col cols="4">
          <div id="productidentifier">
            ID: {{ identifier }}          
          </div>   
          <!-- Titolo -->
          <div>
            <h1>{{ title + ' ' + brand }}</h1>
          </div>
          <!-- Etichette -->
          <div class="mb-2">
            <span class="badge rounded-pill bg-primary" v-for="tag in tags" :key="tag">{{ tag }}</span>
          </div>
          <!-- Stars -->
          <div>
            <span v-for="iter in parseInt(quality)" class="fa fa-star checked big-size" :key="iter"> </span>
            <span v-for="mimmo in (3 - parseInt(quality))" class="fa fa-star big-size" :key="mimmo"> </span>
          </div>
          <!-- Prezzo -->
          <div class="mt-3 mb-3">
            <span v-if="discount.onSale" class="price"><s>{{ price }}€</s> <span id="onSalePrice">{{ getDiscountedPrice }}€</span></span>
            <span v-else class="price">{{ price }} €</span>
          </div>
          <!-- Bottoni -->
          <div>
            <router-link v-if="available" :to="{name: 'createReservation', params:{id:identifier, price:price}}" id="rentProduct" class="btn btn-lg btn-secondary">Affitta</router-link>
            <b-button v-else id="rentProduct" class="btn btn-lg btn-secondary" disabled>Affitta</b-button>
            <b-button type="button" class="btn btn-lg " variant="primary" data-bs-toggle="modal" data-bs-target="#myModal" v-on:click="getModalData">Modifica</b-button>
            <b-button type="button" class="btn btn-lg btn-danger" v-on:click="deleteProduct">Elimina</b-button>
            <div class="form-check form-switch big-size">
              <input class="form-check-input custom-switch" type="checkbox" id="flexSwitchCheckDefault" :checked="available" v-model="available" @click="changeInStock">
              <label v-if="available" class="form-check-label" for="flexSwitchCheckDefault">Disattiva articolo</label>
              <label v-else class="form-check-label" for="flexSwitchCheckDefault">Attiva articolo</label>
            </div>
            <!-- Modal da mettere in un altro file???? -->
            <div class="modal" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">Modifica prodotto</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>	
                  </div>
                  <!-- Modal body -->
                  <div class="modal-body">
                    <form>
                      <b-row>
                        <b-col cols="6">
                          <label for="productName" class="form-label">Nome</label>
                        </b-col>
                        <b-col cols="6">
                          <label for="productModel" class="form-label">Marca</label>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col cols="6">
                          <b-form-input  type="text" class="form-control" id="productname" v-model="titleModal" :placeholder="titleModal"></b-form-input>	
                        </b-col>
                        <b-col cols="6">
                          <b-form-input type="text" class="form-control" id="productModel" v-model="brandModal"></b-form-input>	
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <label for="productTags" class="form-label">Etichette (separare con uno spazio)</label>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col>
                          <textarea class="form-control w-80" id="productTags" rows="3" v-model="tagsModal"></textarea>
                        </b-col>
                      </b-row>
                      <!-- da sistemare -->
                      <b-row class="mb-3 d-flex align-items-center justify-content-between">
                        <b-col cols="4">
                          <label for="imageLink" class="form-label">Immagine (link)</label>
                        </b-col>
                        <b-col cols="8">
                          <b-form-input type="text"  class="form-control" id="imageLink" v-model="imageModal"></b-form-input>	
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="6">
                          <label for="productQuality" class="form-label">Qualità</label>
                        </b-col>
                        <b-col cols="6">
                          <label for="productPrice">Prezzo di listino</label>												
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col cols="6">
                          <select class="form-select" v-model="qualityModal">
                            <option :value="1">1 - Condizioni accettabili</option>
                            <option :value="2" selected>2 - Buone condizioni</option>
                            <option :value="3">3 - Come nuovo</option>
                          </select>
                        </b-col>
                        <b-col cols="6">
                          <div class="input-group">
                            <b-form-input type="text" id="productPrice" class="form-control text-end" v-model="priceModal"></b-form-input>	
                            <span class="input-group-text justify-content-center">€</span>
                          </div>
                        </b-col>
                      </b-row>
                      <hr>
                      <b-row class="mb-2 d-flex align-items-center justify-content-between">
                        <b-col cols="6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="onSale" :checked="onSaleModal" v-model="onSaleModal">
                            <label class="form-check-label" for="onSale">Sconto</label>
                          </div>
                        </b-col>
                        <b-col cols="3">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio" 
                              name="discount" 
                              id="discountPercentage" 
                              :value="true" 
                              :disabled="!onSaleModal" 
                              v-model="onSaleTypeModal">
                            <label class="form-check-label" for="discountPercentage">Percentuale</label>
                          </div>
                        </b-col>
                        <b-col cols="3">
                          <div class="form-check">
                            <input
                              id="discountAmount" 	
                              class="form-check-input"
                              type="radio"
                              name="discount"
                              :value="false"
                              :disabled="!onSaleModal" 
                              v-model="onSaleTypeModal" >
                            <label class="form-check-label" for="discountAmount">Fisso</label>													
                          </div>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2 d-flex justify-content-end">
                        <b-col cols="6" class="d-flex align-items-center">
                          Sconto applicato
                        </b-col>
                        <b-col cols="6">
                          <div class="input-group">
                            <span class="input-group-text justify-content-center">-</span>
                            <input
                              type="text"
                              class="form-control text-end"
                              v-model="onSaleValueModal"
                              :disabled="!onSaleModal">
                            <span v-if="discount.onSaleType" id="pd" class="input-group-text justify-content-center">%</span>
                            <span v-else id="pd" class="input-group-text justify-content-center">€</span>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col cols="6" class="d-flex align-items-center">
                          Prezzo scontato
                        </b-col>
                        <b-col cols="6">
                          <div class="input-group">
                            <input 
                              type="text"
                              class="form-control text-end"
                              disabled :placeholder="getDiscountedPriceModal">
                            <span class="input-group-text justify-content-center">€</span>
                          </div>
                        </b-col>
                      </b-row>
                      <hr>
                      <b-row>
                        <b-col >
                          <label for="productDescription" class="form-label">Descrizione</label>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col>
                          <textarea class="form-control w-80" id="productDescription" rows="3" v-model="descriptionModal"></textarea>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <label for="productNote" class="form-label">Note (non sono visibli al cliente)</label>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col >
                          <textarea class="form-control w-80" id="productNote" rows="3" v-model="noteModal"></textarea>
                        </b-col>
                      </b-row>
                    </form>
                  </div>
                  <!-- Modal footer -->
                  <div class="modal-footer d-flex justify-content-between">
                    <b-button type="button" class="float-left" variant="primary" @click="saveData"  data-bs-dismiss="modal">Salva</b-button>  
                    <b-button type="button" class="btn-danger float-right" data-bs-dismiss="modal">Chiudi</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <h3>Descrizione</h3>
      </b-row>
      <b-row class="mb-3 p-3 border border-secondary border-3 bg-white">
        {{ description }}
      </b-row>
      <b-row>
        <h3>Note</h3>
      </b-row>
      <b-row class="mb-3 p-3 border border-secondary border-3 bg-white">
        {{ note }}
      </b-row>
      <b-row>
        <!-- Da qui parte la tabella delle prenotazioni -->
        <h3>Lista prenotazioni</h3>
        <b-form-input  type="text" class="form-control" id="myInput" placeholder="Search.."></b-form-input>
        <br>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID noleggio</th>
              <th>ID cliente</th>
              <th>Inizio noleggio</th>
              <th>Fine noleggio</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <tr v-for="(iter, index) in bookings" :key="index">
              <td><router-link :to="{name: 'reservation', params:{id: iter.id}}">{{iter.id}}</router-link></td>
              <td><router-link :to="{name: 'client', params:{id: iter.clientId}}">{{iter.clientId}}</router-link></td>
              <td >{{iter.startDate.day + '/' + iter.startDate.month + '/' + iter.startDate.year}}</td>
              <td >{{iter.endDate.day + '/' + iter.endDate.month + '/' + iter.endDate.year}}</td>
            </tr>
          </tbody>
        </table>
      </b-row>
    </div>
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap";
  import $ from 'jquery'
  import Functions from '../functions/function'

  export default {
    data() {
      return {
        identifier: '',
        title: '',
        brand: '',
        image: '',
        tags: [],
        quality: 0,
        price: 0,
        discount: {
          onSale: false,
          onSaleType: false,
          onSaleValue: 0
        },
        available: false,
        description: '',
        bookings: [],
        note: '',
        ///////////////////////////
        titleModal: '',
        brandModal: '',
        imageModal: '',
        tagsModal: [],
        qualityModal: 0,
        priceModal: 0,
        onSaleModal: false,
        onSaleTypeModal: false,
        onSaleValueModal: 0,
        descriptionModal: '',
        noteModal: ''
      }
    },

     created() { 
        Functions.getProduct(this.$route.params.id)
        .then((result) => {
          console.log(result)  
          this.identifier = this.$route.params.id
          this.title = result.data.data.obj.title
          this.brand = result.data.data.obj.brand
          this.image = result.data.data.obj.image
          this.tags = result.data.data.obj.tags
          this.quality = result.data.data.obj.quality       
          this.price = result.data.data.obj.price
          
          this.discount.onSale = result.data.data.obj.discount.onSale
          this.discount.onSaleType = result.data.data.obj.discount.onSaleType
          this.discount.onSaleValue = result.data.data.obj.discount.onSaleValue
          this.available = result.data.data.obj.available          
          this.description = result.data.data.obj.description
          this.bookings = result.data.data.obj.bookings
          this.note = result.data.data.obj.note
        }, (error) => {
          alert(error);
        })
    },

    methods: {

      getModalData(){
        this.titleModal = this.title;
        this.brandModal = this.brand;
        this.imageModal = this.image;
        this.tagsModal = this.tags;
        this.qualityModal = this.quality;
        this.priceModal = this.price;
        this.onSaleModal = this.discount.onSale;
        this.onSaleTypeModal = this.discount.onSaleType;
        this.onSaleValueModal = this.discount.onSaleValue;
        this.descriptionModal = this.description;
        this.noteModal = this.note;
      },

      changeInStock(){
        let query = {}
        query.available = !this.available
        Functions.saveDataProduct(this.identifier, query)
        .then( () => {
          alert("Modifica disponibilità riuscita") 
        })
      },

      saveData(){
        let query = {}
        
        if(this.titleModal != this.title) { query.title = this.titleModal }
        if(this.brandModal != this.brand) { query.brand = this.brandModal }
        if(this.imageModal != this.image) { query.image = this.imageModal }
        if(typeof(this.tagsModal) !== 'string' ){
          this.tagsModal = this.tagsModal.join(' ')
        }
        this.tagsModal = this.tagsModal.replace(/,/g, ' ');

        let newTags = [...new Set(this.tagsModal.split(/\s+/))];
        //potrebbe non essere l'ultimo?
        if(newTags[newTags.length - 1] == '') {
          newTags.pop()
        }
        query.tags = newTags
        if(this.qualityModal != this.quality) { query.quality = this.qualityModal }
        if(this.priceModal != this.price) { query.price = this.priceModal }
        query.discount = {}
        if(this.onSaleModal != this.discount.onSale) { query.discount.onSale = this.onSaleModal }
        else{ query.discount.onSale = this.discount.onSale }
        if(this.onSaleTypeModal != this.discount.onSaleType) { query.discount.onSaleType = this.onSaleTypeModal }
        else{ query.discount.onSaleType = this.discount.onSaleType }
        if(this.onSaleValueModal != this.discount.onSaleValue) { query.discount.onSaleValue = this.onSaleValueModal }
        else{ query.discount.onSaleValue = this.discount.onSaleValue }
        if(this.descriptionModal != this.description) { query.description = this.descriptionModal }
        if(this.noteModal != this.note) { query.note = this.noteModal }
        
        console.log(this.identifier)
        Functions.saveDataProduct(this.identifier, query)
        .then(response => {
          if(response.status == '200'){
            this.title = this.titleModal
            this.brand = this.brandModal
            this.image = this.imageModal
            this.tags = newTags
            this.quality = this.qualityModal
            this.price = this.priceModal
            this.discount.onSale = this.onSaleModal
            this.discount.onSaleType = this.onSaleTypeModal 
            this.discount.onSaleValue = this.onSaleValueModal 
            this.description = this.descriptionModal
            this.note = this.noteModal
          }
        }) 
      }, 
      
      deleteProduct(){
        if(this.bookings.length === 0){
          Functions.deleteProduct(this.identifier)
          .then( () =>{
            this.$router.push({name: 'articleCatalog'  , params: {filter: ""}})
          })
        }         
        else{
          for(let i in this.bookings){
            let bookingDate = this.bookings[i].endDate.year + '-' + this.bookings[i].endDate.month + '-' +  this.bookings[i].endDate.day
            let current = new Date();      
            current = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate() 
            if(bookingDate >= current  )   return(alert('Il prodotto ha ancora prenotazioni attive'))
          }
          Functions.deleteProduct(this.identifier)
          .then( () =>{
            this.$router.push({name: 'articleCatalog'  , params: {filter: ""}})
          })                   
        } 
      }


    },
    computed: {
      getTagsModal() {
        var x = ""
        var index = 0
        for(index in this.tagsModal) {
          x += this.tagsModal[index] + "\n"
        }
        return x
      },
      getDiscountedPrice() {
        if(this.discount.onSaleType) {
          return (this.price - this.price * this.discount.onSaleValue / 100).toFixed(2);
        } else {
          return (this.price - this.discount.onSaleValue).toFixed(2);
        }
      },
      getDiscountedPriceModal() {
        if(this.onSaleTypeModal) {
          return (this.priceModal - this.priceModal * this.onSaleValueModal / 100).toFixed(2);
        } else {
          return (this.priceModal - this.onSaleValueModal).toFixed(2);
        }
      },
    },
  }
  //////////////////////////////////////FINE VUE - INIZIO JS///////////////////////////////////////
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';