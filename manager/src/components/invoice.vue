<template>
  <table class="table invoice">
    <tbody>
        <tr>
            <td>{{'Ricevente: '+ reservation.clientName +' '+ reservation.clientSurname}}</td>
            <td>Emittente: NoloNoloPlus</td>
        </tr>
        <tr>
            <td>Fattura: {{reservation._id}}</td>
            <td>Data: {{date}}</td>
        </tr>
        <tr>
            <td colspan="2" style="border-bottom: none">
                <table class="table inner"><tbody>
                    <tr>
                        <td><b>Descrizione</b></td>
                        <td><b>Quantità</b></td>
                        <td><b>Prezzo</b></td>
                        <td><b>Sconto</b></td>
                        <td><b>IVA</b></td>
                        <td><b>Imponibile</b></td>
                    </tr>
                    <tr>
                        <td>{{reservation.productTitle + ' ' + reservation.productBrand + ' (fisso)'}}</td>
                        <td>1</td>
                        <td>{{(reservation.fixedPrice / 122 * 100).toFixed(2)}}</td>
                        <td>Sconto</td>
                        <td>22%</td>
                        <td>Imponibile</td>
                    </tr>
                    <tr>
                        <td>{{reservation.productTitle + ' ' + reservation.productBrand + ' (variabile)'}}</td>
                        <td>{{this.days}}</td>
                        <td>{{(reservation.variablePrice / 122 * 100).toFixed(2)}}</td>
                        <td>Sconto</td>
                        <td>22%</td>
                        <td>Imponibile</td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td >Totale imponibile</td>
            <td style="text-align: right">totPrice Scorporato</td>
        </tr>
        <tr>
            <td >IVA</td>
            <td style="text-align: right">€ prezzo</td>
        </tr>
        <tr class="totale">
            <td >Totale</td>
            <td style="text-align: right">€ {{reservation.totalPrice}}</td>
        </tr>
    </tbody> 
  </table>
</template>
<script>
import "bootstrap";
import Functions from '../functions/function'

export default {
  data() {
    return {
      reservation: {},
      days: 0,
      date: ''
    }
  },
  created(){
    Functions.getReservation(this.$route.params.id).then((result) => {
      console.log(result.data.data.obj)
      this.reservation = result.data.data.obj
      let start = parseInt(result.data.data.obj.startDate.year) * 10000 + parseInt(result.data.data.obj.startDate.month) * 100 + parseInt(result.data.data.obj.startDate.day)
      let end = parseInt(result.data.data.obj.endDate.year) * 10000 + parseInt(result.data.data.obj.endDate.month) * 100 + parseInt(result.data.data.obj.endDate.day)
      this.days = end - start + 1
      this.date = result.data.data.obj.endDate.day +'/'+ result.data.data.obj.endDate.month +'/'+ result.data.data.obj.endDate.year
    },(error) => {
        alert('La pagina non esiste');
        this.$router.push({ name: 'reservationCatalog' , params: { filter: ''}})
      }
    )
  } 
}
</script>


<style scoped>
.invoice {
    margin: 40px auto;
    text-align: left;
    width: 50%;
}
.invoice td {
    padding: 5px 0;
}
.invoice .totale td {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    font-weight: 700;
}
.inner {
    margin-bottom: 0px;
}
</style>