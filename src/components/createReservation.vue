<template>
  <div class="container-fluid">
    <h1> Aggiungi prenotazione </h1>

    <b-row>
      <b-col cols="3" >
        <p> *email cliente:</p>
      </b-col>
      <b-col cols="9">
         <b-form-input  type="text" v-model="email" required></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> *ID Articolo:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-input  type="text" v-model="articleId" required></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" >
        <p> *Data richiesta prenotazione:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationDate" required></b-form-datepicker>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> *Data inizio noleggio</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationStart" required></b-form-datepicker>
      </b-col>
    </b-row>
  
    <b-row>
      <b-col cols="3" >
        <p> *Data fine noleggio:</p>
      </b-col>
      <b-col cols="9" >
         <b-form-datepicker v-model="reservationEnd" required></b-form-datepicker>
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
          required
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
          required
        >          
        </b-form-checkbox>
      </b-col>
      <b-col cols="3">
        <p v-if="returned">L'articolo è stato restituito</p>
        <p v-else>L'articolo non è stato restituito</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> *Prezzo:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="price" type="number"  min="1" required></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> *Descrizione:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="notes" type="text" required></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p> Note (non visibili ai clienti):</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-model="privateNotes" type="text" required></b-form-input>
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
  import Functions from '../functions/function'
  export default {
    name: "create-article", 
    data() {
      return {

        email: '',
        articleId: '',
        price:' ',

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
      //controllare date prezzo e campi non vuoti
      let query = {};
      
      if(this.email == ''){ return (alert('Il campo mail non può essere vuoto'))}
      else query.email = this.email;

      if(this.articleId == ''){return(alert('Il campo ID articolo non può essere vuoto'))}
      else query.articleId = this.email;

      if(this.price == ''){return (alert('Il campo prezzo non può essere vuoto'))}
      if(this.price < 0){return(alert("Il prezzo deve essere maggiore di '0'"))}
      else query.price = this.price;

      if(this.reservationDate == ''){return(alert('Il campo Data richiesta di prenotazione non può essere vuoto'))}
      else{
        query.reservationDate = {}
        query.reservationDate.day = this.reservationDate.charAt(8) + this.reservationDate.charAt(9)
        query.reservationDate.month = this.reservationDate.charAt(5) + this.reservationDate.charAt(6)
        query.reservationDate.year = this.reservationDate.charAt(0) + this.reservationDate.charAt(1) + this.reservationDate.charAt(2) + this.reservationDate.charAt(3)
      } 

      if(this.reservationStart == ''){return(alert('Il campo Data inizio prenotazione non può essere vuoto'))}
      else{
        query.reservationStart = {}
        query.reservationStart.day = this.reservationStart.charAt(8) + this.reservationStart.charAt(9)
        query.reservationStart.month = this.reservationStart.charAt(5) + this.reservationStart.charAt(6)
        query.reservationStart.year = this.reservationStart.charAt(0) + this.reservationStart.charAt(1) + this.reservationStart.charAt(2) + this.reservationStart.charAt(3)
      } 

      if(this.reservationEnd == ''){return(alert('Il campo Data fine prenotazione non può essere vuoto'))}
      else{
        query.reservationEnd = {}
        query.reservationEnd.day = this.reservationEnd.charAt(8) + this.reservationEnd.charAt(9)
        query.reservationEnd.month = this.reservationEnd.charAt(5) + this.reservationEnd.charAt(6)
        query.reservationEnd.year = this.reservationEnd.charAt(0) + this.reservationEnd.charAt(1) + this.reservationEnd.charAt(2) + this.reservationEnd.charAt(3)
      } 

      if(this.reservationDate > this.reservationStart){return(alert("La data di prenotazione non può essere superiore al primo giorno di noleggio"))}
      if(this.reservationStart > this.reservationEnd){return(alert("La data di inizio noleggio non può essere superiore al ritiro"))}

      query.rentalOccurred = this.rentalOccurred;
      query.returned = this.returned;

      if(this.notes == ''){return(alert('Il campo Note non può essere vuoto'))}
      else query.notes = this.notes;

      //invio dati
       Functions.addReservation(this.email, this.articleId, query)
        .then(function(){

        //svuotiamo i valori
        this.cancel();
        alert("Creazione riuscita")
        })        
      },

      cancel(){
        this.email =  '';
        this.articleId =  '';
        this.reservationDate = '';
        this.reservationStart = '';
        this.reservationEnd = '';
        this.rentalOccurred =  false;
        this.returned =  false;
        this.price = '';
        this.notes = '';
        this.privateNotes = '';
      }

    },
  }
</script>