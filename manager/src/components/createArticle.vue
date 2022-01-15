<template>
  <div class="container-fluid">
    <h1> Aggiungi articolo </h1>

    <b-row>
      <b-col cols="3" >
        <p> *Titolo:</p>
      </b-col>
      <b-col cols="9">
         <b-form-input  type="text" v-model="title"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> *Brand:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="brand"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> *Immagine (Inserisci URL):</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="url" v-model="image"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> *Etichette (separare con spazio o virgola):</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="tags"></b-form-input>
      </b-col>
    </b-row>
  
    <b-row>
      <b-col cols="3" >
        <p> *Qualità:</p>
      </b-col>
      <b-col cols="9" >
        <b-form-input v-model="quality" type="number" min="1" max="3" step="1"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> *Prezzo:</p>
      </b-col>
      <b-col cols="9" >
        <b-form-input v-model="price" type="number" min="1" step="1"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Sconto:</p>
      </b-col>
      <b-col cols="1">
        <b-form-checkbox
          v-model="onSale"
          @click="changeSale"
        >          
        </b-form-checkbox>
        </b-col>
        <b-col cols="3">
          <p v-if="onSale">L'articolo verrà scontato</p>
          <p v-else>L'articolo non è scontato</p>
        </b-col>
    </b-row>
    
    <template v-if="onSale">
      <b-row>
        <b-col cols="3">
          <p> Tipo di sconto:</p>
        </b-col>
        <b-col cols="3">      
         <b-form-radio v-model="onSaleType"  value="A">Percentuale</b-form-radio> 
        </b-col>        
        <b-col cols="3">
          <b-form-radio v-model="onSaleType"  value="B">Fisso</b-form-radio>
        </b-col>
      </b-row> 
    <b-row>
      <b-col cols="3" >
        <p> Valore sconto:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="onSaleValue" type="number" min="1" step="1"></b-form-input>
      </b-col>
    </b-row>
    </template>

    <b-row>
      <b-col cols="3">
        <p> Disponibilità:</p>
      </b-col>
      <b-col cols="1">
        <b-form-checkbox
          v-model="available"
          :checked="available"
          @click="changeAvailable"
        >          
        </b-form-checkbox>
      </b-col>
      <b-col cols="3">
        <p v-if="available">L'articolo sarà disponibile</p>
        <p v-else>L'articolo non sarà disponile</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> *Descrizione:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="description" type="text"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Note (non visibili ai clienti):</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="note" type="text"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <b-button variant="success" @click="createArticle">Salva</b-button>
      </b-col>

      <b-col cols="3">
        <b-button variant="danger" @click="cancel" >Annulla</b-button>
      </b-col>
    </b-row>
 
    
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
        onSaleValue: '',

        available: true,
        description: '',
        note: '',
      }
    },
    created(){
      console.log("dddd")
      
    },
    methods: {
      changeSale(){
        this.onSale = !this.onSale
      },
      changeAvailable(){
        this.available = !this.available
      },

      createArticle(){
      //controllare date prezzo e campi non vuoti
      let query = {};
      
      if(this.title == ''){ return (alert('Il campo titolo non può essere vuoto'))}
      else query.title = this.title;

      if(this.brand == ''){return(alert('Il campo brand non può essere vuoto'))}
      else query.brand = this.brand;

      if(this.image == ''){return(alert('Il campo immagine non può essere vuoto'))}
      else query.image = this.image;

      if(this.tags == ''){return(alert('Il campo etichette non può essere vuoto'))}
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
      query.discount.onSaleType = this.onSaleType;
      if(this.onSale == true && this.onSaleValue == '' ){return (alert('inserire lo sconto da applicare'))}
      if(this.onSale == true && this.onSaleValue < 0 ){return (alert('lo sconto da applicare deve essere maggiore di zero'))}
      query.discount.onSaleValue = this.onSaleValue;

      if(this.price == ''){return (alert('Il campo prezzo non può essere vuoto'))}
      if(this.price < 0){return(alert("Il prezzo deve essere maggiore di '0'"))}
      else query.price = this.price;
      
      if(this.quality < 1 || this.quality > 3 ){return(alert('Il campo qualità deve essere compreso tra 1 e 3'))}
      else query.quality = this.quality;

      query.available = this.available;
      
      if(this.description == ''){return(alert('Il campo descrizione non può essere vuoto'))}
      else query.description = this.description;

      query.note = this.note

      query.bookings = []

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

        this.onSale = false;
        this.onSaleType = false;
        this.onSaleValue = '';

        this.available = true;
        this.description = '';
        this.note = ''
        //RIMANDI ALLA HOME
      }



    },
  }
</script>