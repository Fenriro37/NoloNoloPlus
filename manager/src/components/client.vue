<template>

<div class="container-fluid d-flex justify-content-center" id="main">
  <div class="w-50">
    <form name="myform" id="formId" @submit.prevent="saveData">
      <h1 class="mb-3" tabindex="0"> Account </h1>

      <div class="form-floating mb-3">
        <input type="text" id="name" v-model="name" class="form-control" :aria-label=" (boolModify) ? 'Nome' : 'Campo obbligatorio'" :readonly="!boolModify" required>
        <label for="name"> Nome </label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="surname"  v-model="surname" class="form-control" aria-label="cognome: Campo obbligatorio" :readonly="!boolModify" required>
        <label for="surname"> Cognome</label>
      </div>  

      <div class="form-floating mb-3">
        <input type="text" id="identifier"  :value="id" class="form-control" aria-label="id Campo non modificabile" readonly required>
        <label for="identifier"> ID<span v-if="boolModify">(non modificabile)</span></label>
      </div>

      <div class="form-floating mb-3">
        <select id="sex" tabindex="0" class="form-select zIndex mb-5" :disabled="!boolModify"  v-model="sex"  aria-label="sesso: Campo obbligatorio" >
          <option value="male">M</option>
          <option value="female">F</option>
          <option value="other">Altro</option>
        </select>
        <label for="sex"> Sesso </label>
      </div>
        
      <div class="form-floating mb-3">
        <input type="tel" id="phone"  v-model="phoneNumber" class="form-control" aria-label="numero telefono: Campo obbligatorio" :readonly="!boolModify" required>
        <label for="phone"> Numero di telefono</label>
      </div>
        
      <div class="form-floating mb-3">
        <input type="email" id="mail"  v-model="email" class="form-control" aria-label="email: Campo non modificabile" readonly required>
        <label for="mail"> E-mail <span v-if="boolModify">(non modificabile)</label>
      </div>

      <hr>

      <div class="form-floating mb-3">
        <b-form-datepicker id="birthday" v-model="birthday"  class="form-control" type="date" aria-label="Data di nascita: Campo obbligatorio" :readonly="!boolModify" required></b-form-datepicker>
        <label for="birthday" tabindex="0"> Data di nascita</label>
      </div>

      <hr>

      <div class="row mb-3">
        <h3>Indirizzo</h3>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="street"  v-model="address.addressStreet" class="form-control" aria-label="street" aria-describedby="basic-addon8" :readonly="!boolModify" required>
        <label for="street"> Via</label>
      </div>

      <div class="form-floating mb-3">
        <input type="number"  id="num"  v-model="address.addressNumber" class="form-control" aria-label="city" aria-describedby="basic-addon10" step="1" min="1"  :readonly="!boolModify" required>
        <label for="num"> Numero</label>
      </div> 

      <div class="form-floating mb-3">
        <input type="text" id="city"  v-model="address.addressCity" class="form-control" aria-label="city" aria-describedby="basic-addon10" :readonly="!boolModify" required>
        <label for="city"> Città</label>
      </div>

      <hr>

      <div class="row mb-3">
        <h3>Metodo di pagamento</h3>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="cardType"  v-model="payment.cardType" class="form-control" aria-label="cardType" aria-describedby="basic-addon11" :readonly="!boolModify" required>
        <label for="cardType"> Tipo di carta</label>
      </div>

      <div class="form-floating mb-3">
        <input type="number" id="cardName" v-model="payment.cardName"  class="form-control" aria-label="cardName" aria-describedby="basic-addon12" :readonly="!boolModify" required>
        <label for="cardName"> Numero carta</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="owner"  v-model="payment.cardSurname" class="form-control" aria-label="owner" aria-describedby="basic-addon13" :readonly="!boolModify" required>
        <label for="owner"> Proprietario</label>
      </div>

      <div class="row mb-3">
          <b>Data scadenza</b>
      </div>

      <div class="form-floating mb-3">
        <input type="number"  v-model="payment.cardExpireMonth"  min="1" max="12" step="1" id="cardMonth" class="form-control" aria-label="cardMonth" aria-describedby="basic-addon14" :readonly="!boolModify" required>
        <label for="cardMonth"> Mese</label>
      </div>

      <div class="form-floating mb-3">
        <input type="number"  v-model="payment.cardExpireYear" min="2021" max="2030" step="1" id="cardYear" class="form-control" aria-label="cardYear" aria-describedby="basic-addon15" :readonly="!boolModify" required>
        <label for="cardYear"> Anno</label>
      </div>

      <div id="myButtons" class="row">
        <!-- Bottoni -->
        <div class="col">
          <b-button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary mb-2 mt-2" :disabled="enter" @click="modify">Modifica</b-button>
          <b-button v-if="boolModify" type="submit" class="btn btn-lg btn-success m-2" :disabled="enter">Salva</b-button>
          <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger mb-2 mt-2" :disabled="enter" @click="undoChange">Annulla</b-button>
        </div>
        <div class="col">
          <b-button type="button" class="btn btn-lg btn-danger mb-2 mt-2" :disabled="bookings.length===0 || enter" @click="chart">Analytics</b-button>
        </div>
        <div class="col">
          <b-button type="button" class="btn btn-lg btn-danger mb-2 mt-2" :disabled="boolDelete || enter" @click="deleteUser">Elimina cliente</b-button>
        </div>
      </div>

    </form>

    <!-- Da qui parte la tabella delle prenotazioni -->
    <template v-if="bookings.length !== 0">
    <hr>
    <h3>Lista prenotazioni</h3>
    <div class="p-3">
      <b-row>
        <b-table hover :items="bookings" :fields="fields">
          <!-- item è la riga -->
          <template v-slot:cell(product)="{ item }">
            <router-link :to="{ name: 'article',  params: { id: item.id}}">{{ item.title }}</router-link>
          </template>
          <template v-slot:cell(price)="{ item }">
            <span>{{ item.price + '€'}}</span>
          </template>
          <template v-slot:cell(reservation)="{ item }">
            <router-link :to="{ name: 'reservation',  params: { id: item.reservation}}">{{ item.reservation }}</router-link>
          </template>
        </b-table>
      </b-row>
    </div>
    </template>

  </div>
