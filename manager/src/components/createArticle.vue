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
				<input type="number" class="form-control" min="1" step="1" v-model="price" v-on:keyup="newPrice" aria-label="Recipient's price" aria-describedby="basic-addon6" required>
				<label for="price"> Prezzo*</label>
			</div>

			<div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" v-model="onSale"  @click="changeSale">
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
                <input class="form-check-input" type="radio" :value="false" v-model="onSaleType" :checked="!onSaleType" @click="changeType" id="percentage" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio"  :value="true" v-model="onSaleType" @click="changeType"  id="flat" required>
                <label class="form-check-label" for="flat">Fisso</label>
                <span> {{ onSaleType }}</span>
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

      <template v-else>
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
					<button type="submit" class="btn btn-lg btn-success" >Salva</button>
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
        title: '',
        brand: '',
        image: '',
        tags: '',
        quality: 1,
        price: '',
        
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
      print(){
        console.log(this.onSaleType)
      },
      changeSale(){
        if(this.onSale){
          this.onSale = false
          this.onSaleType = false
          this.onSaleValue = 1
        }
        else
          this.onSale = true
      },
      changeAvailable(){
        this.available = !this.available
      },

      //fare qualcosa tipo onkeyup per price e discount e funzione per radio forse una sola da assegnare a tutti e 4
      newPrice(){  
          if(!this.onSaleType){
            this.newTotal = this.price - this.price *this.onSaleValue / 100
          }
          else {
            this.newTotal = this.price - this.onSaleValue;
          }
      },
      changeType(){ 
          this.onSaleType = !this.onSaleType 
          if(!this.onSaleType){
            this.newTotal = this.price - this.price *this.onSaleValue / 100
          }
          else {
            this.newTotal = this.price - this.onSaleValue;
          }
      },

      createArticle(){
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
      query.price = this.price;
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
          alert("Creazione riuscita")
        })  
      },

      cancel(){
        this.title = '';
        this.brand = '';
        this.image = '';
        this.tags = '';
        this.quality = 1;
        this.price = '';

        this.changeSale()

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