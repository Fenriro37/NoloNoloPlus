<template>
<div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-100">
      <div class="row mb-3 mt-3">
        <!-- Colonne immagine -->
        <div class="col-6 d-flex align-items-center" style="height: 15em;">
          <img id="img" tabindex="0" class="myImg" :alt="'immagine'+ title+''+brand" v-bind:src="image">
        </div>

        <div class="col-6">
          <div id="productidentifier">
            <span tabindex="0" :aria-label="'Identificativo:' + identifier"> ID: {{ identifier }} </span>      
          </div> 
          <!-- Titolo -->
          <div>
            <h4 tabindex="0" :aria-label="'Articolo:' + title + brand">{{ title + ' ' + brand }}  </h4>
          </div>
          <!-- Stars -->
          <div tabindex="0" :aria-label="quality + 'stelle su tre'">
            <span v-for="iter in parseInt(quality)" class="fa fa-star checked big-size" :key="iter"> </span>
            <span v-for="j in (3 - parseInt(quality))" class="fa fa-star big-size" :key="j"> </span>
          </div>
          <div class="mt-1 mb-1">
            <span tabindex="0" :aria-label="'Prezzo fisso:'+ fixedPrice + '€'"  class="">{{'Prezzo Fisso: ' + fixedPrice +'€' }} </span>
          </div>
            <!-- Prezzo -->
          <div class="mt-1 mb-1">
            <span tabindex="0" :aria-label="'Prezzo fisso scontato:'+getDiscountedPrice()+'€'" v-if="discount.onSale" class=""> <span id="onSalePrice">{{'Prezzo fisso scontato: ' + getDiscountedPrice() }}€</span>
          </div>
          <div class="mt-1 mb-1">
            <span tabindex="0" :aria-label="'Prezzo giornaliero:'+dailyPrice+'€'" class="">{{'Prezzo giornaliero: ' + dailyPrice +'€/giorno' }} </span>
          </div>
          <div class="mt-1 mb-1">
            <span tabindex="0" :aria-label="'Noleggia oltre ' + overDays.days+ ' giorni per ottenere sconto giornaliero'" v-if="overDays.onSale"  class="">{{'Noleggia oltre ' + overDays.days + ' giorni per ricevere sconto giornaliero'}}
              </span>
          </div>

        </div>
      </div>
      <!-- Bottoni -->
      <div class="row d-flex justify-content-between">
        <div class="col align-items-center">
          <b-button id="rentProduct" aria-label="Bottone affitta. Porta alla pagina per la creazione di una prenotazione"  class="btn btn-lg btn-warning m-1" :disabled="enter || !available" @click="rent">Affitta</b-button>
          <b-button type="button" aria-label="Bottone Modifica. Apre una finestra dove modificare i campi dell'articolo" class="btn btn-lg m-1" variant="primary" :disabled="enter" v-on:click="getModalData">Modifica</b-button>
          <b-button type="button" aria-label="Bottone elimina. Cancella l'articolo e porta sulla pagina del catalogo" class="btn btn-lg btn-danger m-1" :disabled="boolDelete || enter" v-on:click="deleteProduct">Elimina</b-button>
          <b-button aria-label="Bottone analytics. Porta alla pagina per vedere le statistiche di questo prodotto" :disabled="bookings.length === 0 || enter" class="btn btn-lg btn-warning m-1" @click="stats"> Analytics </b-button>
        </div>
      </div>

      <div class="form-check form-switch m-1">
        <input class="form-check-input custom-switch " type="checkbox" id="flexSwitchCheckDefault" :disabled="enter" :checked="available" v-model="available" @click="changeInStock">
        <label  v-if="available" ria-label="Bottone per cambiare la disponibilità articolo" class="form-check-label" for="flexSwitchCheckDefault">Modifica per disattivare articolo</label>
        <label  v-else class="form-check-label" for="flexSwitchCheckDefault">Modifica per attivare articolo</label>
      </div>

      <b-modal ref="myModal" hide-footer hide-header class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Modifica prodotto</h4>
              <button type="button" aria-label="Bottone chiudi finestra di modifica" @click="hideModal" class="btn-close"></button>	
            </div>
            <!-- Modal body -->
            <div class="modal-body">
            <form name="myform" id="formId" @submit.prevent="saveData">
              <b-row>
                <b-col cols="6">
                  <label for="productName" class="form-label">Nome*</label>
                </b-col>
                <b-col cols="6">
                  <label for="productModel" class="form-label">Marca</label>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col cols="6">
                  <b-form-input  type="text" :aria-label="'Titolo, Campo obbligatorio'" class="form-control" id="productname" v-model="titleModal" required></b-form-input>	
                </b-col>
                <b-col cols="6">
                  <b-form-input type="text" :aria-label="'Brand, Campo obbligatorio'" class="form-control" id="productModel" v-model="brandModal"></b-form-input>	
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
                  <label for="imageLink" class="form-label">Immagine* (link)</label>
                </b-col>
                <b-col cols="8">
                  <b-form-input type="url"  :aria-label="'L` mmagine deve essere in forma di URL. Campo obbligatorio'+ imageModal" class="form-control" id="imageLink" v-model="imageModal" required></b-form-input>	
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6" class="mt-2 mb-3">
                  <label for="productQuality" class="form-label">Qualità</label>
                </b-col>
                <b-col cols="6" class="mt-2 mb-3">
                  <select class="form-select" :aria-label="'qualità:'" v-model="qualityModal">
                    <option :value="1">1 - Condizioni accettabili</option>
                    <option :value="2" selected>2 - Buone condizioni</option>
                    <option :value="3">3 - Come nuovo</option>
                  </select>
                </b-col>
              </b-row>
              <hr>
              <b-row >
                <b-col cols="6" class="mt-3 mb-3">
                  <label for="productPrice">Prezzo Fisso*</label>												
                </b-col>
                <b-col cols="6" class="mt-2 mb-2">
                  <div class="input-group">
                    <b-form-input type="number" min="1" step=".01" id="productPrice" class="form-control text-end" aria-label="Prezzo fisso: campo obbligatorio" v-model="fixedModal" v-on:keyup="changeDiscountValue" required></b-form-input>	
                    <span class="input-group-text justify-content-center">€</span>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mb-2 d-flex align-items-center justify-content-between">
                <b-col cols="6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="onSale" :checked="onSaleModal" @click="changeOnSale">
                    <label class="form-check-label" for="onSale">Sconto fisso</label>
                  </div>
                </b-col>
                <b-col cols="3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="discount" aria-label="sconto percentuale. Seleziona uno dei due" id="discountPercentage" :value="true" :disabled="!onSaleModal" 
                      :checked="onSaleModal && onSaleTypeModal" @click="changeDiscountType">
                    <label class="form-check-label" for="discountPercentage">Percentuale</label>
                  </div>
                </b-col>
                <b-col cols="3">
                  <div class="form-check">
                    <input
                      id="discountAmount" class="form-check-input" type="radio" aria-label="sconto fisso. Seleziona uno dei due" name="discount" :value="false" :disabled="!onSaleModal" :checked="onSaleModal && onSaleTypeModal == false" @click="changeDiscountType" >
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
                    <input type="text" class="form-control text-end" min="1" step=".01" aria-label="valore sconto prezzo fisso. Campo obbligatorio" v-model="onSaleValueModal" v-on:keyup="changeDiscountValue" :disabled="!onSaleModal" required>
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
                    <input type="text" class="form-control text-end" aria-label="Prezzo fisso scontato. Sola lettura. Se negativo non sarà possibile modificare il prodotto." :readonly="onSaleModal" :disabled="!onSaleModal" v-model="discountTotal">
                    <span class="input-group-text justify-content-center">€</span>
                  </div>
                </b-col>
              </b-row>
              <hr>
                <b-row >
                <b-col cols="6" class="mt-3 mb-3">
                  <label for="dailyPrice">Prezzo Giornaliero*</label>												
                </b-col>
                <b-col cols="6" class="mt-2 mb-2">
                  <div class="input-group">
                    <input type="number" min="1" step=".01" id="dailyPrice" aria-label="Prezzo giornaliero. Campo obbligatorio" class="form-control text-end" v-model="dailyModal" required>
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
                    <input class="form-check-input" type="radio" name="discountOver" aria-label="sconto percentuale. Seleziona uno dei due"  id="overPercentage" :value="true" :disabled="!overSaleModal" :checked="overSaleModal && overSaleTypeModal == true"
                      @click="changeDiscountTypeOverDays">
                    <label class="form-check-label" for="overPercentage">Percentuale</label>
                  </div>
                </b-col>
                <b-col cols="3">
                  <div class="form-check">
                    <input id="overFlat" class="form-check-input" aria-label="sconto fisso. Seleziona uno dei due"  type="radio" name="discountOver" :value="false" :disabled="!overSaleModal" 
                      :checked="overSaleModal && overSaleTypeModal == false" @click="changeDiscountTypeOverDays" >
                    <label class="form-check-label" for="overFlat">Fisso</label>													
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
                      type="text" aria-label="valore sconto giornaliero." 
                      class="form-control text-end"
                      min="1"
                      step=".01"
                      v-model="overSaleValueModal"
                      :disabled="!overSaleModal" required>
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
                    <input type="number" class="form-control text-end" aria-label="giorni da superare per ottenere sconto giornaliero."  min="1" step="1" :disabled="!overSaleModal" v-model="overDaysModal" required>
                  </div>
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col >
                  <label for="productDescription" class="form-label">Descrizione*</label>
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col>
                  <textarea class="form-control w-80" aria-label="Descrizione, campo obbligatorio"  id="productDescription" rows="3" v-model="descriptionModal" required></textarea>
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
            
              <!-- Modal footer -->
              <div class="modal-footer d-flex justify-content-between">
                <b-button type="submit" aria-label="Bottone salva. Salva le modifiche e chiude la finestra di modifica"  class="float-left" variant="primary" :disabled="onSaleModal  && discountTotal <= 0" >Salva</b-button>  
                <b-button type="button" aria-label="bottone annulla. Chiude la finestra di modifica senza salvare" @click="hideModal" class="btn-danger float-right">Chiudi</b-button>
              </div>
              
            </form>     
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Etichette -->
      <div class="row mt-3">
        <h3 tabindex="0" aria-label="Categorie articolo">Categorie</h3>
        <div>
          <span tabindex="0" :aria-label="tag" class="badge rounded-pill bg-primary m-1" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <b-row class='mt-3'>
        <h3>Descrizione</h3>
      </b-row>
      <b-row class="p-3 border border-secondary border-3 bg-white" tabindex="0" :aria-label="'descrizione' + description">
        {{ description }}
      </b-row>
      <b-row class='mt-3'>
        <h3>Note</h3>
      </b-row>
      <b-row class="mb-3 p-3 border border-secondary border-3 bg-white" tabindex="0" :aria-label="'note non visibili ai clienti' + note">
        {{ note }}
      </b-row>
      <template v-if="tmpbookings.length !== 0">
        <!-- Da qui parte la tabella delle prenotazioni -->
        <b-row class='mt-3'>
          <h3 tabindex="0">Tabella prenotazioni</h3>
        </b-row>
        <b-row class="p-0 border border-secondary border-3 bg-white mb-3">
          <input class="form-control" v-model="filter" v-on:keyup="filtTable" type="text" aria-label="Barra di ricerca per filtrare le prenotazioni sottostanti in base ai dati inseriti" placeholder="Filtra...">
          <b-table class='m-0' striped bordered hover :items="bookings" :fields="fields">
            <!-- item è la riga -->
            <template v-slot:cell(email)="{ item }">
              <router-link :aria-label="'email:'+ item.clientId" :to="{ name: 'client',  params: { email: item.clientId}}">{{ item.clientId }}</router-link>
            </template>
            <template v-slot:cell(totale)="{ item }">
              <span tabindex="0" :aria-label="'totale prenotazione: '+ (item.total).toFixed(2) + ' €'">{{ (item.total).toFixed(2) + ' €'}}</span>
            </template>
            <template v-slot:cell(prenotazione)="{ item }">
              <router-link :aria-label="'identificativo: prenotazione' + item.reservationId" :to="{ name: 'reservation',  params: { id: item.reservationId}}"> Prenotazione</router-link>
            </template>
            <template v-slot:cell(inizio)="{ item }">
              <span tabindex="0" :aria-label="'inizio prenotazione' + item.startDate.day + '-'+item.startDate.month+'-'+item.startDate.year ">{{item.startDate.day + '-'+item.startDate.month+'-'+item.startDate.year}}</span>
            </template>
            <template v-slot:cell(fine)="{ item }">
              <span tabindex="0" :aria-label="'fine prenotazione' + item.endDate.day + '-'+ item.endDate.month +'-'+ item.endDate.year">{{item.endDate.day + '-'+ item.endDate.month +'-'+ item.endDate.year}}</span>
            </template>
          </b-table>
        </b-row>
      </template>
    </div>
  </div>
