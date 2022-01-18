<template>
<div class="container-fluid d-flex justify-content-center" id="main">
  <div class="w-50">
    <div class="row mt-3">
      <div class="col-6" id="img">
        <b-img v-bind:src="reservation.productImage" class="img-thumbnail"></b-img>
      </div>
      <div class="col-6" id="info">
        <p>Id prenotazione: {{reservationId}} </p>
        <p><router-link :to="{ name: 'article',  params: { id: reservation.productId} }">{{reservation.productTitle + ' ' +reservation.productBrand}}</router-link></p>
        <p><router-link :to="{name: 'client', params:{email: reservation.clientEmail, choice: 1}}" >{{reservation.clientEmail}}</router-link></p>
      </div>
    </div>
    <form name="myform" id="formId" @submit.prevent="saveData">

      <div class="form-floating mb-3 mt-3">
        <input id="bookingRequest" :value="bookingRequest" class="form-control" type="text" aria-label="bookingRequest" aria-describedby="basic-addon" readonly disabled>
        <label for="bookingRequest"> Data richiesta prenotazione</label>
      </div>

      <div class="row mb-3">
        <div class="col-3">
          <label for="date" class="mr-3">Periodo Prenotazione </label>
        </div>
        <div class="col-9">
          <date-picker :input-attr="{required: 'true'}"  id="date" v-model="time" @change="newPrice" range :lang="lang" :disabled-date="dateDisabled" format="DD-MM-YYYY" required></date-picker> 
        </div>
      </div>

      <div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" :readonly="!boolModify" v-model="fixedPrice" v-on:keyup="newPrice" aria-label="Recipient's fixedprice" aria-describedby="basic-addon6" required>
				<label for="price"> Prezzo Fisso*</label>
			</div>

      <div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo fisso:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" :disabled="!boolModify" :checked="onSale"  @click="changeSale">
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
                <input class="form-check-input" type="radio" :disabled="!boolModify" :value="true" :checked="onSaleType" @click="changeOnSaleType" id="percentage" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" :disabled="!boolModify" :value="false" :checked="!onSaleType" @click="changeOnSaleType" id="flat" required>
                <label class="form-check-label" for="flat">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" class="form-control" min="1" step="1" :readonly="!boolModify" v-model="onSaleValue" v-on:keyup="newPrice"  id="saleValue" aria-label="saleValue" aria-describedby="basic-addon6" required>
            </div>
          </div>
        </div>
      </template>


			<div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" :readonly="!boolModify" v-model="dailyPrice" v-on:keyup="newPrice" aria-label="Recipient's price" aria-describedby="basic-addon6" required>
				<label for="price"> Prezzo Giornaliero*</label>
			</div>

      <div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo giornaliero:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" class="form-check-input" :disabled="!boolModify" :checked="overOnSale"  @click="changeDailySale">
						<label class="form-check-label" for="sale"  v-if="overOnSale">L'articolo verrà scontato</label>
            <label class="form-check-label" for="sale"  v-else>Il prodotto non è scontato</label>
					</div>
				</div>
			</div>

      <template v-if="overOnSale">
        <div id="saleInfoOver" class="mt-2">
          <div class="row">
            <div class="col-3"><p> Tipo di sconto:</p></div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" :disabled="!boolModify" :value="true" :checked="overOnSaleType"  @click="changeType" id="percentageOver" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" :disabled="!boolModify" :value="false" :checked="!overOnSaleType" @click="changeType"  id="flatOver" required>
                <label class="form-check-label" for="flat">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" class="form-control" min="1" step="1" :readonly="!boolModify" v-model="overOnSaleValue" v-on:keyup="newPrice" id="saleValueOVer" aria-label="saleValueOver" aria-describedby="basic-addon6" required>
            </div>
          </div>
          <div class="row mt-2 mb-2">
            <div class="col-3">Giorni per sconto:</div>
            <div class="col-9">
              <input type="number" class="form-control" min="1" step="1" :readonly="!boolModify"  v-model="overDaysCount" v-on:keyup="newPrice"  id="daysDiscount" aria-label="daysDiscount" aria-describedby="basic-addon6" required>
          </div>
        </div>
      </template>

      <div class="form-floating mb-3">
				<input type="number" class="form-control" :value="newTotal" aria-label="Recipient's price" aria-describedby="basic-addon6" readonly>
				<label for="price"> Prezzo Totale</label>
			</div>
       

      <div class="form-floating mb-3">
        <input type="text" id="notes" class="form-control" :readonly="!boolModify"  v-model="notes" aria-label="notes" aria-describedby="basic-addon"  >
        <label for="notes"> Descrizione</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="privateNotes" class="form-control" :readonly="!boolModify" v-model="privateNotes"  aria-label="privateNotes" aria-describedby="basic-addon" >
        <label for="privateNotes"> Note(non visibili ai clienti)</label>
      </div>

      <div class="row mb-3">
        <div class="col-6 form-check ">
          <input class="form-check-input" type="checkbox" :disabled="!boolModify" :checked="rentalOccurred" @click="changeRentalOccured" id="flexCheckDefault1">
          <label v-if="rentalOccurred" class="form-check-label" for="flexCheckDefault">Il prodotto è stato ritirato</label>
          <label v-else class="form-check-label" for="flexCheckDefault">Il prodotto non è stato ritirato</label>
        </div>
        <div class="col-6 form-check">
          <input class="form-check-input" type="checkbox" :disabled="!boolModify" :checked="returned" @click="changeReturned" id="flexCheckDefault2">
          <label v-if="returned" class="form-check-label" for="flexCheckDefault"> Il prodotto è stato restituito </label>
          <label v-else class="form-check-label" for="flexCheckDefault"> Il prodotto non è stato restituito </label>
        </div>
      </div>


    <b-button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary mb-2 mt-2 mr-2" @click="modify">Modifica</b-button>
    <b-button v-if="boolModify" type="submit" class="btn btn-lg btn-success m-2" @click="saveData" >Salva</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger m-2" @click="undoChange">Annulla</b-button>
    <button class="btn btn-lg btn-danger delete mb-2 mt-2 ml-2" @click="deleteReservation" disabled> Cancella prenotazione</button>
    </form>
  </div> 
