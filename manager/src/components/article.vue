<template>
<div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">
      <div class="row mb-3 mt-3">
        <!-- Colonne immagine -->
        <div class="col-6 d-flex align-items-center" style="height: 15em;">
          <img id="img" class="myImg" alt="immagine prodotto" v-bind:src="image">
        </div>

        <div class="col-6">
          <div id="productidentifier">
            <span> ID: {{ identifier }} </span>      
          </div> 
          <!-- Titolo -->
          <div>
            <h4>{{ title + ' ' + brand }}  </h4>
          </div>
          <!-- Stars -->
          <div>
            <span v-for="iter in parseInt(quality)" class="fa fa-star checked big-size" :key="iter"> </span>
            <span v-for="mimmo in (3 - parseInt(quality))" class="fa fa-star big-size" :key="mimmo"> </span>
          </div>
          <div class="mt-1 mb-1">
            <span  class="">{{'Prezzo Fisso: ' + fixedPrice +'€' }} <span id="fixedPrice"></span>
          </div>
            <!-- Prezzo -->
          <div class="mt-1 mb-1">
            <span v-if="discount.onSale" class=""> <span id="onSalePrice">{{'Prezzo fisso scontato: ' + getDiscountedPrice }}€</span></span>
          </div>
          <div class="mt-1 mb-1">
            <span  class="">{{'Prezzo giornaliero: ' + dailyPrice +'€/giorno' }} <span id="PriceforDay"></span>
          </div>
          <div class="mt-1 mb-1">
            <span  class="">{{'Noleggia oltre ' + overDays.days + ' giorni per ricevere sconto giornaliero'}} <span id="fixedPrice"></span>
          </div>

        </div>
      </div>
      <!-- Bottoni -->
      <div class="row d-flex justify-content-between">
        <div class="col align-items-center">
          <router-link v-if="available" :to="{name: 'createReservation', params:{id:identifier, price:price}}" id="rentProduct" class="btn btn-lg btn-warning m-1">Affitta</router-link>
          <b-button v-else id="rentProduct" class="btn btn-lg btn-secondary m-1" disabled>Affitta</b-button>
          <b-button type="button" class="btn btn-lg m-1" variant="primary" data-bs-toggle="modal" data-bs-target="#myModal" v-on:click="getModalData">Modifica</b-button>
          <b-button type="button" class="btn btn-lg btn-danger m-1" :disabled="boolDelete" v-on:click="deleteProduct">Elimina</b-button>
          <router-link :to="{ name: 'chartArticle', props: {id: identifier}}" :disabled="bookings.length === 0" class="btn btn-lg btn-warning m-1"> Analytics </router-link>
        </div>
      </div>

      <div class="form-check form-switch ">
        <input class="form-check-input custom-switch " type="checkbox" id="flexSwitchCheckDefault" :checked="available" v-model="available" @click="changeInStock">
        <label v-if="available" class="form-check-label" for="flexSwitchCheckDefault">Disattiva articolo</label>
        <label v-else class="form-check-label" for="flexSwitchCheckDefault">Attiva articolo</label>
      </div>

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
                      <b-col cols="6" class="mt-2 mb-3">
                        <label for="productQuality" class="form-label">Qualità</label>
                      </b-col>
                      <b-col cols="6" class="mt-2 mb-3">
                        <select class="form-select" v-model="qualityModal">
                          <option :value="1">1 - Condizioni accettabili</option>
                          <option :value="2" selected>2 - Buone condizioni</option>
                          <option :value="3">3 - Come nuovo</option>
                        </select>
                      </b-col>
                      <hr>
                    <b-row >
                      <b-col cols="6" class="mt-3 mb-3">
                        <label for="productPrice">Prezzo Fisso</label>												
                      </b-col>
                      <b-col cols="6" class="mt-2 mb-2">
                        <div class="input-group">
                          <b-form-input type="text" id="productPrice" class="form-control text-end" v-model="fixedModal"></b-form-input>	
                          <span class="input-group-text justify-content-center">€</span>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2 d-flex align-items-center justify-content-between">
                      <b-col cols="6">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="onSale" :checked="onSaleModal" @click="changeOnSale">
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
                            :checked="onSaleModal && onSaleTypeModal"
                            @click="changeDiscountType">
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
                            :checked="onSaleModal && onSaleTypeModal == false"
                            @click="changeDiscountType" >
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
                            min="1"
                            step="1"
                            v-model="onSaleValueModal"
                            :disabled="!onSaleModal">
                          <span v-if="onSaleTypeModal" id="pd" class="input-group-text justify-content-center">%</span>
                          <span v-else id="pd" class="input-group-text justify-content-center">€</span>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col cols="6" class="d-flex align-items-center">
                        Prezzo Fisso scontato 
                      </b-col>
                      <b-col cols="6">
                        <div class="input-group">
                          <input 
                            type="text"
                            class="form-control text-end"
                            disabled :placeholder="getDiscountedModal">
                          <span class="input-group-text justify-content-center">€</span>
                        </div>
                      </b-col>
                    </b-row>
                    <hr>
                      <b-row >
                      <b-col cols="6" class="mt-3 mb-3">
                        <label for="dailyPrice">Prezzo Giornaliero</label>												
                      </b-col>
                      <b-col cols="6" class="mt-2 mb-2">
                        <div class="input-group">
                          <b-form-input type="text" id="dailyPrice" class="form-control text-end" v-model="dailyModal"></b-form-input>	
                          <span class="input-group-text justify-content-center">€</span>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2 d-flex align-items-center justify-content-between">
                      <b-col cols="6">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="overSale" :checked="overSaleModal" @click="changeOnSaleOverDays">
                          <label class="form-check-label" for="overSale">Sconto</label>
                        </div>
                      </b-col>
                      <b-col cols="3">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio" 
                            name="discountOver" 
                            id="overPercentage"
                            :value="true" 
                            :disabled="!overSaleModal" 
                            :checked="overSaleModal && overSaleTypeModal == true"
                            @click="changeDiscountTypeOverDays">
                          <label class="form-check-label" for="discountPercentage">Percentuale</label>
                        </div>
                      </b-col>
                      <b-col cols="3">
                        <div class="form-check">
                          <input
                            id="overFlat" 	
                            class="form-check-input"
                            type="radio"
                            name="discountOver" 
                            :value="false"
                            :disabled="!overSaleModal" 
                            :checked="overSaleModal && overSaleTypeModal == false"
                            @click="changeDiscountTypeOverDays" >
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
                            min="1"
                            step="1"
                            v-model="overSaleValueModal"
                            :disabled="!overSaleModal">
                          <span v-if="overSaleTypeModal" id="pd" class="input-group-text justify-content-center">%</span>
                          <span v-else id="pd" class="input-group-text justify-content-center">€</span>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col cols="6" class="d-flex align-items-center">
                        Giorni per sconto
                      </b-col>
                      <b-col cols="6">
                        <div class="input-group">
                          <input 
                            type="number"
                            class="form-control text-end"
                            min="1"
                            step="1"
                            :disabled="!overSaleModal"
                            v-model="overDaysModal">
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
      <!-- Etichette -->
      <div class="row">
        <h3>Categorie</h3>
        <div class="mb-2">
          <span class="badge rounded-pill bg-primary" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

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
      <template v-if="bookings.length !== 0">
        <!-- Da qui parte la tabella delle prenotazioni -->
        <h3>Lista prenotazioni</h3>
        <div class="p-3">
          <b-row>
            <b-table hover :items="bookings" :fields="fields">
              <!-- item è la riga -->
              <template v-slot:cell(email)="{ item }">
                <router-link :to="{ name: 'client',  params: { email: item.clientId}}">{{ item.clientId }}</router-link>
              </template>
              <template v-slot:cell(totale)="{ item }">
                <span>{{ item.total + '€'}}</span>
              </template>
              <template v-slot:cell(prenotazione)="{ item }">
                <router-link :to="{ name: 'reservation',  params: { id: item.reservationId}}">{{ item.reservationId }}</router-link>
              </template>
              <template v-slot:cell(inizio)="{ item }">
                <span>{{item.startDate.day + '-'+item.startDate.month+'-'+item.startDate.year}}</span>
              </template>
              <template v-slot:cell(fine)="{ item }">
                <span>{{item.endDate.day + '-'+ item.endDate.month +'-'+ item.endDate.year}}</span>
              </template>
            </b-table>
          </b-row>
        </div>
      </template>
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
        fixedPrice: 0,
        dailyPrice: 0,
        overDays:{
          days: '',
          onSale: false,
          onSaleType: false,
          onSaleValue: false
        },
        discount: {
          onSale: false,
          onSaleType: false,
          onSaleValue: 0
        },
        description: '',
        note: '',
