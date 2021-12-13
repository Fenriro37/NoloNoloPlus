<template>
  <div class="container-fluid ">
    <b-row>
      <b-col cols="6">
        <b-img v-bind:src="bookedArticles.image" class="img-thumbnail"></b-img>
      </b-col>
      <b-col cols="6">
        <p>Id prenotazione: {{reservationId}} </p>
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
          <b-form-datepicker  v-model="copyBookingRequest" :placeholder="copyBookingRequest"  format="DD/MM/yyyy" ></b-form-datepicker>
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
          <b-form-datepicker v-model="copyBookingEnd" :placeholder="copyBookingEnd"  format="DD/MM/yyyy"></b-form-datepicker> 
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
    
    <p> {{bookingStart}} </p>
    <p> {{copyBookingStart}} </p>
  </div>
  
</template>

<script>
  import Functions from '../functions/function'
  export default {
    data() {
      return {
        reservationId: '',
        clientEmail:'', //IDcliente(nome cognome)
        bookedArticles: {     //uno o più articoli [](se ci sono più articoli le date combaciano)
          identifier:'',
          title:'',
          brand:'',
          image:'',
          price: '',
          discount: {    //per risalire allo sconto 
            onSale: false,
            onSaleType: false,  //percentuale o fisso
            onSaleValue: 0
          },
        },
        bookingRequest: '', //richiesta noleggio
        bookingStart: '',   //inizio noleggio
        bookingEnd:'',   //fine noleggio
        
        rentalOccurred: true,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        
        notes:'',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'',                //note 2 (dettagli non visibili al cliente)

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
    created() {
      Functions.getReservation(this.$route.params.id).then((result) => {
        console.log(result)
        this.reservationId = this.$route.params.id
        this.clientEmail = result.data.data.obj.clientEmail 
        this.bookedArticles.identifier = result.data.data.obj.productId 
        this.bookedArticles.title = result.data.data.obj.productTitle 
        this.bookedArticles.brand = result.data.data.obj.productBrand
        this.bookedArticles.image = result.data.data.obj.image 
        this.bookedArticles.price = result.data.data.obj.price

        this.bookingRequest = result.data.data.obj.bookingDate.year + '-' + result.data.data.obj.bookingDate.month + '-' + result.data.data.obj.bookingDate.day
        this.bookingStart = result.data.data.obj.startDate.year + '-' + result.data.data.obj.startDate.month + '-' + result.data.data.obj.startDate.day
        this.bookingEnd = result.data.data.obj.endDate.year + '-' + result.data.data.obj.endDate.month + '-' + result.data.data.obj.endDate.day 
        
        this.rentalOccurred = result.data.data.obj.isTaken 
        this.returned = result.data.data.obj.isReturned 
        this.notes = result.data.data.obj.description 
        this.privateNotes = result.data.data.obj.note    

        
      })
    },

    methods: {
      modify(){
        this.copyPrice = this.bookedArticles.price
        this.copyOnSale = this.bookedArticles.discount.onSale
        this.copyOnSaleType = this.bookedArticles.discount.onSaleType
        this.copyOnSaleValue = this.bookedArticles.discount.onSaleValue 

        this.copyBookingRequest = this.bookingRequest
        this.copyBookingStart = this.bookingStart
        this.copyBookingEnd = this.bookingEnd
        this.copyRentalOccurred = this.rentalOccurred
        this.copyReturned = this.returned
        this.copyNotes = this.notes
        this.copyPrivateNotes  = this.privateNotes

        console.log(typeof(this.copyBookingStart))
        this.boolModify = true
      },

      undoChange(){
        this.boolModify = false;
      },

      saveData(){
        console.log(typeof(this.copyBookingStart))
        if(this.copyPrice <= 0){ return (alert('Il prezzo deve essere un numero positivo'))}

        if(this.copyBookingRequest > this.copyBookingStart){ return (alert('Il campo Data richiesta prenotazione non può essere superiore rispetto alla data inizio prenotazione'))}
        if(this.copyBookingStart > this.copyBookingEnd){ return (alert('Il campo Data inizio prenotazione non può essere superiore rispetto alla data fine prenotazione'))}

        if(this.copyRentalOccurred == false && this.copyReturned){ return (alert("L'articolo non può essere stato restituito se non è stato consegnato"))}

        let query = {}

        if(this.copyPrice != this.bookedArticles.price)
          query.price = this.copyPrice;

        /*if(this.copyOnSale != this.bookedArticles.discount.onSale)
            query.onSale = this.copyOnSale;

          if(this.copyOnSaleType != this.bookedArticles.discount.onSaleType)
            query.onSaleType = this.copyOnSaleType;

          if(this.copyOnSaleValue != this.bookedArticles.discount.onSaleValue)
            query.onSaleValue = this.copyOnSaleValue;  */
          
         let dateChanged = false 
         if(this.copyBookingRequest != this.bookingRequest){
          query.bookingDate = {}
          query.bookingDate.day = this.copyBookingRequest.charAt(8) + this.copyBookingRequest.charAt(9)
          query.bookingDate.month = this.copyBookingRequest.charAt(5) + this.copyBookingRequest.charAt(6)
          query.bookingDate.year = this.copyBookingRequest.charAt(0) + this.copyBookingRequest.charAt(1) + this.copyBookingRequest.charAt(2) + this.copyBookingRequest.charAt(3)
        }
          
        if(this.copyBookingStart != this.bookingStart){
          dateChanged = true
          query.startDate = {}
          query.startDate.day = this.copyBookingStart.charAt(8) + this.copyBookingStart.charAt(9)
          query.startDate.month = this.copyBookingStart.charAt(5) + this.copyBookingStart.charAt(6)
          query.startDate.year = this.copyBookingStart.charAt(0) + this.copyBookingStart.charAt(1) + this.copyBookingStart.charAt(2) + this.copyBookingStart.charAt(3)
        }
         
        if(this.copyBookingEnd != this.bookingEnd){
          dateChanged= true
          query.endDate = {}
          query.endDate.day = this.copyBookingEnd.charAt(8) + this.copyBookingEnd.charAt(9)
          query.endDate.month = this.copyBookingEnd.charAt(5) + this.copyBookingEnd.charAt(6)
          query.endDate.year = this.copyBookingEnd.charAt(0) + this.copyBookingEnd.charAt(1) + this.copyBookingEnd.charAt(2) + this.copyBookingEnd.charAt(3)
        }        
        
        if(this.copyRentalOccurred != this.rentalOccurred)
          query.isTaken = this.copyRentalOccurred;

        if(this.copyReturned != this.returned)
          query.isReturned = this.copyReturned;

        if(this.copyNotes != this.notes)
          query.description = this.copyNotes;
          
        if(this.copyPrivateNotes != this.privateNotes)
          query.note = this.copyPrivateNotes;
          
        console.log(query);
        Functions.saveReservation(this.reservationId, query)
        .then( () => {
          if(dateChanged){
            console.log('dataModificata')
          
            Functions.getProduct(this.bookedArticles.identifier)
            .then( (result) =>{
              console.log('trovato id')
              console.log(result)
              let query = {};
              let newBookings = {};
              newBookings.id = this.bookedArticles.identifier
              newBookings.clientId = this.clientEmail
              newBookings.startDate = {}
              let d1 = this.copyBookingStart.split('-')
              newBookings.startDate.day = d1[2]
              newBookings.startDate.month = d1[1]
              newBookings.startDate.year = d1[0]
              let d2 = this.copyBookingEnd.split('-')
              newBookings.endDate = {}
              newBookings.endDate.day = d2[2]
              newBookings.endDate.month = d2[1]
              newBookings.endDate.year = d2[0]

              console.log(result)

              let d3 = this.bookingStart.split('-')
              let oldStartDate = {}
              oldStartDate.day = d3[2]
              oldStartDate.month = d3[1]
              oldStartDate.year = d3[0] 
              let d4 = this.bookingEnd.split('-')
              let oldEndDate = {}
              oldEndDate.day = d4[2]
              oldEndDate.month = d4[1]
              oldEndDate.year = d4[0]


              query.bookings = result.data.data.obj.bookings
              for (let i in query.bookings){
                if(query.bookings[i].id == newBookings.id  && JSON.stringify(query.bookings[i].startDate) === JSON.stringify(oldStartDate) && JSON.stringify(query.bookings[i].endDate) === JSON.stringify(oldEndDate)){                  
                  query.bookings[i].startDate.day = newBookings.startDate.day
                  query.bookings[i].startDate.month = newBookings.startDate.month
                  query.bookings[i].startDate.year = newBookings.startDate.year
                  query.bookings[i].endDate.day = newBookings.endDate.day
                  query.bookings[i].endDate.month = newBookings.endDate.month
                  query.bookings[i].endDate.year = newBookings.endDate.year
                }
              }
              Functions.saveDataProduct(this.bookedArticles.identifier, query)
              .then(  () =>{
                //Aggiorniamo l'articolo
                this.bookedArticles.price = this.copyPrice 
                this.bookingRequest = this.copyBookingRequest
                this.bookingStart = this.copyBookingStart
                this.bookingEnd = this.copyBookingEnd
                this.rentalOccurred = this.copyRentalOccurred
                this.returned = this.copyReturned
                this.notes  = this.copyNotes
                this.privateNotes  = this.copyPrivateNotes
                  
                this.boolModify = false;    
                alert("Modifica data riuscita") 
              }) 
            })
          }                                       
        })           
      },
    }
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