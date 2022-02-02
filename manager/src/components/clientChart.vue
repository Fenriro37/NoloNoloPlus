<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-100">
      <form name="myform" id="formId" @submit.prevent="createChart">
        <div class="input-group mb-3 mt-2">
          <input type="email" class="form-control" placeholder="Cerca un cliente" v-model="user" required> 
          <button class="btn btn-outline-secondary" type="submit" >Cerca</button>
        </div>
      </form>

      <template v-if="newTotal === 0 && boolChart">
        <textarea class="form-control" id="TextareaError" rows="3" disabled >Il cliente non esiste o non ha effettuato prenotazioni</textarea>
      </template>

      <div>
        <h4  v-if="newTotal !== 0" class="mb-2 mt-3">Fatturato/Periodo</h4>
        <canvas id="user-Chart"></canvas>
        <hr  v-if="newTotal !== 0" >
        <h4   v-if="newTotal !== 0" class="mb-2 mt-3">Prenotazioni per mese</h4>
        <canvas id="month-Chart"></canvas>
      </div>

      <template v-if="newTotal !== 0">
        <div class="mb-5 mt-3">
          <h4>Statistiche</h4>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation number" :value="price.length" class="form-control" readonly>
            <label for="Reservation number"> Totale noleggi</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation total" :value="(newTotal).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation total"> Totale fatturato</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averagePrice" :value="(newTotal/price.length).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation averagePrice"> Media costo prenotazione</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averageDays" :value="(totalDays/price.length).toFixed(2) + ' giorni'" class="form-control" readonly>
            <label for="Reservation averageDays"> Media durata noleggio</label>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Functions from '../functions/function'
import Chart from 'chart.js'
import numeral from 'numeral';

export default {
  data() {
    return {
      user: '',
      userChart: null,
      monthChart: null,

      chart1: null,
      chart2: null,

      labels: [],
      price: [],
      days: [],
      bookings: [],
      monthfrequence: [],

      newTotal: 0,
      totalDays: 0,
      boolChart: false
    }
  },

  mounted(){
    if(this.$route.params.email != undefined)
      this.createChart()
  }, 
  beforeDestroy () {
    // Don't forget to destroy the Chart.js instance.
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    createChart(){
      this.labels = []
      this.price = []
      this.days = []
      this.monthfrequence = []
      this.newTotal = 0
      this.totalDays = 0

      if(this.chart1 != null){
        this.chart1.destroy()
        this.chart2.destroy()
        this.userChart = null
        this.monthChart = null
      }

      let email = ''
      if(this.user != '')
        email = this.user
      else 
        email = this.$route.params.email

      console.log(email)
      let query = {
        filter: email,
        sort: false
      }
      for(let i = 0; i < 12; i++)
        this.monthfrequence[i] = 0

      Functions.getAllReservation( query)
      .then( (result) => {
        console.log(result.data.obj)
        this.bookings = []
        this.bookings = result.data.obj
        if(this.bookings.length === 0){
          this.boolChart = true
        }
        else {
          this.bookings.forEach(item => {
            this.labels.push(item.productTitle + item.productBrand)
            this.price.push(item.totalPrice)
            this.newTotal += item.totalPrice 

            let date1 = new Date(item.endDate.year, item.endDate.month-1, item.endDate.day)
            let date2 = new Date(item.startDate.year, item.startDate.month-1, item.startDate.day) 
            let diffTime = date1 - date2;
            let time  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;             
            this.totalDays += time
            this.days.push(time)
            this.monthfrequence[(item.bookingDate.month - 1)]++
          }); 
          this.userChart = {
            type: "bar",
            data: {
              labels: this.labels,
              datasets: [
                {
                  data: this.price,
                  label: 'Prezzo Prenotazione',
                  borderColor: 'rgba(50, 115, 220)',
                  backgroundColor: 'rgb(50, 115, 220)'
                },
                {
                  data: this.days,
                  label: 'Giorni prenotazione',
                  borderColor: 'rgba(255, 56, 96, 0.5)',
                  backgroundColor: 'rgb(255, 56, 96)',
                } 
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: value => numeral(value).format('0')
                  }
                }]
              },
            }
          };
          var ctx = document.getElementById('user-Chart')
          this.chart1 = new Chart(ctx, this.userChart);
          this.monthChart = {
            type: "bar",
            data: {
              labels: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
              datasets: [
                {
                  data: this.monthfrequence,
                  label: 'Prenotazioni mensili',
                  borderColor: 'rgba(255, 56, 96, 0.5)',
                  backgroundColor: 'rgb(255, 56, 96)',
                } 
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: value => numeral(value).format('0')
                  }
                }]
              },
            }
          };
          var ctx1 = document.getElementById('month-Chart')
          this.chart2 = new Chart(ctx1, this.monthChart);
          this.boolChart = false
        }
      })
      .catch( (error) => {
          alert('Problema nel caricamento dei dati');
        })
    }
    
  }
}

</script>

<style scoped>
#TextareaError{
  white-space: normal;
  text-align: justify;
  text-align-last: center;
}
</style>