<template>
<div class="container-fluid d-flex justify-content-center" id="main">
  <div class="w-50">
    <form name="myform" id="formId" @submit.prevent="createReservation"> 

      <h1 class="mb-4"> Aggiungi prenotazione </h1>

      <div class="form-floating mb-3">
        <input type="email" class="form-control" v-model="email" id="email" aria-label="Recipient's email" aria-describedby="basic-addon1" required>
        <label for="email"> Email cliente*</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="articleId" id="articleId" aria-label="Recipient's email" aria-describedby="basic-addon1" disabled >
        <label for="articleId"> ID articolo*</label>
      </div>
  
      <div class="row mb-3">
        <div class="col-3">
          <label for="date" class="mr-3">Periodo Prenotazione* </label>
        </div>
        <div class="col-9">
          <date-picker :input-attr="{required: 'true'}" id="date" v-model="time" range :lang="lang" :disabled-date="dateDisabled" format="DD-MM-YYYY" required></date-picker>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <p> Ritiro:</p>
        </div>
        <div class="col-9">
          <div class=" form-check">
            <input type="checkbox" v-model="rentalOccurred" @click="changeRentalOccured" class="form-check-input" id="rentalOccurred">
            <label v-if="rentalOccurred" class="form-check-label" for="rentalOccurred">Il prodotto è stato ritirato</label>
            <label v-else class="form-check-label" for="rentalOccurred">Il prodotto non è stato ritirato</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <p> Restituzione:</p>
        </div>
        <div class="col-9">
          <div class=" form-check">
            <input type="checkbox" v-model="returned" @click="changeReturned" class="form-check-input" id="returned">
            <label v-if="returned" class="form-check-label" for="returned">Il prodotto è stato restituito</label>
            <label v-else class="form-check-label" for="returned">Il prodotto non è stato restituito</label>
          </div>
        </div>
      </div>

      <div class="form-floating mb-3">
        <input type="number" v-model="price" min="1" step="1" class="form-control" id="price" aria-label="Recipient's price" aria-describedby="basic-addon4" required>
        <label for="price"> Prezzo*</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text"  v-model="notes" class="form-control" id="notes" aria-label="Recipient's notes" aria-describedby="basic-addon5" >
        <label for="notes"> Descrizione</label>
      </div>

      <div class="form-floating mb-4">
        <input type="text" v-model="privateNotes" class="form-control" id="privateNotes" aria-label="Recipient's privateNotes" aria-describedby="basic-addon6" >
        <label for="privateNotes">  Note (non visibili ai clienti)</label>
      </div>

      <div class="row">
        <div class="col-6">
          <button type="submit" class="btn btn-lg btn-success" id="save">Salva</button>
        </div>

        <div class="col-6">
          <button type="button" id="clear" class="btn btn-lg btn-danger delete" @click="cancel">Annulla</button>
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

        email: '',
        articleId: '',
        price:' ',
        article: {},

        rentalOccurred: false,             //avvenuto noleggio (booleano)
        returned: false,               //avvenuta restituzione (booleano)
        notes:'',                //note 1 (dettagli sul prezzo o altro)                        
        privateNotes:'',               //note 2 (dettagli non visibili al cliente)

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
      this.price = (this.$route.params.price) ? this.$route.params.price : ""
      Functions.getProduct(this.articleId)
      .then((result) => {
        this.article = result.data.data.obj
        console.log(this.article)
      }, (error) => {
          alert("La pagina non esiste")
          this.$router.replace('')
        })
    },

    methods: {
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

      createReservation(){
        let query = {};
        query.clientEmail = this.email;
        query.productId = this.articleId;
        query.price = this.price;
        query.isTaken = this.rentalOccurred;
        query.isReturned = this.returned;
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
            let query = {}
            query.bookings = this.article.bookings
            query.bookings.push(newBookings)
            Functions.saveDataProduct(this.articleId, query)
            .then( ()  =>{
              this.cancel();
              alert("Creazione riuscita")       
            })   
          })
        }, (error) => {
          alert("La mail non esiste");
        })
      },

      cancel(){
        this.time = null;
        this.email =  '';
        this.rentalOccurred =  false;
        this.returned =  false;
        this.notes = '';
        this.privateNotes = '';
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
    },
  }
</script>