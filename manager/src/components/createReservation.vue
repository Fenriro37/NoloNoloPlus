<template>
<div class="container-fluid d-flex justify-content-center" id="main">
  <div class="w-50">
    <form name="myform" id="formId" @submit.prevent="createReservation"> 

      <h1 class="mb-4" tabindex="0"> Aggiungi prenotazione </h1>

      <div class="form-floating mb-3">
        <input type="email" class="form-control" v-model="email" id="email" aria-label="Email cliente, campo obbligatorio"  required>
        <label for="email"> Email cliente*</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" tabindex="0" class="form-control" v-model="articleId" id="articleId" :aria-label="'Id articolo:'+articleId" readonly >
        <label for="articleId"> ID articolo*</label>
      </div>
  
      <div class="row mb-3">
        <div class="col-3">
          <label for="date" class="mr-3">Periodo Prenotazione* </label>
        </div>
        <div class="col-9">
          <date-picker :input-attr="{required: 'true'}" id="date" aria-label="Selezionare periodo prenotazione, campo obbligatorio" v-model="time" @change="changeData" range :lang="lang" :disabled-date="dateDisabled" format="DD-MM-YYYY" required></date-picker>
        </div>
      </div>

			<div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" v-model="fixedPrice" v-on:keyup="newPrice" aria-label="Prezzo fisso, campo obbligatorio" required>
				<label for="price"> Prezzo Fisso*</label>
			</div>

      <div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo fisso:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" aria-label="Sconto prezzo fisso, seleziona per abilitare" class="form-check-input" :checked="onSale"  @click="changeSale">
						<label tabindex="0" class="form-check-label" for="sale"  v-if="onSale">L'articolo verrà scontato</label>
            <label tabindex="0" class="form-check-label" for="sale"  v-else>Il prodotto non è scontato</label>
					</div>
				</div>
			</div>
      
      <template v-if="onSale">
        <div id="saleInfo" class="mt-2">
          <div class="row">
            <div class="col-3"><p> Tipo di sconto:</p></div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" aria-label="sconto percentuale, seleziona uno dei due" type="radio" :value="true" :checked="onSaleType" @click="changeOnSaleType" id="percentage" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" aria-label="sconto fisso, seleziona uno dei due" type="radio" :value="false" :checked="!onSaleType" @click="changeOnSaleType" id="flat" required>
                <label class="form-check-label" for="flat">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" aria-label="valore sconto, campo obbligatorio" class="form-control" min="1" step="1" v-model="onSaleValue" v-on:keyup="newPrice"  id="saleValue" required>
            </div>
          </div>
        </div>
      </template>


			<div class="form-floating mb-3">
				<input type="number" class="form-control" min="1" step="1" v-model="dailyPrice" v-on:keyup="newPrice" aria-label="Prezzo giornaliero, campo obbligatorio" required>
				<label for="price"> Prezzo Giornaliero*</label>
			</div>

      <div class="row mb-3" id="saleRow">
				<div class="col-3">
					<label><b>Sconto Prezzo giornaliero:</b></label>
				</div>
				<div class="col-9 ">
					<div class=" form-check">
						<input type="checkbox" aria-label="sconto prezzo giornaliero, seleziona per abilitare" class="form-check-input" :checked="overOnSale"  @click="changeDailySale">
						<label tabindex="0" class="form-check-label" for="sale"  v-if="overOnSale">L'articolo verrà scontato</label>
            <label tabindex="0" class="form-check-label" for="sale"  v-else>Il prodotto non è scontato</label>
					</div>
				</div>
			</div>

      <template v-if="overOnSale">
        <div id="saleInfoOver" class="mt-2">
          <div class="row">
            <div class="col-3"><p> Tipo di sconto:</p></div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" aria-label="sconto giornaliero percentuale, seleziona uno dei due" type="radio" :value="true" :checked="overOnSaleType"  @click="changeType" id="percentageOver" required>
                <label class="form-check-label" for="percentage">Percentuale</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input class="form-check-input" aria-label="sconto giornaliero fisso, seleziona uno dei due" type="radio"  :value="false" :checked="!overOnSaleType" @click="changeType"  id="flatOver" required>
                <label class="form-check-label" for="flat">Fisso</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3"> <p> Valore sconto:</p>	</div>
            <div class="col-9">
            <input type="number" aria-label="valore sconto giornaliero, campo obbligatorio " class="form-control" min="1" step="1" v-model="overOnSaleValue" v-on:keyup="newPrice" id="saleValueOVer" required>
            </div>
          </div>
          <div class="row mt-2 mb-2">
            <div class="col-3">Giorni da superare per sconto:</div>
            <div class="col-9">
              <input type="number" aria-label="giorni da superare per ottenere sconto, campo obbligatorio" class="form-control" min="1" step="1" v-model="overDaysCount" v-on:keyup="newPrice"  id="daysDiscount"  required>
          </div>
        </div>
      </template>

      <div class="form-floating mb-3">
				<input type="number" class="form-control" :value="newTotal" :aria-label="'Prezzo totale prenotazione'+ newTotal+'€. Se negativo o uguale a zero non si potrà creare la prenotazione'" readonly>
				<label for="price"> Prezzo Totale</label>
			</div>

      <div class="form-floating mb-3">
        <input type="text"  v-model="notes" class="form-control" id="notes" aria-label="Descrizione prenotazione" >
        <label for="notes"> Descrizione</label>
      </div>

      <div class="form-floating mb-4">
        <input type="text" v-model="privateNotes" class="form-control" id="privateNotes" aria-label="Note non visibili ai clienti" >
        <label for="privateNotes">  Note (non visibili ai clienti)</label>
      </div>

      <div class="row">
        <div class="col-6">
          <button type="submit" aria-label="bottone crea prenotazione, dopo la creazione rimane su questa pagina pulendo i campi tranne i prezzi"  class="btn btn-lg btn-success" id="save" :disabled="enter || negativePrice">Salva</button>
        </div>

        <div class="col-6">
          <button type="button" aria-label="bottone annulla, pulisce i campi tranne i prezzi"  id="clear" class="btn btn-lg btn-danger delete" :disabled="enter" @click="cancel">Annulla</button>
        </div>
      </div> 

    </form>  
  </div>
