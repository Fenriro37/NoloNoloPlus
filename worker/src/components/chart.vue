<!-- my-component.vue -->
<template>
<div class="container-fluid">
    <canvas id="fuffa"></canvas>
</div>

</template>
<script >
import Chart from 'chart.js'

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
    created(){
      this.articles = this.$route.params.products
      for (let i in this.articles) {
        this.labels[i] = this.articles[i].title + '' + this.articles[i].brand
        this.price[i] = this.articles[i].price
        this.quality[i] = this.articles[i].quality
      }
      console.log(this.quality)
    },
    mounted(){
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
                    borderWidth: 3
                }, 
                {
                    label: "Qualità",
                    data: this.quality,
                    backgroundColor: "rgba(71, 183,132,.5)",
                    borderColor: "#47b784",
                    borderWidth: 3
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
        const ctx = document.getElementById('fuffa');
        new Chart(ctx, this.firstChart);
    }

  }

</script>