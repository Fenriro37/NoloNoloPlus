<template>
  <div class="container-fluid">
    <h1> Aggiungi articolo </h1>

    <b-row>
      <b-col cols="3" >
        <p> Titolo:</p>
      </b-col>
      <b-col cols="9">
         <b-form-input  type="text" v-model="title"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Brand:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="brand"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Immagine:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="url" v-model="image"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Etichette (separare con spazio o virgola):</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="tags"></b-form-input>
      </b-col>
    </b-row>
  
    <b-row>
      <b-col cols="3" >
        <p> Qualità:</p>
      </b-col>
      <b-col cols="9" >
        <b-form-input v-model="quality" type="number" min="1" max="3" step="1"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Prezzo:</p>
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
        <p> Descrizione:</p>
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
  export default {
    name: "create-article", 
    data() {
      return {
        title: '',
        brand: '',
        image: '',
        tags: '',
        quality: 0,
        price: 0,
        
        onSale: false,
        onSaleType: false,
        onSaleValue: 0,

        available: true,
        description: '',
        note: '',
      }
    },
    methods: {
      changeSale(){
        this.onSale = !this.onSale
      },
      changeAvailable(){
        this.available = !this.available
      },

      createArticle(){

        //trasformiamo le etichette in array
        //let newTags = this.tags.replace(/,/g, ' ');
        //newTags = newTags.split(" ");



        //INVIO DATI//
        this.title = '';
        this.brand = '';
        this.image = '';
        this.tags = '';
        this.quality = 0;
        this.price = 0;

        this.onSale = false;
        this.onSaleType = false;
        this.onSaleValue = 0;

        this.available = false;
        this.description = '';
        this.note = ''
        //RIMANDI ALLA HOME
      },

      cancel(){
        this.title = '';
        this.brand = '';
        this.image = '';
        this.tags = '';
        this.quality = 0;
        this.price = 0;

        this.onSale = false;
        this.onSaleType = false;
        this.onSaleValue = 0;

        this.available = false;
        this.description = '';
        this.note = ''
        //RIMANDI ALLA HOME
      }



    },
  }
</script>