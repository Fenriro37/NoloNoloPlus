<template>
  <div class="container-fluid ">
    <b-row>
      <b-col cols="6">
        <b-img v-bind:src="bookedArticles.image" class="img-thumbnail"></b-img>
      </b-col>
      <b-col cols="6">
        <p>{{bookedArticles.title + ' ' +bookedArticles.brand}}</p>

        <p>Id Articolo: <a href="">{{ bookedArticles.identifier}}</a></p>

        <p>mail Cliente: <a href="">{{ clientEmail}}</a></p>

        <template v-if="!boolModify">
          <p>Prezzo: {{bookedArticles.price}}€ (da rivedere)</p>
        </template>
        <template v-else>
          <b-row>
            <b-col cols="2">
              <p>Prezzo:</p>
            </b-col>
            <b-col cols="6">
              <b-form-input type="number" v-model="copyPrice"></b-form-input>
            </b-col>
          </b-row>
        </template>

      </b-col>
    </b-row>
    <b-row>
      <p  v-if="!boolModify">Data richiesta prenotazione: {{bookingRequest}}</p>  
      <template v-else>
        <b-col cols="3">
          <p  >Data richiesta prenotazione: </p>
        </b-col>
        <b-col cols="3">  
          <b-form-datepicker  v-model="copyBookingRequest" :placeholder="copyBookingRequest"  ></b-form-datepicker>
        </b-col>
      </template>
    </b-row>

    <b-row>
      <template v-if="!boolModify">
        <b-col cols="4">
          <p v-if="!boolModify">Data inizio prenotazione: {{bookingStart}}</p>
        </b-col>
        <b-col cols="4">
          <b-form-checkbox v-if="!boolModify" :checked="rentalOccurred" :disabled="!boolModify">
            Avvenuta consegna
          </b-form-checkbox>
        </b-col>  
      </template>
        
      <template v-else>
        <b-col cols="3">
          <p  >Data inizio prenotazione: </p>
        </b-col>

        <b-col cols="3">  
          <b-form-datepicker v-model="copyBookingStart" :placeholder="copyBookingStart"  ></b-form-datepicker> 
        </b-col>
        <b-col cols="3">
          <b-form-checkbox          
          :checked="copyRentalOccurred"
          v-model="copyRentalOccurred"          
          >
            Avvenuta consegna
          </b-form-checkbox>
        </b-col>
      </template>
    </b-row>

    <b-row>
      
      <template v-if="!boolModify">
        <b-col cols="4">
          <p>Data fine prenotazione: {{bookingEnd}}</p> 
        </b-col>
        <b-col cols="4">
          <b-form-checkbox :checked="returned" :disabled="!boolModify">
            Avvenuta Restituzione 
          </b-form-checkbox>
        </b-col>
      </template>

      <template v-else>
        <b-col cols="3">
          <p  >Data Fine prenotazione: </p>
        </b-col>
        <b-col cols="3">  
          <b-form-datepicker v-model="copyBookingEnd" :placeholder="copyBookingEnd"  ></b-form-datepicker> 
        </b-col>        
        <b-col cols="3">
          <b-form-checkbox :checked="copyReturned" v-model="copyReturned">
            Avvenuta Restituzione 
          </b-form-checkbox>
        </b-col>
      </template>
    </b-row>

    <b-row>
      <p  v-if="!boolModify">{{notes}}</p>
      <b-form-input v-else type="text" v-model="copyNotes"  ></b-form-input>
    </b-row>
    <b-row>
      <p  v-if="!boolModify">{{privateNotes}}</p>
      <b-form-input v-else type="text" v-model="copyPrivateNotes"></b-form-input>
    </b-row>

    <b-button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary" @click="modify">Modifica</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-success" @click="saveData" >Salva</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger" @click="undoChange">Annulla</b-button>
    <button class="btn btn-lg btn-danger delete"> Cancella prenotazione</button>
  </div>
</template>

