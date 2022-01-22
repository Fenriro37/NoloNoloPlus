<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">
      <div class="input-group mb-3 mt-2">
        <input type="emai" class="form-control" placeholder="Cerca un cliente" v-model="user" id="newMail" aria-label="newMail" aria-describedby="basic-0">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" placeholder="Cerca utenti" @click="createChart">Button</button>
      </div>

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
            <input type="text" id="Reservation number" :value="price.length" class="form-control" aria-label="Reservation number" aria-describedby="basic-1" readonly>
            <label for="Reservation number"> Totale noleggi</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation total" :value="newTotal + '€'" class="form-control" aria-label="Reservation total" aria-describedby="basic-2" readonly>
            <label for="Reservation total"> Totale fatturato</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averagePrice" :value="newTotal/price.length + '€'" class="form-control" aria-label="Reservation averagePrice" aria-describedby="basic-3" readonly>
            <label for="Reservation averagePrice"> Media costo prenotazione</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averageDays" :value="totalDays/price.length + ' giorni'" class="form-control" aria-label="Reservation averageDays" aria-describedby="basic-4" readonly>
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
            let time = (item.endDate.year * 10000 + item.endDate.month * 100 + item.endDate.day) - (item.startDate.year * 10000 + item.startDate.month * 100 + item.startDate.day) + 1
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
                  borderColor: 'rgba(50, 115, 220, 0.5)',
                  backgroundColor: 'rgba(50, 115, 220, 0.1)'
                },
                {
                  data: this.days,
                  label: 'Giorni prenotazione',
                  borderColor: 'rgba(255, 56, 96, 0.5)',
                  backgroundColor: 'rgba(255, 56, 96, 0.1)',
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
                  backgroundColor: 'rgba(255, 56, 96, 0.1)',
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