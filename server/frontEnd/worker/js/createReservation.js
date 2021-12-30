$('#rentalOccurred').change(function() {
	if (this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
  }
	if (!this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto non è stato ritirato");
  } 
})

$('#returned').change(function() {
	if (this.checked) {
		$('label[for=returned]').text("Il prodotto è stato restituito");
  }
	if (!this.checked) {
		$('label[for=returned]').text("Il prodotto non è stato restituito");
  } 
})

function show(){
    var date = new Date($('#date-input').val());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    alert([day, month, year].join('/'));
}