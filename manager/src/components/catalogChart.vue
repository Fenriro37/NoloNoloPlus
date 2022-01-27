<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">
      <div class="input-group mb-3 mt-2">
        <input type="text" class="form-control" placeholder="Cerca una categoria" v-model="tag" id="newTag" aria-label="newMail" >
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" placeholder="Cerca utenti" @click="createChart">Button</button>
      </div>

      <template v-if="newTotal === 0 && boolChart">
        <textarea class="form-control" id="TextareaError" rows="3" disabled >Il cliente non esiste o non ha effettuato prenotazioni</textarea>
      </template>

      <div>
        <h4  v-if="newTotal !== 0" class="mb-2 mt-3">Fatturato/Periodo</h4>
        <canvas id="catalog-Chart"></canvas>
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
      tag: '',
      catalogChart: null,
      monthChart: null,

      chart1: null,
      chart2: null,

      labels: [],
      price: [],
      days: [],
      monthfrequence: [],
      reservationCount: 0,
      newTotal: 0,
      totalDays: 0,
      boolChart: false
    }
  },

  mounted(){
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
        this.catalogChart = null
        this.monthChart = null
      }

      let filter = ''
      if(this.tag != '')
        filter = this.tag

      let query = {
        filter: filter,
        sort: false
      }
      for(let i = 0; i < 12; i++)
        this.monthfrequence[i] = 0

      if(this.tag!= ''){
        Functions.getTags(this.tag).then ( (result) => {
          console.log(result)
        })
      }

      Functions.getAllProduct( query)
      .then( (result) => {
        console.log(result.data.data)
         if(result.data.data.length === 0){
          this.boolChart = true
        }
        else { 
          result.data.data.forEach(item => {
            let totalArticle = 0
            let daysArticle = 0
            this.labels.push(item.title + item.brand)
            item.bookings.forEach(i => {   
              this.reservationCount++
              //per ogni articolo sommo fatturato e periodo noleggio
              totalArticle += i.total 
              let time = (i.endDate.year * 10000 + i.endDate.month * 100 + i.endDate.day) - (i.startDate.year * 10000 + i.startDate.month * 100 + i.startDate.day) + 1
              daysArticle += time
              this.monthfrequence[(i.startDate.month - 1)]++
            })
            //aggiorno il totale
            this.newTotal += totalArticle
            this.totalDays += daysArticle
            //inserisco nell'array
            this.price.push(totalArticle)
            this.days.push(daysArticle)
          });  
          this.catalogChart = {
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
          var ctx = document.getElementById('catalog-Chart')
          this.chart1 = new Chart(ctx, this.catalogChart);
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