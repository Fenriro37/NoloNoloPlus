<template>
  <div class="container-fluid">
    <h1> Aggiungi prenotazione </h1>

    <b-row>
      <b-col cols="3" >
        <p> ID Cliente:</p>
      </b-col>
      <b-col cols="9">
         <b-form-input  type="text" v-model="clientId"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> ID Articolo:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="articleId"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Data richiesta prenotazione:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationDate" ></b-form-datepicker>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Data inizio noleggio</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationStart" ></b-form-datepicker>
      </b-col>
    </b-row>
  
    <b-row>
      <b-col cols="3" >
        <p> Data fine noleggio:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationEnd" ></b-form-datepicker>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> Ritiro:</p>
      </b-col>
      <b-col cols="1">
        <b-form-checkbox
          v-model="rentalOccurred"
          @click="changeRentalOccured"
        >          
        </b-form-checkbox>
        </b-col>
        <b-col cols="3">
          <p v-if="rentalOccurred">L'articolo è stato ritirato</p>
          <p v-else>L'articolo non è stato ritirato</p>
        </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Restituzione:</p>
      </b-col>
      <b-col cols="1">
        <b-form-checkbox
          v-model="returned"
          @click="changeReturned"
        >          
        </b-form-checkbox>
      </b-col>
      <b-col cols="3">
        <p v-if="available">L'articolo è stato restituito</p>
        <p v-else>L'articolo non è stato restituito</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Descrizione:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="notes" type="text"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Note (non visibili ai clienti):</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="privateNotes" type="text"></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
         <b-button variant="success" @click="createReservation">Salva</b-button>
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

        clientId: '',
        articleId: '',

        reservationDate:'',
        reservationStart:'',
        reservationEnd:'',

        rentalOccurred: false,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        notes:'',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:''                //note 2 (dettagli non visibili al cliente)
      }
    },
    methods: {
      changeRentalOccured(){
        this.rentalOccurred = !this.rentalOccurred;
      },

      changeReturned(){
        this.returned = !this.returned;
      },

      createReservation(){
        
        //spedire questi dati al server dopo aver controllato che le date siano congrue
        
       this.clientId =  '';
       this.articleId =  '';
       this.reservationDate = '';
       this.reservationStart = '';
       this.reservationEnd = '';
       this.rentalOccurred =  false;
       this.returned =  false;
       this.notes = '';
       this.privateNotes = '';
      },

      cancel(){
        this.clientId =  '';
        this.articleId =  '';
        this.reservationDate = '';
        this.reservationStart = '';
        this.reservationEnd = '';
        this.rentalOccurred =  false;
        this.returned =  false;
        this.notes = '';
        this.privateNotes = '';
      }

    },
  }
</script>