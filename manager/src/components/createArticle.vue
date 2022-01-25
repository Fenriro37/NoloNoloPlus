<template>
<div class="container-fluid d-flex justify-content-center">
	<div class="w-50">
		<form name="myform" @submit.prevent="createArticle"> 
			<h1 class="mb-4"> Aggiungi articolo </h1>

      <div class="form-floating mb-3">
				<input type="text" class="form-control" v-model="title" aria-label="Recipient's title" aria-describedby="basic-addon1" required>
				<label for="title"> Titolo*</label>
			</div>

      <div class="form-floating mb-3">
				<input type="text" class="form-control" v-model="brand" aria-label="Recipient's brand" aria-describedby="basic-addon2">
				<label for="brand"> Brand </label>
			</div>

      <div class="form-floating mb-3">
				<input type="url" class="form-control" v-model="image" aria-label="Recipient's image" aria-describedby="basic-addon3" required>
				<label for="image"> Immagine* (Inserisci URL)</label>
			</div>

			<div class="form-floating mb-3">
				<input type="text" class="form-control" v-model="tags" aria-label="Recipient's tags" aria-describedby="basic-addon4"> 
				<label for="tags"> Etichette (separare con spazio o virgola)</label>
			</div>
    
      <div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" max="3" step="1" v-model="quality" aria-label="Recipient's quality" aria-describedby="basic-addon5" required>
				<label for="quality"> Qualità*</label>
			</div>

			<div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" v-model="fixedPrice" v-on:keyup="newPrice" aria-label="Recipient's fixedprice" aria-describedby="basic-addon6" required>
				<label for="fixedPrice"> Prezzo Fisso*</label>
			</div>

			<div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo fisso:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" v-model="onSale"  @change="newPrice">
						<label class="form-check-label" for="sale"  v-if="onSale">L'articolo verrà scontato</label>
            <label class="form-check-label" for="sale"  v-else>Il prodotto non è scontato</label>
					</div>
				</div>
			</div>
      
      <template v-if="onSale">
        <div id="saleInfo" class="mt-2">
          <div class="row">
            <div class="col-3"><p> Tipo di sconto:</p></div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" :value="true" v-model="onSaleType"  @click="changeType" id="percentage" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio"  :value="false" v-model="onSaleType" @click="changeType" id="flat" required>
                <label class="form-check-label" for="flat">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" class="form-control" min="1" step="1" v-model="onSaleValue" v-on:keyup="newPrice" id="saleValue" aria-label="saleValue" aria-describedby="basic-addon6" required>
            </div>
          </div>
          <div class="row mt-2 mb-2">
            <div class="col-3">Prezzo scontato:</div>
            <div class="col-9">
              <input type="number" class="form-control"  v-model="newTotal" id="newValue" aria-label="SalePrice" aria-describedby="basic-addon6" disabled>
          </div>
        </div>
      </template>

      <div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" v-model="dailyPrice" aria-label="Recipient's price" aria-describedby="basic-addon6" required>
				<label for="price"> Prezzo Giornaliero*</label>
			</div>

      <div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo giornaliero:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" v-model="overOnSale"  @click="changeDailySale" id="dailySale">
						<label class="form-check-label" for="dailySale"  v-if="overOnSale">L'articolo verrà scontato</label>
            <label class="form-check-label" for="dailySale"  v-else>Il prodotto non è scontato</label>
					</div>
				</div>
			</div>

      <template v-if="overOnSale">
        <div id="saleInfoOver" class="mt-2">
          <div class="row">
            <div class="col-3"><p> Tipo di sconto:</p></div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" :value="true" v-model="overOnSaleType" id="percentageOver" required>
                <label class="form-check-label" for="percentageOver">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio"  :value="false" v-model="overOnSaleType" id="flatOver" required>
                <label class="form-check-label" for="flatOver">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" class="form-control" min="1" step="1" v-model="overOnSaleValue" id="saleValueOVer" aria-label="saleValueOver" aria-describedby="basic-addon6" required>
            </div>
          </div>
          <div class="row mt-2 mb-2">
            <div class="col-3">Giorni per sconto:</div>
            <div class="col-9">
              <input type="number" class="form-control" min="1" step="1"  v-model="overDays" id="daysDiscount" aria-label="daysDiscount" aria-describedby="basic-addon6" required>
          </div>
        </div>
      </template>

			<div class="row mb-3">
				<div class="col-3">
					<label><b>Disponibilità:</b></label>
				</div>
				<div class="col-9">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" v-model="available" :checked="available" @click="changeAvailable">
						<label class="form-check-label" for="available" v-if="available">L'articolo sarà disponibile</label>
            <label class="form-check-label" for="available" v-else>L'articolo non sarà disponile</label>
					</div>
				</div>
			</div>

			<div class="form-floating mb-3">
				<input type="text" class="form-control" v-model="description" aria-label="Recipient's description" aria-describedby="basic-addon8" required>
				<label for="description"> Descrizione*</label>
			</div>
			<div class="form-floating mb-4">
				<input type="text" class="form-control" v-model="note" aria-label="Recipient's note" aria-describedby="basic-addon9">
				<label for="note"> Note (non visibili ai clienti)</label>
			</div>

			<div class="row mb-5">
				<div class="col-6">
					<button type="submit" class="btn btn-lg btn-success" :disabled="enter">Salva</button>
				</div>

				<div class="col-6">
					<button type="reset" class="btn btn-lg btn-danger delete" @click="cancel">Annulla</button>
				</div>
			</div>

		</form> 
  </div>