</template>

<script>
  import "bootstrap";
  import Functions from '../functions/function'

  export default {
    data() {
      return {
        enter: true,
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
        discountTotal: '',
        overDaysModal: '',
        overSaleModal: false,
        overSaleTypeModal : false,
        overSaleValueModal: 0,

        descriptionModal: '',
        noteModal: '',

        available: false,
        boolDelete: false,
        bookings: [],
        tmpbookings: [],
        filter: '',

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
          },
          {
            key: 'inizio',
          },
          {
            key: 'fine',
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
          this.bookings = []
          this.tmpbookings = this.article.bookings
          for(let i in this.tmpbookings){
            this.bookings.push(this.tmpbookings[i])
          }
          console.log(this.bookings)
          this.note = this.article.note

          let current = new Date(); 
          for(let i in this.bookings){
            let endDate = new Date(this.bookings[i].endDate.year, this.bookings[i].endDate.month-1, this.bookings[i].endDate.day, 23, 59, 59)
            if(endDate >= current){
              this.boolDelete = true
            } 
          }
          this.enter = false
        }, (error) => {
          alert('La pagina non esiste');
           this.$router.push({ name: 'home'})
        }
      )
    },

    methods: {
      showModal() {
        this.$refs['myModal'].show()
      },
      hideModal() {
        this.$refs['myModal'].hide()
      },

      rent(){
         this.$router.push({ name: 'createReservation' , params: { id: this.identifier}})
      },
      
      stats(){
         this.$router.push({ name: 'chartArticle' , params: { id: this.identifier}})
      },

      getModalData(){
        this.showModal()
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
        if(this.onSaleModal){
          this.discountTotal = this.getDiscountedPrice()
        }
        this.overDaysModal = this.overDays.days
        this.overSaleModal = this.overDays.onSale
        this.overSaleTypeModal = this.overDays.onSaleType
        this.overSaleValueModal = this.overDays.onSaleValue
        this.descriptionModal = this.description;
        this.noteModal = this.note;
      },

      changeInStock(){
        this.enter = true
        let query = {}
        query.available = !this.available
        Functions.saveDataProduct(this.identifier, query)
        .then( () => {
          alert("Modifica disponibilità riuscita") 
          this.enter = false
        })
        .catch( () => {
          alert("Problema nell' invio dei dati");
          this.enter = false
        })
      },
      changeOnSale(){
        if(this.onSaleModal){
          this.onSaleModal = false
          this.discountTotal = ''
          this.onSaleValueModal = ''
        }
        else{
          this.onSaleModal = true
          this.changeDiscountValue()
        }
      },
      changeDiscountType(){
        if(this.onSaleTypeModal){
          this.onSaleTypeModal = false
          this.overSaleValueModal = ''
          this.overDaysModal = ''
        }
        else{
          this.onSaleTypeModal = true
        }
        this.changeDiscountValue()
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
        this.enter = true
        let query = {}
        
        if(this.titleModal != this.title) 
          query.title = this.titleModal
 
        if(this.imageModal != this.image)
          query.image = this.imageModal 

        if(this.dailyModal != this.dailyPrice) 
          query.price = parseFloat(this.dailyModal)


        if(this.fixedModal != this.fixedPrice) 
          query.fixedPrice = parseFloat(this.fixedModal)

        if(this.descriptionModal != this.description && this.descriptionModal != '') 
          query.description = this.descriptionModal

        let newTags = []
        if(this.tagsModal == '')
          query.tags = newTags
        else{
          if(typeof(this.tagsModal) !== 'string' ){
            this.tagsModal = this.tagsModal.join(' ')
          }
          this.tagsModal = this.tagsModal.replace(/,/g, ' ');

          newTags = [...new Set(this.tagsModal.split(/\s+/))];
          if(newTags[newTags.length - 1] == '') {
            newTags.pop()
          }
          query.tags = newTags
        }

        if(this.brand != this.brandModal) query.brand = this.brandModal
        if(this.quality != this.qualityModal) query.quality = parseInt(this.qualityModal) 
        if(this.noteModal != this.note)  query.note = this.noteModal 
         
        query.discount = {}
        if(this.onSaleModal){
          query.discount.onSale = true
          query.discount.onSaleType = this.onSaleTypeModal
          query.discount.onSaleValue = parseFloat(this.onSaleValueModal)
        }
        else{
          query.discount.onSale = false
          query.discount.onSaleType = false
          query.discount.onSaleValue = 0
        }

        query.overDays = {}
        if(this.overSaleModal ){
          query.overDays.onSale = true
          query.overDays.onSaleType = this.overSaleTypeModal
          query.overDays.days = parseInt(this.overDaysModal)
          query.overDays.onSaleValue = parseFloat(this.overSaleValueModal)
        }
        else{
          query.overDays.days = 0
          query.overDays.onSale = false
          query.overDays.onSaleType = false
          query.overDays.onSaleValue = 0
        }
        this.enter = false
        console.log(query)
        

        this.$refs['myModal'].hide()
        Functions.saveDataProduct(this.identifier, query)
        .then( () => {
          console.log(this.overDays.day)
          console.log(this.overDaysModal)

          this.title = this.titleModal 
          this.brand = this.brandModal  
          this.image = this.imageModal  
          this.tags = newTags  
          this.quality = this.qualityModal  
          this.dailyPrice = this.dailyModal  
          this.fixedPrice = this.fixedModal  
          this.discount.onSale = this.onSaleModal  
          this.discount.onSaleType = this.onSaleTypeModal  
          this.discount.onSaleValue = this.onSaleValueModal  
          this.overDays.days = this.overDaysModal  
          this.overDays.onSale = this.overSaleModal  
          this.overDays.onSaleType = this.overSaleTypeModal  
          this.overDays.onSaleValue = this.overSaleValueModal  
          this.description = this.descriptionModal  
          this.note = this.noteModal  
          alert("Modifica riuscita")
          console.log(this.overDays.day)
          this.enter = false
        })
        .catch( (error) => {
          alert("Problema nella modifica dei dati");
          this.enter = false
        })
      }, 
      
      deleteProduct(){
        this.enter = true
        Functions.deleteProduct(this.identifier)
        .then( () =>{
            alert("Operazione riuscita");
            this.$router.push({ name: 'articleCatalog' , params: { filter: ''}})
        })
        .catch( (error) => {
          alert("Problema nell' eliminazione dell'articolo");
          this.enter = false
        })
      },

      changeDiscountValue() {
        if(this.onSaleTypeModal) {
          this.discountTotal = (this.fixedModal - this.fixedModal * this.onSaleValueModal / 100).toFixed(2);
        } 
        else {
          this.discountTotal = (this.fixedModal - this.onSaleValueModal).toFixed(2);
        }
      },

      getDiscountedPrice() {
        console.log(this.fixedPrice)
        if(this.discount.onSaleType) {
          return (this.fixedPrice - this.fixedPrice * this.discount.onSaleValue / 100).toFixed(2);
        } else {
          return (this.fixedPrice - this.discount.onSaleValue).toFixed(2);
        }
      },
      filtTable(){
        if(this.filter == ''){
          this.bookings = []
          for(let i in this.tmpbookings){
            this.bookings.push(this.tmpbookings[i])
          }
        }
        else{
          this.bookings = []
          
          let tmpFilter = this.filter.toLowerCase()
          for(let i in this.tmpbookings){
            let start = this.tmpbookings[i].startDate.day + '-' + this.tmpbookings[i].startDate.month  + '-' + this.tmpbookings[i].startDate.year
            let end = this.tmpbookings[i].endDate.day + '-' + this.tmpbookings[i].endDate.month  + '-' + this.tmpbookings[i].endDate.year

            if( (this.tmpbookings[i].clientId.toLowerCase()).includes(tmpFilter)  
                || (this.tmpbookings[i].total + ' €').includes(tmpFilter) ||
                start.includes(tmpFilter) || end.includes(tmpFilter)
                ){
                  //console.log(this.bookings[i].clientId.toLowerCase())
                  this.bookings.push(this.tmpbookings[i])            
            }
          }
        }
      }
    }
  }

</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
</style>