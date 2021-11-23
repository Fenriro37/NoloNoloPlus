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
        <p><span v-if="!boolModify">* </span>Cognome:</p>
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
        <b-form-input type="text" :value="identifier" readonly ></b-form-input>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col cols="3">
        <p><span v-if="!boolModify">* </span>Sesso:</p>
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
        <b-form-input v-if="!boolModify" :value="birthday"  readonly></b-form-input>
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

    <b-button v-if="!boolModify" type="button" class="btn btn-lg btn-secondary" @click="modify">Modifica</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-success" @click="saveData" >Salva</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger" @click="undoChange">Annulla</b-button>


    <b-button type="button" class="btn btn-lg btn-danger delete">Elimina cliente</b-button>
  </b-col >
</template>

<script>
  import Functions from '../functions/function'
  export default {
    data() {
      return {
        identifier: '4485423185',
        name: 'Mario',
        surname: 'Mari',
        sex: 'F',
       options: [
          { value: 'M', text:'M'},
          { value: 'F', text:'F'},
          { value: 'Altro',text:'Altro'},
        ],
        birthday: '10/12/1992',
        phoneNumber: '3506451389',
        email: 'example@gmail.com',
        password: 'cacca',
        address: {
          addressStreet: 'Via dei cazzi',
          addressNumber: '13',
          addressCity: 'Bologna'
        },
        payment: {
          cardType: 'debito',
          cardName: 'Visa',
          cardSurname: 'Vitali',
          cardExpireMonth: '7',
          cardExpireYear: '24',
          cardCVV: '111'
        },      
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
    methods: {

      modify(){
        this.copyName = this.name,
        this.copySurname = this.surname,
        this.copySex = this.sex,
        this.copyDate = this.date,
        this.copyPhoneNumber = this.phoneNumber,
        this.copyEmail = this.email,
        this.copyPassword = this.password,
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
          query.surname = this.copySurname;
          
        if(this.copySex != this.sex)
          query.sex = this.copySex;
        
        if(this.copyDate != this.date)
          query.date = this.copyDate;
          
        if(this.copyPhoneNumber != this.phoneNumber)
          query.phoneNumber = this.copyPhoneNumber;
          
        if(this.copyEmail != this.email)
          query.email = this.copyEmail;
          
        if(this.copyAddressStreet != this.address.addressStreet){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressStreet = this.copyAddressStreet;
        }
          
        if(this.copyAddressNumber != this.address.addressNumber){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressNumber = this.copyAddressNumber;
        }
        if(this.copyAddressCity != this.address.addressCity){
          if(query.address === undefined){
            query.address = {}
          }
          query.address.addressCity = this.copyAddressCity;
        }
        if(this.copyCardType != this.payment.cardType){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardType = this.copyCardType;
        }
        if(this.copyCardName != this.payment.cardName){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardName = this.copyCardName;
        }
        if(this.copyCardSurname != this.payment.cardSurname){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardSurname = this.copyCardSurname;
        }
        if(this.copyCardExpireMonth != this.payment.cardExpireMonth){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardExpireMonth = this.copyCardExpireMonth;
        }
        if(this.copyCardExpireYear != this.payment.cardExpireYear){
          if(query.payment === undefined){
            query.payment = {}
          }
          query.payment.cardExpireYear = this.copyCardExpireYear;
        }
        
        console.log(query);
        Functions.saveDataClient(this.identifier, query)
        .then(response => {
          if(response.status == '200'){
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
</style>