<script>
  import Functions from '../functions/function'
  export default {
    data() {
      return {
        clientEmail:'mario.draghi@gmail.com', //IDcliente(nome cognome)
        bookedArticles: {     //uno o più articoli [](se ci sono più articoli le date combaciano)
          identifier:'156945145614',
          title:'Bici',
          brand:'deGasperi',
          image:'https://acquisti.corriere.it/wp-content/uploads/2021/05/BIciclette-Via-Veneto.jpeg',
          price:2000,
         /*  discount: {    //per risalire allo sconto 
            onSale: false,
            onSaleType: false,  //percentuale o fisso
            onSaleValue: 0
          }, */
        },
        bookingRequest: '12/1/2021', //richiesta noleggio
        bookingStart: '12/2/2021',   //inizio noleggio
        bookingEnd:'12/5/2021',   //fine noleggio
        
        rentalOccurred: true,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        
        notes:'Questa è una prenotazione',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'Questo è privato',                //note 2 (dettagli non visibili al cliente)

        boolModify : false,

        //Copia dei dati
        copyPrice: 0,
        copyOnSale: false,
        copyOnSaleType: false,  //percentuale o fisso
        copyOnSaleValue: '',
        copyBookingRequest:'',
        copyBookingStart:'',
        copyBookingEnd :'',
        copyRentalOccurred:'',
        copyReturned :'',
        copyNotes : '',
        copyPrivateNotes:'',

      }
    },
    methods: {
      modify(){
        this.copyPrice = this.bookedArticles.price
        /* this.copyOnSale = this.bookedArticles.discount.onSale
        this.copyOnSaleType = this.bookedArticles.discount.onSaleType
        this.copyOnSaleValue = this.bookedArticles.discount.onSaleValue */

        this.copyBookingRequest = this.bookingRequest
        this.copyBookingStart = this.bookingStart
        this.copyBookingEnd = this.bookingEnd
        this.copyRentalOccurred = this.rentalOccurred
        this.copyReturned = this.returned
        this.copyNotes = this.notes
        this.copyPrivateNotes  = this.privateNotes

        this.boolModify = true
      },

      undoChange(){
        this.boolModify = false;
      },

      saveData(){
        let query = {}

        if(this.copyPrice != this.price)
          query.price = this.copyPrice;

        /* if(this.copyOnSale != this.discount.onSale)
          query.onSale = this.copyOnSale;

        if(this.copyOnSaleType != this.discount.onSaleType)
          query.onSaleType = this.copyOnSaleType;

        if(this.copyOnSaleValue != this.discount.onSaleValue)
          query.onSaleValue = this.copyOnSaleValue; */
          
        if(this.copyBookingRequest != this.bookingRequest)
          query.bookingRequest = this.copyBookingRequest;

        if(this.copyBookingStart != this.bookingStart)
          query.bookingStart = this.copyBookingStart;

        if(this.copyBookingEnd != this.bookingEnd)
          query.bookingEnd = this.copyBookingEnd;
        
        if(this.copyRentalOccurred != this.rentalOccurred)
          query.rentalOccurred = this.copyRentalOccurred;

        if(this.copyReturned != this.returned)
          query.returned = this.copyReturned;

        if(this.copyNotes != this.notes)
          query.notes = this.copyNotes;
          
        if(this.copyPrivateNotes != this.privateNotes)
          query.privateNotes = this.copyPrivateNotes;
          
        console.log(query);
        Functions.saveReservation(this.identifier, query)
        .then(response => {
          if(response.status == '200'){
            
          this.bookedArticles.price = this.copyPrice
          /* this.bookedArticles.discount.onSale = this.copyOnSale
          this.bookedArticles.discount.onSaleType = this.copyOnSaleType
          this.bookedArticles.discount.onSaleValue = this.copyOnSaleValue */
          this.bookingRequest = this.copyBookingRequest
          this.bookingStart = this.copyBookingStart
          this.bookingEnd = this.copyBookingEnd
          this.rentalOccurred = this.copyRentalOccurred
          this.returned = this.copyReturned
          this.notes  = this.copyNotes
          this.privateNotes  = this.copyPrivateNotes

            
            this.boolModify = false;
            }
        })


      }
    },
     
  }

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
    background-color: rgb(201, 201, 238);
}
.input-group {
    margin-left: auto;
    margin-right: auto;
}
.input-group-text {
    width: 2.5em;
}
.btn-lg {
    margin-right: 0.5em;
    margin-bottom: 0.5rem;
}
.row {
  margin-bottom: 0.5em ;
}
.tab{
  padding-left: 2.5em;
}
.delete {
  float: right
}
.img-thumbnail {
    padding: 0.5em;
    background-color: rgb(156, 156, 156);
    border: 0px;
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}
.delete {
  float: right
}
</style>