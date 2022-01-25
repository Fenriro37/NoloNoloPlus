<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">

      <template v-if="newTotal === 0">
        <textarea class="form-control" id="TextareaError" rows="3" disabled >L'articolo non è mai stato prenotato</textarea>
      </template>

      <div>
        <h4  v-if="newTotal !== 0" class="mb-2 mt-3">Fatturato/Periodo</h4>
        <canvas id="article-Chart"></canvas>
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
      articleChart: null,
      monthChart: null,

      labels: [],
      price: [],
      days: [],
      monthfrequence: [],

      newTotal: 0,
      totalDays: 0,
    }
  },

  mounted(){
    for(let i = 0; i < 12; i++)
      this.monthfrequence[i] = 0

    Functions.getProduct(this.$route.params.id).then( (result) => {
      console.log(result.data.data.obj)

      result.data.data.obj.bookings.forEach(item => {
        this.labels.push(item.clientId)
        this.price.push(item.total)
        this.newTotal += item.total 
        let time = (item.endDate.year * 10000 + item.endDate.month * 100 + item.endDate.day) - (item.startDate.year * 10000 + item.startDate.month * 100 + item.startDate.day) + 1
        this.totalDays += time
        this.days.push(time)
        this.monthfrequence[(item.startDate.month - 1)]++
      })
      this.articleChart = {
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
      var ctx = document.getElementById('article-Chart')
      new Chart(ctx, this.articleChart);
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
      new Chart(ctx1, this.monthChart);

      
    }, 
    (error) => {
        alert('La pagina non esiste');
        this.$router.push({ name: 'home'})
    })

  }, 
  beforeDestroy () {
    // Don't forget to destroy the Chart.js instance.
    if (this.chart) {
      this.chart.destroy()
    }
  },    
}      

</script>

<style scoped>
#TextareaError{
  white-space: normal;
  text-align: justify;
  text-align-last: center;
}
</style>