</div>
</template>

<script>
import Functions from '../functions/function'
export default {
  name: "create-article", 
  data() {
    return {
      enter: false,
      title: '',
      brand: '',
      image: '',
      tags: '',
      quality: 1,
      fixedPrice: '',
      dailyPrice:'',

      overDays: "",
      overOnSale: false,
      overOnSaleType: false,
      overOnSaleValue: "",
      
      onSale: false,
      onSaleType: false,
      onSaleValue: 1,

      newTotal: '',

      available: false,
      description: '',
      note: '',
    }
  },

  methods: {

    changeSale(){
      if(this.onSale){
        this.onSale = false
        this.onSaleType = false
        this.onSaleValue = 1
      }
      else
        this.onSale = true
      this.newPrice()
    },

    changeType(){
      this.onSaleType = !this.onSaleType
      this.newPrice()
    },

    changeDailySale(){
      if(this.overOnSale){
      this.overOnSale = false
      this.overOnSaleType = false
      this.overOnSaleValue = 1
      }
      else{
        this.overOnSale = true
      }
    },

    changeAvailable(){
      this.available = !this.available
    },

    //fare qualcosa tipo onkeyup per price e discount e funzione per radio forse una sola da assegnare a tutti e 4
    newPrice(){
      if(this.onSale){  
        if(this.onSaleType){
          this.newTotal = this.fixedPrice - this.fixedPrice *this.onSaleValue / 100
        }
        else {
          this.newTotal = this.fixedPrice - this.onSaleValue;
        }
      }
    },

    createArticle(){
      this.enter = true
      //controllare date prezzo e campi non vuoti
      let query = {};
      
     query.title = this.title;

     query.brand = this.brand;

     query.image = this.image;

      if(this.tags == ''){
        query.tags = '';
      }
      else{
        //trasformiamo le etichette in array

        let newTags = this.tags.replace(/,/g, ' ');

        newTags = [...new Set(newTags.split(" "))];
        
        for (let i = 0; i < newTags.length;i++){
           if(newTags[i] == ""){
            newTags.splice(i,1);
          }
        }        
        query.tags = newTags;
      }

      query.discount = {}
      query.discount.onSale = this.onSale;
      if(this.onSale){
        query.discount.onSaleType = this.onSaleType;
        query.discount.onSaleValue = this.onSaleValue;

      }
      else{
        query.discount.onSaleType = false;
        query.discount.onSaleValue = "";
      }
      
      query.overDays = {}
      if(this.overOnSale){
        query.overDays.onSale  =  this.overOnSale
        query.overDays.onSaleType = this.overOnSaleType
        query.overDays.onSaleValue  =  this.overOnSaleValue
        query.overDays.days = this.overDays
      }
      else{
        query.overDays.onSale  =  false
        query.overDays.onSaleType = false
        query.overDays.onSaleValue  =  ''
        query.overDays.days = ''

      }

      query.price =  this.dailyPrice
      query.fixedPrice = this.fixedPrice;
      query.quality = this.quality;
      query.available = this.available;
      query.description = this.description;
      query.note = this.note
      query.bookings = [] 
      console.log(query)
      //invio dati
      Functions.addProduct(query)
        .then( () => {
          //svuotiamo i valori
          this.cancel();
           this.enter = false
          alert("Creazione riuscita")
        }) 
      },

    cancel(){
      this.title = '';
      this.brand = '';
      this.image = '';
      this.tags = '';
      this.quality = 1;
      this.fixedPrice = '';
      this.dailyPrice = '';
      if(this.onSale)
        this.changeSale()
      if(this.overOnSale)
        this.changeDailySale()

      this.available = false;
      this.description = '';
      this.note = ''
      this.newTotal = '' 
      },
    },
  }
</script>

<style>
.delete {
    float: right;
    margin: 0;
  }

</style>