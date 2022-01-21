<template>
  <div class="container-fluid d-flex justify-content-center" id="main">
    <div class="w-50">
      <div>
        <h4 class="mb-2 mt-3">Fatturato/Periodo</h4>
        <canvas id="user-Chart"></canvas>
        <hr>
        <h4 class="mb-2 mt-3">Prenotazioni per mese</h4>
        <canvas id="month-Chart"></canvas>
      </div>
    <div class="mb-5 mt-3">
      <h4>Statistiche</h4>
      <div class="row mb-2">
        <div class="col">
          <label for="Reservation number" > Totale noleggi: </label>
        </div>
        <div class="col" id="Reservation number">
          {{price.length}}
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="Reservation total" > Totale fatturato: </label>
        </div>
        <div class="col" id="Reservation total">
          {{newTotal}}€
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="Reservation averagePrice" > Media costo prenotazione: </label>
        </div>
        <div class="col mb-2" id="Reservation averagePrice">
          {{newTotal/price.length}}€
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="Reservation averageDays" >  Media durata noleggio: </label>
        </div>
        <div class="col" id="Reservation averageDays">
          {{totalDays/days.length}} giorni
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

media spesa per noleggio
media durata noleggio
<script>
import Functions from '../functions/function'
import Chart from 'chart.js'
import numeral from 'numeral';

export default {
  data() {
    return {
      userChart: null,
      monthChart: null,
      labels: [],
      price: [],
      days: [],
      bookings: {},
      monthfrequence: [],
      newTotal: 0,
      totalDays: 0
    }
  },

  mounted(){
    let query = {
      filter: this.$route.params.email,
      sort: false
    }
    for(let i = 0; i < 12; i++)
      this.monthfrequence[i] = 0

    Functions.getAllReservation( query)
    .then( (result) => {
      console.log(result.data.obj)
      this.bookings = result.data.obj
      this.bookings.forEach(item => {
        this.labels.push(item.productTitle + item.productBrand)
        this.price.push(item.totalPrice)
        this.newTotal += item.totalPrice 
        let time = (item.endDate.year * 10000 + item.endDate.month * 100 + item.endDate.day) - (item.startDate.year * 10000 + item.startDate.month * 100 + item.startDate.day) + 1
        this.totalDays += time
        this.days.push(time)
        this.monthfrequence[(item.bookingDate.month - 1)]++
      }); 
      console.log(this.monthfrequence)
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
                //callback: value => numeral(value).format('0,0')
              }
            }]
          },
          /* tooltips: {
            mode: 'index',
            callbacks: {
              label(tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label;
                const value = numeral(tooltipItem.yLabel).format('0,0');

                return `${label}: ${value}`;
              }
            } 
          }*/
        }
      };
      const ctx = document.getElementById('user-Chart');
      new Chart(ctx, this.userChart);
      //this.removeData(this.userChart)
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
      const ctx1 = document.getElementById('month-Chart');
      new Chart(ctx1, this.monthChart);
    })
  }, 
  beforeDestroy () {
    // Don't forget to destroy the Chart.js instance.
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    removeData(Chart) {
      this.userChart.data.labels.pop();
      Chart.data.datasets.forEach((dataset) => {
      console.log("asaaaaaa")
      console.log(dataset)
      });
      //this.chart.update();
    }
  }
}

</script>