</div>

</template>

<script>
  import Functions from '../functions/function'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  export default {
    name: "create-article", 
    components: { DatePicker },
    data() {
      return {
        enter: false,
        article: {},

        email: '',
        articleId: '',

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

        notes:'',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'',               //note 2 (dettagli non visibili al cliente)
        negativePrice: false,
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
      }
    },

    created(){
      this.articleId = this.$route.params.id
      Functions.getProduct(this.articleId)
      .then((result) => {
        this.article = result.data.data.obj
        console.log(this.article)
        this.dailyPrice = this.article.price
        this.fixedPrice = this.article.fixedPrice
        this.onSale = this.article.discount.onSale
        this.onSaleType = this.article.discount.onSaleType
        this.onSaleValue = this.article.discount.onSaleValue
        this.overDaysCount = this.article.overDays.days
        this.overOnSale = this.article.overDays.onSale
        this.overOnSaleType = this.article.overDays.onSaleType
        this.overOnSaleValue = this.article.overDays.onSaleValue

      }, (error) => {
          alert('La pagina non esiste');
           this.$router.push({ name: 'home'})
        }
      )
    },

    methods: {
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


      createReservation(){
        this.enter = true
        let query = {};
        query.clientEmail = this.email;
        query.productId = this.articleId;

        query.isTaken = false;
        query.isReturned = false;
        query.description = this.notes;
        query.note = this.privateNotes;
      
        let day = this.time[0].getDate()
        let month = this.time[0].getMonth()+1
        let year = this.time[0].getFullYear()
        let day1 = this.time[1].getDate()
        let month1 = this.time[1].getMonth()+1
        let year1 = this.time[1].getFullYear()
        const today = new Date();
        query.bookingDate = {}
        query.bookingDate.day = today.getDate()
        query.bookingDate.month = today.getMonth()+1
        query.bookingDate.year = today.getFullYear()
        query.startDate = {}
        query.startDate.day = day
        query.startDate.month = month
        query.startDate.year = year
        query.endDate = {}
        query.endDate.day = day1
        query.endDate.month = month1
        query.endDate.year = year1
        query.productTitle = this.article.title
        query.productBrand =  this.article.brand
        query.productImage = this.article.image

        ///////prezzzi
        query.variablePrice = this.dailyPrice
        query.fixedPrice = this.fixedPrice
        query.totalPrice = this.newTotal

        query.fixedDiscount = {}
        if(this.onSale){
          query.fixedDiscount.onSale = true
          query.fixedDiscount.onSaleType = this.onSaleType
          query.fixedDiscount.onSaleValue = this.onSaleValue
        }
        else{
          query.fixedDiscount.onSale = false
          query.fixedDiscount.onSaleType = false
          query.fixedDiscount.onSaleValue = ''
        }

        query.variableDiscount = {}
        if(this.overOnSale){
          query.variableDiscount.onSale = true
          query.variableDiscount.onSaleType = this.overOnSaleType
          query.variableDiscount.days = this.overDaysCount
          query.variableDiscount.onSaleValue = this.overOnSaleValue
        }
        else{
          query.variableDiscount.days = ''
          query.variableDiscount.onSale = false
          query.variableDiscount.onSaleType = false
          query.variableDiscount.onSaleValue = ''
        }

        Functions.getUser(this.email, 1)
        .then( (result) => {
          console.log('GETUSER')
          console.log(result)
          query.clientName = result.data.data.userName
          query.clientSurname = result.data.data.userSurname
          console.log(query)
          Functions.addReservation(query)
          .then( (result) => {
            console.log(result)
            let newBookings = {};
            newBookings.id = this.articleId
            newBookings.clientId = this.email
            newBookings.reservationId =  result.data.data._id
            newBookings.startDate = {}
            newBookings.startDate.day = day
            newBookings.startDate.month = month
            newBookings.startDate.year = year
            newBookings.endDate = {}
            newBookings.endDate.day = day1
            newBookings.endDate.month = month1
            newBookings.endDate.year = year1
            newBookings.total = this.newTotal
            let query = {}
            query.bookings = this.article.bookings
            query.bookings.push(newBookings)
            Functions.saveDataProduct(this.articleId, query)
            .then( ()  =>{
              this.cancel();
              this.enter = false
              alert("Creazione riuscita")       
            })   
          }) 
        }, (error) => {
          alert("La mail non esiste");
          this.enter = false
        })
      },

      cancel(){
        this.time = null;
        this.email =  '';
        this.notes = '';
        this.privateNotes = '';

        this.dailyPrice = this.article.price
        this.fixedPrice = this.article.fixedPrice
        this.onSale = this.article.discount.onSale
        this.onSaleType = this.article.discount.onSaleType
        this.onSaleValue = this.article.discount.onSaleValue
        this.overDaysCount = this.article.overDays.days
        this.overOnSale = this.article.overDays.onSale
        this.overOnSaleType = this.article.overDays.onSaleType
        this.overOnSaleValue = this.article.overDays.onSaleValue
        this.newPrice()
      },

      newPrice(){
        if(this.time != null){
          let date1 = new Date(this.time[0].getFullYear(), this.time[0].getMonth(), this.time[0].getDate());
          let date2 = new Date(this.time[1].getFullYear(), this.time[1].getMonth(), this.time[1].getDate());
          let diffTime = date2 - date1;
          let days  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
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
              addendum2 = this.dailyPrice * days - this.dailyPrice * days * this.overOnSaleValue / 100
            else
              addendum2 = this.dailyPrice * days - this.overOnSaleValue
          }
          else{
            addendum2 = this.dailyPrice * days
          }
          console.log(days +'-'+ addendum1 +'-'+ addendum2)
          this.newTotal = parseFloat(addendum1)+ parseFloat(addendum2)
          if(this.newTotal <= 0){
            this.negativePrice = true
          }
          else  
            this.negativePrice = false
          }
      },

      changeData(){
        if(this.time != null){
          let start = new Date( this.time[0].getFullYear(), this.time[0].getMonth(), this.time[0].getDate())
          let end = new Date( this.time[1].getFullYear(), this.time[1].getMonth(), this.time[1].getDate())
          for(let i in this.article.bookings){
            if( this.article.bookings[i].reservationId != this.reservationId){
              let reservationEnd = new Date(this.article.bookings[i].endDate.year, this.article.bookings[i].endDate.month-1, this.article.bookings[i].endDate.day)
              let reservationStart = new Date(this.article.bookings[i].startDate.year, this.article.bookings[i].startDate.month-1, this.article.bookings[i].startDate.day)
              if(start <= reservationStart  && reservationEnd <= end)
                this.time = null
            }        
          }
          
          this.newPrice()
        } 
      },

      dateDisabled(date) {         
        const today = new Date();
        if(date < today)
          return true

        for(let i in this.article.bookings){
          let start =  new Date(this.article.bookings[i].startDate.year, this.article.bookings[i].startDate.month -1, this.article.bookings[i].startDate.day) 
          let end = new Date(this.article.bookings[i].endDate.year, this.article.bookings[i].endDate.month -1, this.article.bookings[i].endDate.day) 

          if(start <= date && date <= end) 
            return true
        }   
        return false  
      }
    }
  }


  
</script>