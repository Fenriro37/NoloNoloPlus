<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">
      <div class="input-group mb-3 mt-2">
        <input type="text" class="form-control" placeholder="Cerca una categoria" v-model="tag" @keyup.enter="createChart" id="newTag" aria-label="newMail" >
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" placeholder="Cerca utenti" @click="createChart">Button</button>
      </div>

      <template v-if="newTotal === 0 && boolChart">
        <textarea class="form-control" id="TextareaError" rows="3" disabled >La categoria non esiste</textarea>
      </template>

      <div>
        <h4  v-if="newTotal !== 0" class="mb-2 mt-3">Fatturato/Periodo</h4>
        <canvas id="catalog-Chart"></canvas>
        <hr  v-if="newTotal !== 0" >
        <h4   v-if="newTotal !== 0" class="mb-2 mt-3">Prenotazioni per mese</h4>
        <canvas id="month-Chart"></canvas>
        <hr  v-if="newTotal !== 0" >
        <h4   v-if="newTotal !== 0" class="mb-2 mt-3">Qualità</h4>
        <canvas id="quality-Chart"></canvas>
      </div>

      <template v-if="newTotal !== 0">
        <div class="mb-5 mt-3">
          <h4>Statistiche</h4>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation number" :value="reservationCount" class="form-control" readonly>
            <label for="Reservation number"> Totale noleggi</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation total" :value="(parseFloat(newTotal)).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation total"> Totale fatturato</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averagePrice" :value="(newTotal/reservationCount).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation averagePrice"> Media costo prenotazione</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averageDays" :value="(totalDays/reservationCount).toFixed(2) + ' giorni'" class="form-control" readonly>
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
      qualityChart: null,

      chart1: null,
      chart2: null,
      chart3: null,

      labels: [],
      price: [],
      days: [],
      quality:[],
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
      this.quality = []
      this.newTotal = 0
      this.totalDays = 0
      this.reservationCount = 0

      if(this.chart1 != null){
        this.chart1.destroy()
        this.chart2.destroy()
        this.chart3.destroy()
        this.catalogChart = null
        this.monthChart = null
        this.qualityChart = null
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
          console.log(result.data.data)
          if(result.data.data.length === 0){
            this.boolChart = true
          }
          else { 
            result.data.data.products.forEach(item => {
              let totalArticle = 0
              let daysArticle = 0
              this.labels.push(item.title + item.brand)
              this.quality.push(item.quality)
              item.bookings.forEach(i => {   
                this.reservationCount++
                //per ogni articolo sommo fatturato e periodo noleggio
                totalArticle += i.total 
                let date1 = new Date(i.endDate.year, i.endDate.month-1, i.endDate.day)
                let date2 = new Date(i.startDate.year, i.startDate.month-1, i.startDate.day) 
                let diffTime = date1 - date2;
                let time  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
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
            this.qualityChart = {
              type: "bar",
              data: {
                labels: this.labels,
                datasets: [
                  {
                    data: this.quality,
                    label: 'Qualità prodotti',
                    borderColor: 'rgba(50, 115, 220, 0.5)',
                    backgroundColor: 'rgb(50, 115, 220)'
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
            var ctx2 = document.getElementById('quality-Chart')
            this.chart3 = new Chart(ctx2, this.qualityChart);
            this.boolChart = false
          }
        })
        .catch( (error) => {
          alert('Problema nel caricamento dei dati');
        })
      }
      //Statistiche intero catalogo
      else{
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
              this.quality.push(item.quality)
              item.bookings.forEach(i => {   
                this.reservationCount++
                //per ogni articolo sommo fatturato e periodo noleggio
                totalArticle += i.total 

                let date1 = new Date(i.endDate.year, i.endDate.month-1, i.endDate.day)
                let date2 = new Date(i.startDate.year, i.startDate.month-1, i.startDate.day) 
                let diffTime = date1 - date2;
                let time  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
                daysArticle += time
                this.monthfrequence[(i.startDate.month - 1)]++
              })
              //aggiorno il totale
              this.newTotal += parseFloat(totalArticle)
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
            this.qualityChart = {
              type: "bar",
              data: {
                labels: this.labels,
                datasets: [
                  {
                    data: this.quality,
                    label: 'Qualità prodotti',
                    borderColor: 'rgba(50, 115, 220, 0.5)',
                    backgroundColor: 'rgb(50, 115, 220)'
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
            var ctx2 = document.getElementById('quality-Chart')
            this.chart3 = new Chart(ctx2, this.qualityChart);

            this.boolChart = false
          }
        })
        .catch( (error) => {
          alert('Problema nel caricamento dei dati');
        })
      }
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