<template>
  <table class="table invoice p-2">
    <tbody>
        <tr>
            <td>{{'Ricevente: '+ reservation.clientName +' '+ reservation.clientSurname + '-' + reservation.clientEmail }}</td>
            <td>Emittente: NoloNoloPlus</td>
        </tr>
        <tr>
            <td>Fattura: {{reservation._id}}</td>
            <td>Data: {{date}}</td>
        </tr>
        <tr>
            <td colspan="2" class="inner" style="border-top: none">
                <table class="table inner"><tbody>
                    <tr>
                        <td class="noborder"><b>Descrizione</b></td>
                        <td class="noborder"><b>Qnt</b></td>
                        <td class="noborder"><b>Prezzo</b></td>
                        <td class="noborder"><b>Sconto</b></td>
                        <td class="noborder"><b>IVA</b></td>
                        <td class="noborder text-end"><b>Imponibile</b></td>
                    </tr>
                    <tr>
                        <td>{{reservation.productTitle + ' ' + reservation.productBrand + ' (fisso)'}}</td>
                        <td>1</td>
                        <td>{{(this.prezzoFissoSenzaIva).toFixed(2) + " €"}}</td>
                        <td>{{(this.scontoFisso).toFixed(2) + "%"}}</td>
                        <td>22%</td>
                        <td class="text-end">{{(this.imponibileFisso).toFixed(2) + " €"}}</td>
                    </tr>
                    <tr class="inner">
                        <td class="noborder">{{reservation.productTitle + ' ' + reservation.productBrand + ' (variabile)'}}</td>
                        <td class="noborder">{{this.days}}</td>
                        <td class="noborder">{{(this.prezzoVariabileSenzaIva).toFixed(2) + " €"}}</td>
                        <td class="noborder">{{(this.scontoVariabile).toFixed(2) + "%"}}</td>
                        <td class="noborder">22%</td>
                        <td class="noborder text-end">{{(this.imponibileVariabile).toFixed(2) + " €"}}</td>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td >Totale imponibile</td>
            <td style="text-align: right">{{(this.totale).toFixed(2) + " €"}}</td>
        </tr>
        <tr>
            <td >IVA</td>
            <td style="text-align: right">{{(this.totale * 0.22).toFixed(2) + " €"}}</td>
        </tr>
        <tr>
            <td>Penale</td>
            <td style="text-align: right">{{(this.penale).toFixed(2) + " €"}}</td>
        </tr>
        <tr class="totale">
            <td >Totale</td>
            <td style="text-align: right"> {{(this.totale + this.totale * 0.22 + this.penale).toFixed(2) + " €"}}</td>
        </tr>
        <tr>
            <td colspan={2}><span style="font-weight: 700">Note:</span> {{reservation.description}} </td>
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
      date: '',
      prezzoFissoSenzaIva: 0,
      prezzoVariabileSenzaIva: 0,
      imponibileFisso: 0,
			imponibileVariabile: 0,
			scontoFisso: 0,
			scontoVariabile: 0,
			totale: 0,
			penale: 0
      
    }
  },
  created(){
    Functions.getReservation(this.$route.params.id).then((result) => {
      console.log(result.data.data.obj)
      this.reservation = result.data.data.obj
      let start = new Date(this.reservation.startDate.year, this.reservation.startDate.month-1, this.reservation.startDate.day)
      let end = new Date(this.reservation.endDate.year, this.reservation.endDate.month-1, this.reservation.endDate.day)
      let diffTime = end - start;
      this.days  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
      this.date = this.reservation.endDate.day +'/'+ this.reservation.endDate.month +'/'+ this.reservation.endDate.year
      this.prezzoFissoSenzaIva = this.scorporo(this.reservation.fixedPrice)
      this.prezzoVariabileSenzaIva = this.scorporo(this.reservation.variablePrice)
      this.imponibileFisso = this.prezzoFissoSenzaIva
      if(this.reservation.fixedDiscount.onSale == true) {
        if(this.reservation.fixedDiscount.onSaleType == true) {
          this.imponibileFisso = this.scorporo(this.reservation.fixedPrice * (100 - parseFloat(this.reservation.fixedDiscount.onSaleValue)) / 100)
        } else {
        this.imponibileFisso = this.scorporo(this.reservation.fixedPrice) - this.scorporo(parseFloat(this.reservation.fixedDiscount.onSaleValue))
        }
      }
			this.imponibileVariabile = this.prezzoVariabileSenzaIva * this.days
			if(this.reservation.variableDiscount.onSale == true && this.days > this.reservation.variableDiscount.days) {
				if(this.reservation.variableDiscount.onSaleType == true) {
					this.imponibileVariabile = this.scorporo(this.reservation.variablePrice * this.days * (100 - parseFloat(this.reservation.variableDiscount.onSaleValue)) / 100)
				} else {
					this.imponibileVariabile = this.scorporo(this.reservation.variablePrice * this.days - parseFloat(this.reservation.variableDiscount.onSaleValue)) 
				}
			}
			// Valori in Sconto
			if(this.reservation.fixedDiscount.onSale == true) {
				if(this.reservation.fixedDiscount.onSaleType == true) {
					this.scontoFisso = parseFloat(this.reservation.fixedDiscount.onSaleValue)
				} else {
					this.scontoFisso = 100 - (this.imponibileFisso / this.prezzoFissoSenzaIva * 100)
				}
			}
			if(this.reservation.variableDiscount.onSale == true && this.days > this.reservation.variableDiscount.days) {
				if(this.reservation.variableDiscount.onSaleType == true) {
					this.scontoVariabile = parseFloat(this.reservation.variableDiscount.onSaleValue)
				} else {
					this.scontoVariabile = 100 - (this.imponibileVariabile / this.days / this.prezzoVariabileSenzaIva * 100)
				}
			}
			this.totale = this.imponibileFisso + this.imponibileVariabile
			if(new Date() > new Date(this.reservation.endDate.year, this.reservation.endDate.month - 1, this.reservation.endDate.day) && this.reservation.isReturned == false && this.reservation.isTaken == true){
       this.penale = (this.imponibileFisso + this.imponibileVariabile) * 1.22 * 0.1
     }
    
    },(error) => {
        alert('La pagina non esiste');
        this.$router.push({ name: 'home' , params: { filter: ''}})
      }
    )
  },
  methods: {
    scorporo(price) {
        return price / 122 * 100;
    },
  }
}
</script>


<style scoped>
.invoice {
    margin: 40px auto;
    text-align: left;
    width: 50%;
}
td {
    padding: 5px 0 !important;
}
.invoice .totale td {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    font-weight: 700;
}
.inner {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    margin-bottom: 0px !important;
    margin-top: 0px !important;
}
.noborder {
    border-top: 0px !important;
    border-bottom: 0px !important;
    border-color: inherit !important;
}
</style>