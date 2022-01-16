<template>

  <b-col  class="container-fluid " >
    <h1> Account </h1>

    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Nome:</p>
      </b-col>
      <b-col cols="9">
        <!-- ModifyOn/Off -->
        <b-form-input v-if="!boolModify" type="text" :value="name"  readonly ></b-form-input>
        <b-form-input v-else type="text" v-model="copyName"  ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Cognome:</p>
      </b-col>
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="surname" readonly ></b-form-input>
        <b-form-input v-else type="text" v-model="copySurname"  ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <p>ID:<span v-if="boolModify">(non modificabile)</span></p>
      </b-col>
      <b-col  class="col-9 ">
        <b-form-input type="text" :value="id" readonly ></b-form-input>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Sesso:</p>
      </b-col >
      <b-col cols="9">
        <b-form-select v-if="!boolModify" :disabled="!boolModify" :value="sex" :options="options">

        </b-form-select>

        <b-form-select v-else v-model="copySex" :options="options"> 

        </b-form-select>
      </b-col >
    </b-row>
      
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Numbero di Telefono:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="phoneNumber" readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyPhoneNumber" ></b-form-input>
      </b-col >
    </b-row>
      
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>E-mail:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="email" readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyEmail"  ></b-form-input>
      </b-col >
    </b-row>

    <hr>

    <b-row>
      <b-col cols="3">
        <b>Data di nascita</b>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="birthday"  readonly></b-form-input>
        <b-form-datepicker v-else v-model="copyDate" :placeholder="birthday"  ></b-form-datepicker>
      </b-col>
    </b-row>

    <hr>

    <b-row>
      <b-col cols="3">
        <b>Indirizzo</b>
      </b-col >
    </b-row>

    <b-row>
      <b-col cols="3">
        <span v-if="boolModify">* </span>Via:
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="address.addressStreet"  readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyAddressStreet"  ></b-form-input>
      </b-col >
    </b-row>

    <b-row>
      <b-col cols="3">
        <span v-if="boolModify">* </span>Numero:
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="number" :value="address.addressNumber" readonly></b-form-input>
        <b-form-input v-else type="number" v-model="copyAddressNumber" min='1'  ></b-form-input>
      </b-col >
    </b-row> 

    <b-row>
      <b-col cols="3">
        <span v-if="boolModify">* </span>Città:
      </b-col >
      <b-col cols="9">
        <b-form-input  v-if="!boolModify" type="text" :value="address.addressCity"  readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyAddressCity"  ></b-form-input>
      </b-col >
    </b-row>

    <hr>

    <b-row>
      <b>Pagamenti</b>
    </b-row>
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Tipo di carta:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="payment.cardType"  readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyCardType"  ></b-form-input>        
      </b-col >
    </b-row>
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Nome carta:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="payment.cardName"  readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyCardName"></b-form-input>
      </b-col >
    </b-row>
    <b-row>
      <b-col cols="3">
        <p><span v-if="boolModify">* </span>Proprietario:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="text" :value="payment.cardSurname"  readonly></b-form-input>
        <b-form-input v-else type="text" v-model="copyCardSurname"></b-form-input>
      </b-col >
    </b-row>

    <b-row>
      <b-col cols="3">
        <p>Data scadenza:</p>
      </b-col >
    </b-row>

    <b-row >
      <b-col  class="col-3 tab">
        <p><span v-if="boolModify">* </span>Mese:</p>
      </b-col >
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="number" :value="payment.cardExpireMonth"   readonly> </b-form-input>
        <b-form-input v-else type="number" v-model="copyCardExpireMonth"  min="1" max="12" ></b-form-input>
      </b-col >
    </b-row>

    <b-row>
      <b-col  class="col-3 tab">
        <p><span v-if="boolModify">* </span>Anno:</p>
      </b-col >        
      <b-col cols="9">
        <b-form-input v-if="!boolModify" type="number" :value="payment.cardExpireYear" readonly></b-form-input>
        <b-form-input v-else type="number" v-model="copyCardExpireYear"  min="2021" max="2025" ></b-form-input>
      </b-col >
    </b-row>

    <hr>
    <!-- Da qui parte la tabella delle prenotazioni -->
    <h3>Lista prenotazioni</h3>
    <div class="p-3">
      <b-row>
        <b-table hover :items="bookings" :fields="fields">
          <!-- item è la riga -->
          <template v-slot:cell(product)="{ item }">
            <router-link :to="{ name: 'article',  params: { id: item.product.id}}">{{ item.product.title }}</router-link>
          </template>
          <template v-slot:cell(reservation)="{ item }">
            <router-link :to="{ name: 'reservation',  params: { id: item.reservation}}">{{ item.reservation }}</router-link>
          </template>
        </b-table>
      </b-row>
    </div>
    
    <!-- Bottoni -->
    <b-button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary" @click="modify">Modifica</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-success" @click="saveData" >Salva</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger" @click="undoChange">Annulla</b-button>


    <b-button type="button" class="btn btn-lg btn-danger delete" @click="deleteUser">Elimina cliente</b-button>
  </b-col >