//////////////////////////////////
        titleModal: '',
        brandModal: '',
        imageModal: '',
        tagsModal: [],
        qualityModal: 0,
        dailyModal: 0,
        fixedModal: 0,

        onSaleModal: false,
        onSaleTypeModal: false,
        onSaleValueModal: 0,
        overDaysModal: '',
        overSaleModal: false,
        overSaleTypeModal : false,
        overSaleValueModal: 0,

        descriptionModal: '',
        noteModal: '',

        available: false,
        boolDelete: false,
        bookings: [],

        fields: [
         {
            key: 'email',
            sortable: false
          },
          {
            key: 'prenotazione',
            sortable: false
          },
          {
            key: 'totale',
            sortable: true
          },
          {
            key: 'inizio',
            sortable: true
          },
          {
            key: 'fine',
            sortable: true
          },
        ],
      }
    },

     created() { 
        Functions.getProduct(this.$route.params.id)
        .then((result) => {
          console.log(result)  
          this.article = result.data.data.obj
          this.identifier = this.$route.params.id
          this.title = this.article.title
          this.brand = this.article.brand
          this.image = this.article.image
          this.tags = this.article.tags
          this.quality = this.article.quality       
          this.dailyPrice = this.article.price
          this.fixedPrice = this.article.fixedPrice
          this.discount.onSale = this.article.discount.onSale
          this.discount.onSaleType = this.article.discount.onSaleType
          this.discount.onSaleValue = this.article.discount.onSaleValue
          this.overDays.days = this.article.overDays.days
          this.overDays.onSale = this.article.overDays.onSale
          this.overDays.onSaleType = this.article.overDays.onSaleType
          this.overDays.onSaleValue = this.article.overDays.onSaleValue 
          this.available = this.article.available          
          this.description = this.article.description
          this.bookings = this.article.bookings
          console.log(this.bookings)
          this.note = this.article.note

          let current = new Date(); 
          for(let i in this.bookings){
            let endDate = new Date(this.bookings[i].endDate.year, this.bookings[i].endDate.month-1, this.bookings[i].endDate.day)
            if(endDate >= current){
              this.boolDelete = true
            } 
          }

        }, (error) => {
          alert('La pagina non esiste');
          this.$router.replace(' ')
          this.$emit('clicked')
        }
      )
    },

    /* beforeRouteLeave (){
      this.$emit('clicked')
    }, */

    methods: {

      getModalData(){
        this.titleModal = this.title;
        this.brandModal = this.brand;
        this.imageModal = this.image;
        this.tagsModal = this.tags;
        this.qualityModal = this.quality;
        this.dailyModal = this.dailyPrice;
        this.fixedModal = this.fixedPrice
        this.onSaleModal = this.discount.onSale;
        this.onSaleTypeModal = this.discount.onSaleType;
        this.onSaleValueModal = this.discount.onSaleValue;
        this.overDaysModal = this.overDays.days
        this.overSaleModal = this.overDays.onSale
        this.overSaleTypeModal = this.overDays.onSaleType
        this.overSaleValueModal = this.overDays.onSaleValue
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
      changeOnSale(){
        if(this.onSaleModal){
          this.onSaleModal = false
        }
        else{
          this.onSaleModal = true
        }
      },
      changeDiscountType(){
        if(this.onSaleTypeModal){
          this.onSaleTypeModal = false
        }
        else{
          this.onSaleTypeModal = true
        }

      },
      changeOnSaleOverDays(){
        if(this.overSaleModal){
          this.overSaleModal = false
        }
        else{
          this.overSaleModal = true
        }
      },
      changeDiscountTypeOverDays(){
        if(this.overSaleTypeModal){
          this.overSaleTypeModal = false
        }
        else{
          this.overSaleTypeModal = true
        }

      },

      saveData(){
        let query = {}
        
        if(this.titleModal != this.title && this.titleModal != '') 
          query.title = this.titleModal 
 
        if(this.imageModal != this.image && this.imageModal != '') 
          query.image = this.imageModal 

        if(this.dailyModal != this.dailyPrice && this.dailyModal != 0) 
          query.price = this.dailyModal

        if(this.fixedModal != this.fixedPrice && this.fixedModal != 0) 
          query.fixedPrice = this.fixedModal

        if(this.descriptionModal != this.description && this.descriptionModal != '') 
          query.description = this.descriptionModal 


        if(typeof(this.tagsModal) !== 'string' ){
          this.tagsModal = this.tagsModal.join(' ')
        }
        this.tagsModal = this.tagsModal.replace(/,/g, ' ');

        let newTags = [...new Set(this.tagsModal.split(/\s+/))];
        if(newTags[newTags.length - 1] == '') {
          newTags.pop()
        }
        query.tags = newTags
        if(this.brand != this.brandModal) query.brand = this.brandModal
        if(this.quality != this.qualityModal) query.quality = this.qualityModal 
        if(this.noteModal != this.note)  query.note = this.noteModal 
         
        query.discount = {}
        if(this.onSaleModal){
          query.discount.onSale = true
          if(this.onSaleTypeModal) query.discount.onSaleType = true
          else query.discount.onSaleType = false
          query.discount.onSaleValue = this.onSaleValueModal
        }
        else{
          query.discount.onSale = false
          query.discount.onSaleType = false
          query.discount.onSaleValue = ''
        }

        query.overDays = {}
        if(this.overSaleModal){
          query.overDays.onSale = true
          if(this.overSaleTypeModal) query.overDays.onSaleType = true
          else query.overDays.onSaleType = false
          query.overDays.days = this.overDaysModal
          query.overDays.onSaleValue = this.overSaleValueModal
        }
        else{
          query.overDays.days = ''
          query.overDays.onSale = false
          query.overDays.onSaleType = false
          query.overDays.onSaleValue = ''
        }
        console.log(query)
        Functions.saveDataProduct(this.identifier, query)
        .then( () => {
            alert("Modifica riuscita")
            this.title = this.titleModal 
            this.brand = this.brandModal  
            this.image = this.imageModal  
            this.tags = newTags  
            this.quality = this.qualityModal  
            this.dailyPrice = this.dailyModal  
            this.fixedPric = this.fixedModal  
            this.discount.onSale = this.onSaleModal  
            this.discount.onSaleType = this.onSaleTypeModal  
            this.discount.onSaleValue = this.onSaleValueModal  
            this.overDays.day = this.overDaysModal  
            this.overDays.onSal = this.overSaleModal  
            this.overDays.onSaleTyp = this.overSaleTypeModal  
            this.overDays.onSaleValu = this.overSaleValueModal  
            this.description = this.descriptionModal  
            this.note = this.noteModal  
        }) 
      }, 
      
      deleteProduct(){
          Functions.deleteProduct(this.identifier)
          .then( () =>{
             this.$router.replace(' ')
             this.$emit('clicked')
          })
        }         

    },
    computed: {

      getDiscountedPrice() {
        if(this.discount.onSaleType) {
          return (this.fixedPrice - this.fixedPrice * this.discount.onSaleValue / 100).toFixed(2);
        } else {
          return (this.fixedPrice - this.discount.onSaleValue).toFixed(2);
        }
      },
      getDiscountedModal() {
        if(this.onSaleTypeModal) {
          return (this.fixedModal - this.fixedModal * this.onSaleValueModal / 100).toFixed(2);
        } else {
          return (this.fixedModal - this.onSaleValueModal).toFixed(2);
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
</style>