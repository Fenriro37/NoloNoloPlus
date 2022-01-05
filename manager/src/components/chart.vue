<!-- my-component.vue -->
<template>
<div class="container-fluid">
    <canvas id="myChart"></canvas>
</div>

</template>
<script >
import Chart from 'chart.js'
import Functions from '../functions/function'
export default {
    data() {
      return {
        articles: [],
        labels: [],
        price: [],
        quality: [],
        firstChart: '',

        
      }
    },
    /* created(){
      let query = {
      filter: "",
      sort: false
      }
      Functions.getAllProduct(query)
      .then( (result) => {
        console.log(result)
      
        for (let i in result.data.data) {
          this.labels[i] = result.data.data[i].title + '' + result.data.data[i].brand
          this.price[i] = parseInt(result.data.data[i].price)
          this.quality[i] = parseInt(result.data.data[i].quality)
        }
        console.log(this.labels)
        console.log(this.price)
        console.log(this.quality)
      })
    }, */

    mounted(){
      let query = {
      filter: "",
      sort: false
      }
      Functions.getAllProduct(query)
      .then( (result) => {
        console.log(result)
      
        for (let i in result.data.data) {
          this.labels[i] = result.data.data[i].title + '' + result.data.data[i].brand
          this.price[i] = result.data.data[i].price
          this.quality[i] = result.data.data[i].quality
        }
      
        this.firstChart = {
            type: "bar",
            data: {
              labels: this.labels,
              datasets: [
                {
                    label: "Prezzo",
                    data: this.price,
                    backgroundColor: "rgba(54,73,93,.5)",
                    borderColor: "#36495d",
                }, 
                {
                    label: "Qualità",
                    data: this.quality,
                    backgroundColor: "rgba(71, 183,132,.5)",
                    borderColor: "#47b784",
                } 
              ]
            },
            options: 
            {
                responsive: true,
                lineTension: 1,
                scales: {
                    yAxes: [
                        {
                        ticks: {
                            beginAtZero: true,
                            padding: 25
                        }
                        }
                    ]
                }
            }
        };
        const ctx = document.getElementById('myChart');
        new Chart(ctx, this.firstChart);
      })
    }
    
  }

</script>