</div> 
  
</template>

<script>
  import Functions from '../functions/function'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    components: { DatePicker },
    data() {
      return {
        reservation: {},
        bookings: [],
        available:'',

        reservationId: '',

        bookingRequest: '', //richiesta noleggio
        bookingStart: '',   //inizio noleggio
        bookingEnd:'',   //fine noleggio

        dailyPrice:'',
        fixedPrice: '',
        newTotal: '',
        onSale: false,
        onSaleType: false,
        onSaleValue: 0,
        overDaysCount: '',
        overOnSale: false,
        overOnSaleType : false,
        overOnSaleValue: 0,   
        
        rentalOccurred: true,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        notes:'',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'',                //note 2 (dettagli non visibili al cliente)
        
        time: null,
        lang: {
          formatLocale: {
            firstDayOfWeek: 1,
            months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Augosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            monthsShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            weekdaysMin: ['Do','Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', ],
          },
          monthBeforeYear: false,
        },

        boolModify: false,

      }
    },
    created() {
      Functions.getReservation(this.$route.params.id).then((result) => {
        
        this.reservationId = this.$route.params.id
        this.reservation = result.data.data.obj
        console.log(this.reservation)

        this.undoChange()

        Functions.getProduct(this.reservation.productId).then((result)=> {
          this.bookings = result.bookings
          this.available = result.available
        })
        
      })
    },

    methods: {

      modify(){
        this.boolModify = true
      },

      undoChange(){
        this.dailyPrice = this.reservation.variablePrice
        this.fixedPrice = this.reservation.fixedPrice
        this.newTotal = this.reservation.totalPrice
        this.onSale = this.reservation.fixedDiscount.onSale
        this.onSaleType = this.reservation.fixedDiscount.onSaleType
        this.onSaleValue = this.reservation.fixedDiscount.onSaleValue
        this.overDaysCount = this.reservation.variableDiscount.days
        this.overOnSale = this.reservation.variableDiscount.onSale
        this.overOnSaleType = this.reservation.variableDiscount.onSaleType
        this.overOnSaleValue = this.reservation.variableDiscount.onSaleValue

        this.bookingRequest = this.reservation.bookingDate.day + '-' + this.reservation.bookingDate.month + '-' + this.reservation.bookingDate.year
        this.bookingStart = this.reservation.startDate.year + '-' + this.reservation.startDate.month + '-' + this.reservation.startDate.day
        this.bookingEnd = this.reservation.endDate.year + '-' + this.reservation.endDate.month + '-' + this.reservation.endDate.day 
        
        this.rentalOccurred = this.reservation.isTaken 
        this.returned = this.reservation.isReturned 
        this.notes = this.reservation.description 
        this.privateNotes = this.reservation.note
        this.boolModify = false 
      },

      saveData(){
        if(this.boolModify){
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
            else{
                  this.bookedArticles.price = this.copyPrice 
                  this.bookingRequest = this.copyBookingRequest
                  this.rentalOccurred = this.copyRentalOccurred
                  this.returned = this.copyReturned
                  this.notes  = this.copyNotes
                  this.privateNotes  = this.copyPrivateNotes
                    
                  this.boolModify = false;    
                  alert("Modifica data riuscita") 
            }                                       
          })   
        }
        else if(this.boolVerify){
          console.log("BoolVerify")
          if(this.copyRentalOccurred == false && this.copyReturned){ return (alert("L'articolo non può essere stato restituito se non è stato consegnato"))}
          if (this.copyRentalOccurred !=  this.rentalOccurred || this.copyReturned != this.returned){
            let query = {}
            query.isTaken = this.copyRentalOccurred;
            query.isReturned = this.copyReturned;
            Functions.saveReservation(this.reservationId, query).then( ()  =>{
              console.log("saveReservation")
              this.rentalOccurred = this.copyRentalOccurred;
              this.returned = this.copyReturned
              this.boolVerify = false;
              alert("Modifica effettuata")       
            })
          }
        } 
      },

      deleteReservation(){
        const current = new Date();      
        const date = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate() 
        //controlliamo se possiamo eliminare la prenotazione
        if(date >= this.bookingStart) return(alert('La prenotazione non è modificabile'))
        if(this.boolModify){
          if(!this.copyRentalOccurred) return(alert('Il prodotto non è stato consegnato'))
          if(!this.copyReturned) return(alert('Il prodotto non è stato restituito'))
        }
        else{
          if(!this.rentalOccurred) return(alert('Il prodotto non è stato consegnato'))
          if(!this.returned) return(alert('Il prodotto non è stato restituito'))
        }
        Functions.getProduct(this.bookedArticles.identifier)
        .then( (result) =>{
          let query = {}
          query.bookings = result.data.data.obj.bookings
          for (let i in query.bookings){
            if(query.bookings[i].reservationId == this.reservationId)
              query.bookings.splice(i, 1);
          }
          Functions.saveDataProduct(this.bookedArticles.identifier, query)
          .then( () =>{
            Functions.deleteReservation(this.reservationId)
            this.$router.push({name: 'reservationCatalog'  , params: {filter: ""}})
          })

        })
      },

      changeRentalOccured(){
        if(!this.rentalOccurred)
          this.rentalOccurred = true 
        else
          this.rentalOccurred = false
          this.returned = false
      },

      changeReturned(){
        if(!this.returned){
          this.returned = true
          this.rentalOccurred = true 
        }
        else
          this.returned = false
      },
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
      changeOnSaleType(){
        this.onSaleType = !this.onSaleType
        this.newPrice()
      },

      changeDailySale(){
        if(this.overOnSale){
        this.overOnSale = false
        this.overOnSaleType = false
        this.overOnSaleValue = 1
        }
        else
          this.overOnSale = true
        this.newPrice()
      },

      changeType(){ 
          this.overOnSaleType = !this.overOnSaleType 
          this.newPrice()
      },
      newPrice(){
        if (this.time!= null){
          let day = this.time[0].getDate()
          let month = this.time[0].getMonth()+1
          let year = this.time[0].getFullYear()
          let day1 = this.time[1].getDate()
          let month1 = this.time[1].getMonth()+1
          let year1 = this.time[1].getFullYear()
          let start = year * 10000 + month * 100 + day
          let end = year1 * 10000 + month1 * 100 + day1
          let days = end - start + 1
          let addendum1, addendum2


          if(this.onSale){
            if(this.onSaleType)
              addendum1 = this.fixedPrice - this.fixedPrice * this.onSaleValue /100
            else
              addendum1 = this.fixedPrice - this.onSaleValue
          }
          else{
            addendum1 = this.fixedPrice
          }
          if(this.overOnSale && days > this.overDaysCount ){
            if(this.overOnSaleType)
              addendum2 = this.dailyPrice * days - this.dailyPrice * this.overOnSaleValue / 100
            else
              addendum2 = this.dailyPrice * days - this.overOnSaleValue
          }
          else{
            addendum2 = this.dailyPrice * days
          }
          console.log(start +'-'+ end +'-'+ addendum1 +'-'+ addendum2)
          this.newTotal = parseInt(addendum1)+ parseInt(addendum2)
          }
      },
      dateDisabled(date) {         
        const today = new Date();
        if(date < today)
          return true

        for(let i in this.bookings){
          let start =  new Date(this.bookings[i].startDate.year, this.bookings[i].startDate.month -1, this.bookings[i].startDate.day) 
          let end = new Date(this.bookings[i].endDate.year, this.bookings[i].endDate.month -1, this.bookings[i].endDate.day) 

          if(start <= date && date <= end) 
            return true
        }   
        return false  
      }
    }
  }

</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
