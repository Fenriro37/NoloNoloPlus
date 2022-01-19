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
          <date-picker :disabled="!boolModify" :placeholder="bookingStart + ' ~ ' + bookingEnd" id="date" v-model="time" @change="newPrice" range :lang="lang" :disabled-date="dateDisabled" format="DD-MM-YYYY" required></date-picker> 
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
    <b-button v-if="boolModify" type="submit" class="btn btn-lg btn-success m-2"  >Salva</b-button>
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
          this.bookings = result.data.data.obj.bookings
          console.log(this.bookings)
          this.available = result.data.data.obj.available
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
        this.bookingStart = this.reservation.startDate.day + '-' + this.reservation.startDate.month + '-' + this.reservation.startDate.year
        this.bookingEnd = this.reservation.endDate.day + '-' + this.reservation.endDate.month + '-' + this.reservation.endDate.year 
        
        this.rentalOccurred = this.reservation.isTaken 
        this.returned = this.reservation.isReturned 
        this.notes = this.reservation.description 
        this.privateNotes = this.reservation.note
        this.time = null
        this.boolModify = false 
      },

      saveData(){

        let query = {}

        //controlliamo i prezzi
        if(this.dailyPrice != this.reservation.variablePrice)
          query.variablePrice = this.dailyPrice;
        if(this.fixedPrice != this.reservation.fixedPrice)
          query.fixedPrice = this.fixedPrice;

        if( this.onSale != this.reservation.fixedDiscount.onSale || this.onSaleType != this.reservation.fixedDiscount.onSaleType || this.onSaleValue != this.reservation.fixedDiscount.onSaleValue){
          query.fixedDiscount = {}

            query.fixedDiscount.onSale = this.onSale
            query.fixedDiscount.onSaleType = this.onSaleType
            query.fixedDiscount.onSaleValue = this.onSaleValue
        }

        if( this.overDaysCount != this.reservation.variableDiscount.days || this.overOnSale != this.reservation.variableDiscount.onSale || this.overOnSaleType != this.reservation.variableDiscount.onSaleType || this.overOnSaleValue != this.reservation.variableDiscount.onSaleValue){
        query.variableDiscount = {}
        query.variableDiscount.onSale = this.overOnSale
        query.variableDiscount.onSaleType = this.overOnSaleType
        query.variableDiscount.days = this.overDaysCount
        query.variableDiscount.onSaleValue = this.overOnSaleValue
        }

        if(this.rentalOccurred != this.reservation.isTaken)
          query.isTaken = this.rentalOccurred;
        if(this.returned != this.reservation.isReturned)
          query.isReturned = this.returned;
        if(this.notes != this.reservation.description)
          query.description = this.notes;
        if(this.privateNotes != this.reservation.note)
          query.note = this.privateNotes;

        if(this.time != null){
          //prendere i dati
          let day = this.time[0].getDate()
          let month = this.time[0].getMonth()+1
          let year = this.time[0].getFullYear()
          let day1 = this.time[1].getDate()
          let month1 = this.time[1].getMonth()+1
          let year1 = this.time[1].getFullYear()
          //modificare reservation
          query.startDate = {}
          query.startDate.day = day
          query.startDate.month = month
          query.startDate.year = year
          query.endDate = {}
          query.endDate.day = day1
          query.endDate.month = month1
          query.endDate.year = year1
          this.bookingStart = day + '-' + month + '-' + year
          this.bookingEnd = day1 + '-' + month1 + '-' + year1
          //modificare bookins
          for(let i in this.bookings){
            if(this.reservationId == this.bookings[i].reservationId){
              this.bookings[i].startDate.day = day
              this.bookings[i].startDate.month = month
              this.bookings[i].startDate.year = year
              this.bookings[i].endDate.day = day1
              this.bookings[i].endDate.month = month1
              this.bookings[i].endDate.year = year1
            }
          }
          //update product
          let query1 = {}
          query1.bookings = this.bookings
          Functions.saveDataProduct(this.reservation.productId, query1)
          .then( () => {
            alert("Articolo Modificato")
          })          
        }
            
        console.log(query);
        Functions.saveReservation(this.reservationId, query)
        .then( () => {
        //update current date
        alert("Modifica Riuscita")
        this.reservation.variablePrice = this.dailyPrice
        this.reservation.fixedPrice = this.fixedPrice
        this.reservation.totalPrice = this.newTotal
        this.reservation.fixedDiscount.onSale = this.onSale
        this.reservation.fixedDiscount.onSaleType = this.onSaleType
        this.reservation.fixedDiscount.onSaleValue = this.onSaleValue
        this.reservation.variableDiscount.days = this.overDaysCount
        this.reservation.variableDiscount.onSale = this.overOnSale
        this.reservation.variableDiscount.onSaleType = this.overOnSaleType
        this.reservation.variableDiscount.onSaleValue = this.overOnSaleValue
        
        this.reservation.isTaken = this.rentalOccurred
        this.reservation.isReturned = this.returned
        this.reservation.description =  this.notes
        this.reservation.note =  this.privateNotes

        this.time = null
        this.boolModify = false 
        
        })     
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
          this.onSaleValue = ''
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
        this.overOnSaleValue = ''
        this.overDaysCount = ''
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
        let day, month, year, day1, month1, year1, start, end
        if (this.time != null){
          day = this.time[0].getDate()
          month = this.time[0].getMonth()+1
          year = this.time[0].getFullYear()
          day1 = this.time[1].getDate()
          month1 = this.time[1].getMonth()+1
          year1 = this.time[1].getFullYear()
          start = year * 10000 + month * 100 + day
          end = year1 * 10000 + month1 * 100 + day1
          }
        else{
          let d1 = new Date(this.reservation.startDate.year, this.reservation.startDate.month-1, this.reservation.startDate.day)
          let d2 = new Date(this.reservation.endDate.year, this.reservation.endDate.month-1, this.reservation.endDate.day) 
          start = parseInt(d1.getFullYear()) * 10000 + (parseInt(d1.getMonth()) + 1) * 100 +parseInt(d1.getDate()) 
          end = parseInt(d2.getFullYear()) * 10000 + (parseInt(d2.getMonth()) + 1) * 100 +parseInt(d2.getDate()) 
        }

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
          console.log("yeas")
          if(this.overOnSaleType)
            addendum2 = this.dailyPrice * days - this.dailyPrice * days * this.overOnSaleValue / 100
          else
            addendum2 = this.dailyPrice * days - this.overOnSaleValue
        }
        else{
          addendum2 = this.dailyPrice * days
        }
        console.log(days +'-'+ addendum1 +'-'+ addendum2)
        this.newTotal = parseInt(addendum1)+ parseInt(addendum2)
          
      },

      dateDisabled(date) {         
        const today = new Date();
        if(date < today)
          return true

        for(let i in this.bookings){
          if(this.bookings[i].reservationId != this.reservationId){
          let start =  new Date(this.bookings[i].startDate.year, this.bookings[i].startDate.month -1, this.bookings[i].startDate.day) 
          let end = new Date(this.bookings[i].endDate.year, this.bookings[i].endDate.month -1, this.bookings[i].endDate.day) 

          if(start <= date && date <= end) 
            return true
          }
        }   
        return false  
      }
    }
  }

</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
