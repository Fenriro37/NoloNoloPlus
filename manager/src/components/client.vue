<template>

<div class="container-fluid d-flex justify-content-center" id="main">
  <div class="w-100">
    <form name="myform" id="formId" @submit.prevent="saveData">
      <h1 class="mb-3" tabindex="0"> Account </h1>

      <div class="form-floating mb-3">
        <input type="text" id="name" v-model="name" class="form-control" :aria-label="'Nome:' + 'Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="name"> Nome </label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="surname"  v-model="surname" class="form-control" :aria-label="'cognome:' + 'Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="surname"> Cognome</label>
      </div>  

      <div class="form-floating mb-3">
        <input type="text" id="identifier"  :value="id" class="form-control" :aria-label="'identificativo'+ 'Campo non modificabile'" :disabled="!boolModify" :readonly="boolModify" required>
        <label for="identifier"> ID<span v-if="boolModify">(non modificabile)</span></label>
      </div>

      <div class="form-floating mb-3">
        <select id="sex" class="form-select zIndex mb-5" :disabled="!boolModify"  v-model="sex"  :aria-label="'sesso:'+ 'Campo obbligatorio'" >
          <option value="male">M</option>
          <option value="female">F</option>
          <option value="other">Altro</option>
        </select>
        <label for="sex"> Sesso </label>
      </div>
        
      <div class="form-floating mb-3">
        <input type="tel" id="phone"  v-model="phoneNumber" class="form-control" :aria-label="'numero telefono:'+ 'Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="phone"> Numero di telefono</label>
      </div>
        
      <div class="form-floating mb-3">
        <input type="email" id="mail"  v-model="email" class="form-control" :aria-label="'email:'+  'Campo non modificabile'" :disabled="!boolModify" :readonly="boolModify" required>
        <label for="mail"> E-mail <span v-if="boolModify">(non modificabile)</label>
      </div>

      <hr>

      <div class="form-floating mb-3">
        <input id="birthday" v-model="birthday"  class="form-control" type="date" min="1900-01-01" max="2003-01-01" aria-label="Data di nascita: Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="birthday" > Data di nascita</label>
      </div>

      <hr>

      <div class="row mb-3">
        <h3 tabindex="0" :aria-label="(boolModify) ? 'Fine informazioni personali. Inizio informazioni sulla abitazione' : 'Informazioni sulla abitazione. Clicca modifica in fondo alla pagina per modificare'">Indirizzo</h3>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="street"  v-model="address.addressStreet" class="form-control" :aria-label="'Via:'+'. Campo obbligatorio'"  :disabled="!boolModify" required>
        <label for="street"> Via</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text"  id="num"  v-model="address.addressNumber" class="form-control" :aria-label="'numero:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="num"> Numero</label>
      </div> 

      <div class="form-floating mb-3">
        <input type="text" id="city"  v-model="address.addressCity" class="form-control" :aria-label="'Città:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="city"> Città</label>
      </div>

      <hr>

      <div class="row mb-3">
        <h3 tabindex="0" :aria-label=" (boolModify) ? 'Fine informazioni indirizzo, inizio informazioni metodo di pagamento' : 'inizio informazioni metodo di pagamento. Clicca modifica  in fondo alla pagina per modificare'">Metodo di pagamento</h3>
      </div>

      <div class="form-floating mb-3">
        <select id="cardType"  class="form-select zIndex mb-5" :disabled="!boolModify"  v-model="payment.cardType"   >
          <option value="prepaid">Prepagata</option>
          <option value="debit">Debito</option>
          <option value="credit">Credito</option>
        </select>
        <label for="cardType"> Tipo di carta </label>
      </div>

      <div class="form-floating mb-3">
        <input type="number" id="cardCode" v-model="payment.cardCode"  class="form-control" :aria-label="'numero carta:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="cardCode"> Numero carta</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="owner"  v-model="payment.cardOwner" class="form-control" :aria-label="'proprietario:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="owner"> Proprietario</label>
      </div>

      <div class="row mb-3">
          <b>Data scadenza</b>
      </div>

      <div class="form-floating mb-3">
        <input type="number"  v-model="payment.cardExpireMonth"  min="1" max="12" step="1" id="cardMonth" class="form-control" :aria-label="'Mese scadenza carta:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="cardMonth"> Mese</label>
      </div>

      <div class="form-floating mb-3">
        <input type="number"  v-model="payment.cardExpireYear" min="2021" max="2030" step="1" id="cardYear" class="form-control" :aria-label="'Anno scadenza carta:'+'. Campo obbligatorio'" :disabled="!boolModify" required>
        <label for="cardYear"> Anno</label>
      </div>

      <div id="myButtons" class="row">
        <!-- Bottoni -->
        <div class="col">
          <b-button v-if="!boolModify" type="button" aria-label="Bottone modifica. Premendo questo bottone scomparirà e appariranno i bottoni salva e annulla" class="btn btn-lg btn-secondary mb-2 mt-2" :disabled="enter" @click="modify">Modifica</b-button>
          <b-button v-if="boolModify" type="submit" aria-label="Bottone salva. Salva le modifiche e rimette i campi disabilitati. Per ulteriori modifiche premi il bottone modifica" class="btn btn-lg btn-success m-2" :disabled="enter">Salva</b-button>
          <b-button v-if="boolModify" type="button" aria-label="Bottone annulla. Ripristina le informazioni iniziali" class="btn btn-lg btn-danger mb-2 mt-2" :disabled="enter" @click="undoChange">Annulla</b-button>
        </div>
        <div class="col">
          <b-button type="button" aria-label="Bottone analytics. Porta alla pagina delle statisctiche di questo cliente" class="btn btn-lg btn-danger mb-2 mt-2" :disabled="bookings.length===0 || enter" @click="chart">Analytics</b-button>
        </div>
        <div class="col">
          <b-button type="button" aria-label="Bottone elimina cliente. Rimanda al elenco dei clienti " class="btn btn-lg btn-danger mb-2 mt-2" :disabled="boolDelete || enter" @click="deleteUser">Elimina cliente</b-button>
        </div>
      </div>

    </form>

    <!-- Da qui parte la tabella delle prenotazioni -->
    <template v-if="bookings.length !== 0">
    <hr>
    <h3 tabindex="0">Tabella prenotazioni</h3>
    <div class="p-3">
      <b-row>
        <b-table hover :items="bookings" :fields="fields">
          <!-- item è la riga -->
          <template v-slot:cell(prodotto)="{ item }">
            <router-link :aria-label="'Articolo: '+ item.title" :to="{ name: 'article',  params: { id: item.id}}">{{ item.title }}</router-link>
          </template>
          <template v-slot:cell(prezzo)="{ item }">
            <span tabindex="0" :aria-label="'totale prenotazione: '+ item.price+'€'">{{ item.price +'€'}}</span>
          </template>
          <template v-slot:cell(prenotazione)="{ item }">
            <router-link :aria-label="'identificativo prenotazione: '+ item.reservation" :to="{ name: 'reservation',  params: { id: item.reservation}}">Prenotazione</router-link>
          </template>
          <template  v-slot:cell(DataInizio)="{ item }">
            <span tabindex="0" :aria-label="'inizio prenotazione' + item.startDate">{{ item.startDate }}</span>
          </template>
          <template v-slot:cell(DataFine)="{ item }">
            <span tabindex="0" :aria-label="'fine prenotazione' + item.endDate">{{ item.endDate }}</span>
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
        enter: true,
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
          cardCode: '',
          cardOwner: '',
          cardExpireMonth: '',
          cardExpireYear: '',
          cardCVV: ''
        },      
        bookings: [],
        fields: [
         {
            key: 'prodotto',
          },
          {
            key: 'prenotazione',
          },
          {
            key: 'prezzo',
          },
          {
            key: 'DataInizio',
          },
          {
            key: 'DataFine',
          },
        ],
        //Modalità Modifica
        boolModify: false,
        boolDelete: false
      }
    },

    created() {
      //console.log(this.$route.params)
      let query
      query = this.$route.params.email 
      Functions.getUser(query).then((result) => {
        //console.log(result)
        this.user = result.data.data
        console.log(this.user)
        this.undoChange()
        this.enter = false
      })
      .catch( (error) => {
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
          let endDate = new Date(result.data.obj[i].endDate.year, result.data.obj[i].endDate.month-1, result.data.obj[i].endDate.day, 23, 59, 59)
          
          if(endDate >= current){
            this.boolDelete = true
            //row._rowVariant = 'danger'
          } 
          console.log(row)
          this.bookings.push(row)
        } 
      })
      .catch( (error) => {
            alert("Problema nel caricamento dei dati");
            this.$router.push({ name: 'home' , params: { filter: ''}})
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

        let month = this.user.birthday.month 
        if (String(month).length < 2 && parseInt(this.user.birthday.month ) < 10)
          month = '0' + String(month)
        let day = this.user.birthday.day
        if (String(day).length < 2 && parseInt(this.user.birthday.day) < 10)
          day = '0' + String(day)
        this.birthday = this.user.birthday.year + '-' + month + '-' + day

        this.sex = this.user.sex
        this.phoneNumber = this.user.phoneNumber
        this.email = this.user.email
        this.address.addressStreet = this.user.address.addressStreet
        this.address.addressNumber = this.user.address.addressNumber
        this.address.addressCity = this.user.address.addressCity
        this.payment.cardType = this.user.payment.cardType
        this.payment.cardCode = this.user.payment.cardCode
        this.payment.cardOwner = this.user.payment.cardOwner
        this.payment.cardExpireMonth = this.user.payment.cardExpireMonth
        this.payment.cardExpireYear = this.user.payment.cardExpireYear

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
          query.birthday.day = parseInt( date[2])
          query.birthday.month = parseInt(date[1])
          query.birthday.year = parseInt(date[0])
        }
          
        if(this.user.phoneNumber != this.phoneNumber)
          query.phoneNumber = parseInt(this.phoneNumber);
          
        if(this.user.email != this.email)
          query.email = this.email;
          
        if(this.user.address.addressStreet != this.address.addressStreet || this.user.address.addressNumber != this.address.addressNumber || this.user.address.addressCity != this.address.addressCity){
          query.address = {}
          query.address.addressStreet =  this.address.addressStreet;
          query.address.addressNumber = String(this.address.addressNumber)
          query.address.addressCity =  this.address.addressCity;
        }

        if(this.user.payment.cardType != this.payment.cardType || this.user.payment.cardCode != this.payment.cardCode || this.user.payment.cardOwner != this.payment.cardOwner || this.user.payment.cardExpireMonth != this.payment.cardExpireMonth || this.user.payment.cardExpireYear != this.payment.cardExpireYear){
          query.payment = {}
          query.payment.cardType = this.payment.cardType
          query.payment.cardCode = parseInt(this.payment.cardCode)
          query.payment.cardOwner = this.payment.cardOwner     
          query.payment.cardExpireMonth = parseInt(this.payment.cardExpireMonth)
          query.payment.cardExpireYear = parseInt(this.payment.cardExpireYear);
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
            this.user.payment.cardCode = this.payment.cardCode 
            this.user.payment.cardOwner = this.payment.cardOwner 
            this.user.payment.cardExpireMonth = this.payment.cardExpireMonth 
            this.user.payment.cardExpireYear = this.payment.cardExpireYear 

            this.boolModify = false
            this.enter = false
        })
        .catch( (error) => {
            alert("Problema nell'invio dei dati");
          })
      },

      deleteUser(){        
        this.enter = true
        Functions.deleteUser(this.id).then( () =>{
          alert("Operazione riuscita");
          this.$router.push({ name: 'clientCatalog' , params: { filter: ''}})
        })
        .catch( (error) => {
          alert("Problema nella cancellazione dei dati")
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