</div>
</template>

<script>
  import $ from 'jquery'
  import Functions from '../functions/function'
  export default {
    data() {
      return {
        enter: false,
        user: {},
        id: '',
        name: '',
        surname: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: {
          addressStreet: '',
          addressNumber: '',
          addressCity: ''
        },
        payment: {
          cardType: '',
          cardName: '',
          cardSurname: '',
          cardExpireMonth: '',
          cardExpireYear: '',
          cardCVV: ''
        },      
        bookings: [],
        fields: [
         {
            key: 'product',
            sortable: false
          },
          {
            key: 'reservation',
            sortable: false
          },
          {
            key: 'price',
            sortable: true
          },
          {
            key: 'startDate',
            sortable: true
          },
          {
            key: 'endDate',
            sortable: true
          },
        ],
        //Modalità Modifica
        boolModify: false,
        boolDelete: false
      }
    },

    created() {
      //console.log(this.$route.params)
      //comporre il getUser con id o email '?id/email=' + value
      //{'filter': 'han.chu@studio.unibo.it', 'sort': 'true'}
      let query
      query = this.$route.params.email 
      Functions.getUser(query).then((result) => {
        //console.log(result)
        this.user = result.data.data
        this.undoChange()
      }, (error) => {
          alert('La pagina non esiste');
          this.$router.push({ name: 'clientCatalog' , params: { filter: ''}})
        }
      )

      let query1 = {
        filter: this.$route.params.email,
        sort: false
      }
      Functions.getAllReservation(query1)
      .then( (result) => {
        console.log(result.data.obj)
        let current = new Date();      
        for (let i in result.data.obj){
          let row = {}
          row.title = result.data.obj[i].productTitle
          row.id =  result.data.obj[i].productId 

          row.price = result.data.obj[i].totalPrice 
          row.reservation = result.data.obj[i]._id
          row.startDate =  result.data.obj[i].startDate.day +'-'+ result.data.obj[i].startDate.month +'-'+ result.data.obj[i].startDate.year
          row.endDate = result.data.obj[i].endDate.day +'-'+ result.data.obj[i].endDate.month +'-'+ result.data.obj[i].endDate.year
          let endDate = new Date(result.data.obj[i].endDate.year, result.data.obj[i].endDate.month-1, result.data.obj[i].endDate.day)
          
          if(endDate >= current){
            this.boolDelete = true
            //row._rowVariant = 'danger'
          } 
          console.log(row)
          this.bookings.push(row)
        } 
      })            
    },
    

  
    methods: {

      modify(){
        this.boolModify = true
      },

      undoChange(){
        this.id = this.user._id
        this.name = this.user.userName
        this.surname = this.user.userSurname
        this.birthday = this.user.birthday.year + '-' +this.user.birthday.month + '-' +this.user.birthday.day
        this.sex = this.user.sex
        this.phoneNumber = this.user.phoneNumber
        this.email = this.user.email
        this.address.addressStreet = this.user.address.addressStreet
        this.address.addressNumber = this.user.address.addressNumber
        this.address.addressCity = this.user.address.addressCity
        this.payment.cardType = this.user.payment.cardType
        this.payment.cardName = this.user.payment.cardName
        this.payment.cardSurname = this.user.payment.cardSurname
        this.payment.cardExpireMonth = this.user.payment.cardExpireMonth
        this.payment.cardExpireYear = this.user.payment.cardExpireYear
        this.payment.cardCVV = this.user.payment.cardCVV

        this.boolModify = false;
      },

      saveData(){
        this.enter = true
        let query = {}
        if(this.user.userName != this.name)
          query.userName = this.name;

        if(this.user.userSurname != this.surname)
          query.userSurname = this.surname;
          
        if(this.user.sex != this.sex)
          query.sex = this.sex; 
        
        let date = this.birthday.split('-')
        if(date[0] != this.user.birthday.year ||  date[1] != this.user.birthday.month || date[2] != this.user.birthday.day){
          query.birthday = {}
          query.birthday.day = date[2]
          query.birthday.month = date[1]
          query.birthday.year = date[0]
        }
          
        if(this.user.phoneNumber != this.phoneNumber)
          query.phoneNumber = this.phoneNumber;
          
        if(this.user.email != this.email)
          query.email = this.email;
          
        if(this.user.address.addressStreet != this.address.addressStreet || this.user.address.addressNumber != this.address.addressNumber || this.user.address.addressCity != this.address.addressCity){
          query.address = {}
          query.address.addressStreet =  this.address.addressStreet;
          query.address.addressNumber = this.address.addressNumber
          query.address.addressCity =  this.address.addressCity;
        }

        if(this.user.payment.cardType != this.payment.cardType || this.user.payment.cardName != this.payment.cardName || this.user.payment.cardSurname != this.payment.cardSurname || this.user.payment.cardExpireMonth != this.payment.cardExpireMonth || this.user.payment.cardExpireYear != this.payment.cardExpireYear){
          query.payment = {}
          query.payment.cardType = this.payment.cardType
          query.payment.cardName = this.payment.cardName
          query.payment.cardSurname = this.payment.cardSurname     
          query.payment.cardExpireMonth = this.payment.cardExpireMonth
          query.payment.cardExpireYear = this.payment.cardExpireYear;
        }
        console.log(query)
        Functions.saveDataClient(this.id, query)
        .then( () => {
            alert("modifica riuscita")
            this.user.userName = this.name 
            this.user.userSurname = this.surname 
            this.user.sex = this.sex 
            this.user.phoneNumber = this.phoneNumber 
            this.user.email = this.email 
            
            this.user.birthday = date[0] + '-' + date[1] + '-' + date[2] 

            this.user.address.addressStreet = this.address.addressStreet 
            this.user.address.addressNumber = this.address.addressNumber 
            this.user.address.addressCity = this.address.addressCity 
            this.user.payment.cardType = this.payment.cardType 
            this.user.payment.cardName = this.payment.cardName 
            this.user.payment.cardSurname = this.payment.cardSurname 
            this.user.payment.cardExpireMonth = this.payment.cardExpireMonth 
            this.user.payment.cardExpireYear = this.payment.cardExpireYear 

            this.boolModify = false
            this.enter = false
        }) 
      },

      deleteUser(){        
        this.enter = true
        Functions.deleteUser(this.id).then( () =>{
          this.$router.push({ name: 'clientCatalog' , params: { filter: ''}})
        })                   
      },
      chart(){
        this.$router.push({ name: 'clientChart', params: { email: this.email} })
      }
    }
  }
//////////////////////////////////////FINE VUE - INIZIO JS///////////////////////////////////////
  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
</script>
<style scoped>
.zIndex{
  z-index: absolute;
}
</style>