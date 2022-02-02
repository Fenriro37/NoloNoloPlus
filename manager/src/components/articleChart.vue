<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-100">

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
            <input type="text" id="Reservation number" :value="price.length" class="form-control" readonly>
            <label for="Reservation number"> Totale noleggi</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation total" :value="(parseFloat(newTotal)).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation total"> Totale fatturato</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averagePrice" :value="(parseFloat(newTotal/price.length)).toFixed(2) + '€'" class="form-control" readonly>
            <label for="Reservation averagePrice"> Media costo prenotazione</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" id="Reservation averageDays" :value="(parseFloat(totalDays/price.length)).toFixed(2) + ' giorni'" class="form-control" readonly>
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

        let date1 = new Date(item.endDate.year, item.endDate.month-1, item.endDate.day)
        let date2 = new Date(item.startDate.year, item.startDate.month-1, item.startDate.day) 
        let diffTime = date1 - date2;
        let time  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
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
      new Chart(ctx1, this.monthChart);

      
    }) 
    .catch( (error) => {
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