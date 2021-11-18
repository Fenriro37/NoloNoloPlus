<template>
  <div>
    <div class="container-fluid p-5">
      <div class="row mb-5">
        <div class="col-6">
          <!-- Colonne immagine -->
          <img v-bind:src="image" class="img-thumbnail">
        </div>
        <!-- Colonne informazioni articolo -->
        <div class="col-6">
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
            <button type="button" id="rentProduct" class="btn btn-lg btn-secondary">Affitta</button>
            <button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" v-on:click="getModalData">Modifica</button>
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
                      <div class="row">
                        <div class="col-6">
                          <label for="productName" class="form-label">Nome</label>
                        </div>
                        <div class="col-6">
                          <label for="productModel" class="form-label">Marca</label>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6">
                          <input type="text" class="form-control" id="productname" v-model="titleModal" :placeholder="titleModal">	
                        </div>
                        <div class="col-6">
                          <input type="text" class="form-control" id="productModel" v-model="brandModal">	
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label for="productTags" class="form-label">Etichette (separare con uno spazio)</label>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <textarea class="form-control w-80" id="productTags" rows="3" v-model="tagsModal"></textarea>
                        </div>
                      </div>
                      <!-- da sistemare -->
                      <div class="row mb-3 d-flex align-items-center justify-content-between">
                        <div class="col-4">
                          <label for="imageLink" class="form-label">Immagine (link)</label>
                        </div>
                        <div class="col-8">
                          <input type="text" class="form-control" id="imageLink" v-model="imageModal">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <label for="productQuality" class="form-label">Qualità</label>
                        </div>
                        <div class="col-6">
                          <label for="productPrice">Prezzo di listino</label>												
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6">
                          <select class="form-select" v-model="qualityModal">
                            <option :value="1">1 - Condizioni accettabili</option>
                            <option :value="2" selected>2 - Buone condizioni</option>
                            <option :value="3">3 - Come nuovo</option>
                          </select>
                        </div>
                        <div class="col-6">
                          <div class="input-group">
                            <input type="text" id="productPrice" class="form-control text-end" v-model="priceModal">
                            <span class="input-group-text justify-content-center">€</span>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="row mb-2 d-flex align-items-center justify-content-between">
                        <div class="col-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="onSale" :checked="onSaleModal" v-model="onSaleModal">
                            <label class="form-check-label" for="onSale">Sconto</label>
                          </div>
                        </div>
                        <div class="col-3">
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
                        </div>
                        <div class="col-3">
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
                        </div>
                      </div>
                      <div class="row mb-2 d-flex justify-content-end">
                        <div class="col-6 d-flex align-items-center">
                          Sconto applicato
                        </div>
                        <div class="col-6">
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
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 d-flex align-items-center">
                          Prezzo scontato
                        </div>
                        <div class="col-6">
                          <div class="input-group">
                            <input 
                              type="text"
                              class="form-control text-end"
                              disabled :placeholder="getDiscountedPriceModal">
                            <span class="input-group-text justify-content-center">€</span>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col">
                          <label for="productDescription" class="form-label">Descrizione</label>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <textarea class="form-control w-80" id="productDescription" rows="3" v-model="descriptionModal"></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label for="productNote" class="form-label">Note (non sono visibli al cliente)</label>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <textarea class="form-control w-80" id="productNote" rows="3" v-model="noteModal"></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- Modal footer -->
                  <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-primary float-left" @click="saveData"  data-bs-dismiss="modal">Salva</button>  
                    <button type="button" class="btn btn-danger float-right" data-bs-dismiss="modal">Chiudi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <h3>Descrizione</h3>
      </div>
      <div class="row mb-3 p-3 border border-secondary border-3 bg-white">
        {{ description }}
      </div>
      <div class="row">
        <h3>Note</h3>
      </div>
      <div class="row mb-3 p-3 border border-secondary border-3 bg-white">
        {{ note }}
      </div>
      <div class="row">
        <!-- Da qui parte la tabella delle prenotazioni -->
        <h3>Lista prenotazioni</h3>
        <input class="form-control" id="myInput" type="text" placeholder="Search..">
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
              <td><a href="#" >{{iter.id}}</a></td>
              <td><a href="#" >{{iter.clientId}}</a></td>
              <td >{{iter.startDate}}</td>
              <td >{{iter.endDate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button v-on:click="productButton('61790b14c9f1f2e35c109866')">GetCar</button>
    <button v-on:click="productButton('616fe38696d1e399a0d12244')">GetBike</button>
    <button v-on:click="productButton('6179508e9013db333732f9eb')">GetMotorcycle</button>
    
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap";
  import $ from 'jquery'
  import Functions from '../src/functions/function'
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
    methods: {
      productButton(id) {
        var myData = {};
        Functions.getProduct(id)
        .then((response) => {
        myData = response.data;
        this.identifier = myData._id;   
        this.title = myData.title;
        this.brand = myData.brand;
        this.image = myData.image;
        this.tags = myData.tags;
        this.quality = myData.quality;
        this.price = myData.price;
        this.discount = myData.discount;
        this.available = myData.available;
        this.description = myData.description;
        this.note = myData.note;
        this.bookings = myData.bookings;


        }, (error) => {
          console.log(error);
        });
      },

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
        Functions.updateProduct(this.identifier, !this.available)
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
html {
    height: auto;
    min-height: 100% !important;
    background-color: #294870;
}
body {
    font-family: tahoma;
    background-color: transparent;
    height: 100%;
}
.container-fluid {
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(201, 201, 238);
}
.img-thumbnail {
    padding: 0.5em;
    background-color: rgb(156, 156, 156);
    border: 0px;
    display: block;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}
.input-group {
    margin-left: auto;
    margin-right: auto;
}
.checked {
    color: orange;
    border-color: rgb(0, 0, 0);
    border-width: 0.5em;
}
.price {
    font-size: x-large;
}
.input-group-text {
    width: 2.5em;
}
#myDDButton {
    background-color: hsl(0, 0%, 82%);
}
.big-size {
    transform: scale(1.4);
    margin-right: 0.5em;
}
.badge {
    font-size: medium;
    margin-right: 0.125em;
}
.btn-lg {
    margin-right: 0.5em;
    margin-bottom: 0.5rem;
}
#onSalePrice {
    color: rgb(232, 38, 38);
}
.form-switch {
    margin-left: 7.2em;
}
.custom-switch {
    margin-right: 0.5em;
}
#rentProduct {
    color: black;
    background-color: rgb(254, 165, 45);
    border-color: rgb(254, 165, 45);
}
</style>