</template>

<script>
  import $ from 'jquery'
  import Functions from '../functions/function'
  export default {
    data() {
      return {
        id: '',
        name: '',
        surname: '',
        sex: '',
        options: [
          { value: 'Male', text:'M'},
          { value: 'Female', text:'F'},
          { value: 'Other',text:'Altro'},
        ],
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

        //Copia dei dati
        copyName :'',
        copySurname :'',
        copySex :'',
        copyDate :'',
        copyPhoneNumber :'',
        copyEmail :'',
        copyPassword :'',
        copyAddressStreet :'',
        copyAddressNumber :'',
        copyAddressCity :'',
        copyCardType :'',
        copyCardName :'',
        copyCardSurname :'',
        copyCardExpireMonth :'', 
        copyCardExpireYear :'',
        copyCardCVV :'',

      }
    },

      created() {
        console.log(this.$route.params)
        //comporre il getUser con id o email '?id/email=' + value
        //{'filter': 'han.chu@studio.unibo.it', 'sort': 'true'}
        let query,n
        if ( this.$route.params.id !== undefined){
          query = this.$route.params.id 
          n = 0
        }
        else {
          query = this.$route.params.email 
          n = 1
        } 
        Functions.getUser(query, n).then((result) => {
          console.log(result)
          this.id = result.data.data._id
          this.name = result.data.data.userName
          this.surname = result.data.data.userSurname
          this.birthday = result.data.data.birthday.year + '-' + result.data.data.birthday.month + '-' + result.data.data.birthday.day
          this.sex = result.data.data.sex
          this.phoneNumber = result.data.data.phoneNumber
          this.email = result.data.data.email
          this.address.addressStreet = result.data.data.address.addressStreet
          this.address.addressNumber = result.data.data.address.addressNumber
          this.address.addressCity = result.data.data.address.addressCity
          this.payment.cardType = result.data.data.payment.cardType
          this.payment.cardName = result.data.data.payment.cardName
          this.payment.cardSurname = result.data.data.payment.cardSurname
          this.payment.cardExpireMonth = result.data.data.payment.cardExpireMonth
          this.payment.cardExpireYear = result.data.data.payment.cardExpireYear
          this.payment.cardCVV = result.data.data.payment.cardCVV

          let query = {
            filter: this.email,
            sort: false
          }
          Functions.getAllReservation(query)
          .then( (result) => {
            console.log(result.data.obj)
            if(result.data.obj.length === 0) console.log("vuoto")
            else {
              let current = new Date();      
              current = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate() 
              for (let i in result.data.obj){
                let row = {}
                row.productId =
                row.product = {}
                row.product.id =  result.data.obj[i].productId 
                row.product.title = result.data.obj[i].productTitle + ' ' + result.data.obj[i].productBrand
                row.price = result.data.obj[i].price
                row.reservation = result.data.obj[i]._id
                row.startDate = result.data.obj[i].startDate.year + '-' + result.data.obj[i].startDate.month + '-' + result.data.obj[i].startDate.day
                row.endDate = result.data.obj[i].endDate.year + '-' + result.data.obj[i].endDate.month + '-' + result.data.obj[i].endDate.day
                
                if(row.endDate >= current)
                  row._rowVariant = 'danger'
                this.bookings.push(row)
              }
            }
          })            
        })
      },


    methods: {

      modify(){
        this.copyName = this.name,
        this.copySurname = this.surname,
        this.copySex = this.sex,
        this.copyDate = this.birthday,
        this.copyPhoneNumber = this.phoneNumber,
        this.copyEmail = this.email,
        this.copyAddressStreet = this.address.addressStreet,
        this.copyAddressNumber = this.address.addressNumber,
        this.copyAddressCity = this.address.addressCity,
        this.copyCardType = this.payment.cardType,
        this.copyCardName = this.payment.cardName,
        this.copyCardSurname = this.payment.cardSurname,
        this.copyCardExpireMonth = this.payment.cardExpireMonth ,
        this.copyCardExpireYear =  this.payment.cardExpireYear,
        this.copyCardCVV =  this.payment.cardCVV
        this.boolModify = true
      },

      undoChange(){
        this.boolModify = false;
      },

      saveData(){
        let query = {}
        if(this.copyName != this.name)
          query.userName = this.copyName;
          
        if(this.copySurname != this.surname)
          query.userSurname = this.copySurname;
          
        if(this.copySex != this.sex)
          query.sex = this.copySex; 
        
        if(this.copyDate != this.date){
          query.date = {}
          query.date.day = this.copyDate.charAt(8) + this.copyDate.charAt(9)
          query.date.month = this.copyDate.charAt(5) + this.copyDate.charAt(6)
          query.date.year = this.copyDate.charAt(0) + this.copyDate.charAt(1) + this.copyDate.charAt(2) + this.copyDate.charAt(3)
        }
          
          
        if(this.copyPhoneNumber != this.phoneNumber)
          query.phoneNumber = this.copyPhoneNumber;
          
        if(this.copyEmail != this.email)
          query.email = this.copyEmail;
          
        if(this.copyAddressStreet != this.address.addressStreet || this.copyAddressNumber != this.address.addressNumber || this.copyAddressCity != this.address.addressCity){
          query.address = {}
          query.address.addressStreet = this.copyAddressStreet;
          query.address.addressNumber = this.copyAddressNumber;
          query.address.addressCity = this.copyAddressCity;
        }

        if(this.copyCardType != this.payment.cardType || this.copyCardName != this.payment.cardName || this.copyCardSurname != this.payment.cardSurname || this.copyCardExpireMonth != this.payment.cardExpireMonth || this.copyCardExpireYear != this.payment.cardExpireYear){
          query.payment = {}
          query.payment.cardType = this.copyCardType;
          query.payment.cardName = this.copyCardName;
          query.payment.cardSurname = this.copyCardSurname;       
          query.payment.cardExpireMonth = this.copyCardExpireMonth;
          query.payment.cardExpireYear = this.copyCardExpireYear;
        }
        
        console.log(query) 
        console.log(this.id);
        Functions.saveDataClient(this.id, query)
        .then( () => {
            this.name = this.copyName
            this.surname = this.copySurname
            this.sex = this.copySex
            this.phoneNumber = this.copyPhoneNumber
            this.email = this.copyEmail
            this.birthday = this.copyDate

            this.address.addressStreet = this.copyAddressStreet
            this.address.addressNumber = this.copyAddressNumber
            this.address.addressCity = this.copyAddressCity
            this.payment.cardType = this.copyCardType
            this.payment.cardName = this.copyCardName
            this.payment.cardSurname = this.copyCardSurname
            this.payment.cardExpireMonth = this.copyCardExpireMonth
            this.payment.cardExpireYear = this.copyCardExpireYear

            this.boolModify = false;        
        })
      },

      deleteUser(){
        if(this.bookings.length === 0){
          Functions.deleteUser(this.id)
          .then( () =>{
            this.$router.push({name: 'clientCatalog'  , params: {filter: ""}})
          })
        }         
        else{
          for(let i in this.bookings){
            let bookingDate = this.bookings[i].endDate.year + '-' + this.bookings[i].endDate.month + '-' +  this.bookings[i].endDate.day
            let current = new Date();      
            current = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate() 
            if(bookingDate >= current )   return(alert('Il prodotto ha ancora prenotazioni attive'))
          }
          Functions.deleteUser(this.id)
          .then( () =>{
             this.$router.push({name: 'clientCatalog'  , params: {filter: ""}})
          })                   
        } 
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