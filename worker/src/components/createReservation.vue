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

    created(){
      console.log(this.$route.params)
      if(this.$route.params.id != undefined)
        this.articleId = this.$route.params.id
      if(this.$route.params.price != undefined)
        this.price = this.$route.params.price
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
        else query.clientEmail = this.email;

        if(this.articleId == ''){return(alert('Il campo ID articolo non può essere vuoto'))}
        else query.productId = this.articleId;

        if(this.price == ''){return (alert('Il campo prezzo non può essere vuoto'))}
        if(this.price < 0){return(alert("Il prezzo deve essere maggiore di '0'"))}
        else query.price = this.price;

        if(this.reservationDate == ''){return(alert('Il campo Data richiesta di prenotazione non può essere vuoto'))}
        else{
          query.bookingDate = {}
          query.bookingDate.day = this.reservationDate.charAt(8) + this.reservationDate.charAt(9)
          query.bookingDate.month = this.reservationDate.charAt(5) + this.reservationDate.charAt(6)
          query.bookingDate.year = this.reservationDate.charAt(0) + this.reservationDate.charAt(1) + this.reservationDate.charAt(2) + this.reservationDate.charAt(3)
        } 

        if(this.reservationStart == ''){return(alert('Il campo Data inizio prenotazione non può essere vuoto'))}
        else{
          query.startDate = {}
          query.startDate.day = this.reservationStart.charAt(8) + this.reservationStart.charAt(9)
          query.startDate.month = this.reservationStart.charAt(5) + this.reservationStart.charAt(6)
          query.startDate.year = this.reservationStart.charAt(0) + this.reservationStart.charAt(1) + this.reservationStart.charAt(2) + this.reservationStart.charAt(3)
        } 

        if(this.reservationDate > this.reservationStart){return(alert("La data di prenotazione non può essere superiore al primo giorno di noleggio"))}

        if(this.reservationEnd == ''){return(alert('Il campo Data fine prenotazione non può essere vuoto'))}
        else{
          query.endDate = {}
          query.endDate.day = this.reservationEnd.charAt(8) + this.reservationEnd.charAt(9)
          query.endDate.month = this.reservationEnd.charAt(5) + this.reservationEnd.charAt(6)
          query.endDate.year = this.reservationEnd.charAt(0) + this.reservationEnd.charAt(1) + this.reservationEnd.charAt(2) + this.reservationEnd.charAt(3)
        } 
        if(this.reservationStart > this.reservationEnd){return(alert("La data di inizio noleggio non può essere superiore al ritiro"))}

        query.isTaken = this.rentalOccurred;
        query.isReturned = this.returned;

        if(this.notes == ''){return(alert('Il campo Note non può essere vuoto'))}
        else query.description = this.notes;
        query.note = this.privateNotes;

        //invio dati
        //Get user e get article per fottermi i dati da aggiungere a query

        //Aggiorniamo l'array delle prenotazioni del prodotto
        console.log('prima di getproduct')
        Functions.getProduct(this.articleId)
        .then( (result) =>{
          console.log('dentro getproduct')
           console.log(this.articleId)
           console.log(typeof(this.articleId))
          query.productTitle = result.data.data.obj.title
          query.productBrand = result.data.data.obj.brand
          let queryBooking = {};
          let newBookings = {};
          newBookings.id = this.articleId
          newBookings.clientId = this.email
          newBookings.startDate = {}
          newBookings.startDate.day = this.reservationStart.charAt(8) + this.reservationStart.charAt(9)
          newBookings.startDate.month = this.reservationStart.charAt(5) + this.reservationStart.charAt(6)
          newBookings.startDate.year = this.reservationStart.charAt(0) + this.reservationStart.charAt(1) + this.reservationStart.charAt(2) + this.reservationStart.charAt(3)
          newBookings.endDate = {}
          newBookings.endDate.day = this.reservationEnd.charAt(8) + this.reservationEnd.charAt(9)
          newBookings.endDate.month = this.reservationEnd.charAt(5) + this.reservationEnd.charAt(6)
          newBookings.endDate.year = this.reservationEnd.charAt(0) + this.reservationEnd.charAt(1) + this.reservationEnd.charAt(2) + this.reservationEnd.charAt(3)
          queryBooking.bookings = result.data.data.obj.bookings
          queryBooking.bookings.push(newBookings)

          Functions.saveDataProduct(this.articleId, queryBooking)
          //this.email
          console.log('prima di getuser')
          Functions.getUser('61976c4fa4f23a08ccadf8ba')
          .then( (result) => {
            console.log('dentro getuser')
            query.clientName = result.data.data.userName
            query.clientSurname = result.data.data.userSurname
            Functions.addReservation(query)
            .then( () => {
              console.log('dentro addreservation')
              this.cancel();
              alert("Creazione riuscita")
            })   
          })
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