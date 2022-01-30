let data = {}
let article = {}
let boolModify

//serve per inizializzare il datepickerRange. Se viene inizializzato più volte smette di funzionare
let firstTime = 0

let dateBeginnig = []
let dateFinish = []

window.onload = function getReservation() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('=') + 1);
  $.ajax({
      url: "/api/reservation?id=" + id,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        data = result.data.obj
        console.log(data)
        dateBeginnig[0] = data.startDate.day
        dateBeginnig[1] = data.startDate.month
        dateBeginnig[2] = data.startDate.year
        dateFinish[0] = data.endDate.day
        dateFinish[1] = data.endDate.month
        dateFinish[2] = data.endDate.year
        insertData()  
        //Get product
        $.ajax({
          url: "/api/product?id=" + data.productId,
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          // Risposta del server in caso di successo
          success: (result) => {
            article = result.data.obj
            console.log(article)  
          },
          // Risposta del server in caso di insuccesso
          error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
          }
        }); 
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
        console.log("Error");
        alert("Pagina non disponibile o inesistente");
        window.location = "http://localhost:8081/worker/navbar.html?";
      }
  });
}

function insertData(){
  $("#img").append(
    ' <img tabindex="0" class="img-thumbnail" alt="Immagine prodotto '+ data.productTitle + " " + data.productBrand +'" src='+ data.productImage+'>'
  )
  $("#info").prepend(
    '<p tabindex="0" aria-label="Identificativo prenotazione: '+data._id+'">Id prenotazione: ' +data._id+ '</p>' +
    '<p>Articolo: <a aria-label="Link al prodotto: '+data.productTitle + " " + data.productBrand+' " href="article.html?id=' +data.productId+ '">' +data.productTitle + " " + data.productBrand + '</a></p>' +
    '<p>Email: <a aria-label="Link al cliente:  '+data.clientEmail+'" href="client.html?mail=' +data.clientEmail+ '">' +data.clientEmail+ '</a></p>' + 
    '<p><a aria-label="Link alla Fattura" href="invoice.html?id='+data._id+'">Fattura</a>'
  )
  fill()
} 

function fill(){
  $("#fixedPrice").attr("placeholder", data.fixedPrice);
  $("#fixedPrice").val(data.fixedPrice);
  $("#dailyPrice").attr("placeholder", data.variablePrice);
  $("#dailyPrice").val(data.variablePrice);
  $("#newTotal").val(data.totalPrice);
  if(data.fixedDiscount.onSale){
    $('#sale').prop('checked', true);
    changeSale()
    $("#saleValue").val(data.fixedDiscount.onSaleValue);
    $("#saleValue").attr("placeholder", data.fixedDiscount.onSaleValue);
    if(data.fixedDiscount.onSaleType){
      $('#percentage').prop('checked', true);
    }
    else 
      $('#flat').prop('checked', true);
  }
  if(data.variableDiscount.onSale){
    $('#dailySale').prop('checked', true);
    changeDailySale()
    $("#dailySaleValue").val(data.variableDiscount.onSaleValue);
    $("#dailySaleValue").attr("placeholder", data.variableDiscount.onSaleValue);
    $("#daysCount").val(data.variableDiscount.days);
    $("#daysCount").attr("placeholder", data.variableDiscount.days);
    if(data.variableDiscount.onSaleType)
      $('#dailyPercentage').prop('checked', true);
    else 
      $('#dailyFlat').prop('checked', true);
  }

  $("#bookingRequest").val( data.bookingDate.day +'-'+ data.bookingDate.month +'-'+ data.bookingDate.year);

  $("#bookingRange").val( data.startDate.day +'/'+ data.startDate.month +'/'+ data.startDate.year + ' - ' + data.endDate.day +'/'+ data.endDate.month +'/'+ data.endDate.year);

  $("#notes").attr("placeholder", data.description);
  $("#notes").val(data.description);

  $("#privateNotes").attr("placeholder", data.note);
  $("#privateNotes").val(data.note);

  if(data.isTaken){
    $('#rentalOccurred').prop('checked', true);
    $('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
  }
  else{
    $('#rentalOccurred').prop('checked', false);
    $('label[for=rentalOccurred]').text("Il prodotto non è stato ritirato");
  }
  if(data.isReturned){
    $('#returned').prop('checked', true);
    $('label[for=returned]').text("Il prodotto è stato restituito");
  }
  else{
    $('#returned').prop('checked', false);
    $('label[for=returned]').text("Il prodotto non è stato restituito");
  }
  readOnly()
}


function modify(){

  $("#myButtons").empty()
  $("#myButtons").append(
    '<button id="save" class="btn btn-lg btn-success" aria-label="Bottone salva. Aggiungerà questa prenotazione e pulirà i campi tranne l` identificativo e reimposterà i prezzi originali">Salva</button>'+
    '<button type="button" id="reset" class="btn btn-lg btn-danger" aria-label="Bottone annulla, pulisce i campi, mantenendo l` identificativo e reimposterà i prezzi originali" >Annulla</button>' +
    '<button type="button" id="delete" class="btn btn-lg btn-danger delete" onclick="remove()" aria-label="Bottone elimina. Cancella la prenotazione corrente e reindirizza al catalogo">Elimina prenotazione</button>'
  )
  if(data.isTaken){
    //$("#delete").prop("disabled", true)
    $("#delete").text("Prenotazione non eliminabile")
  }
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  if(firstTime === 0){
    firstTime = 1
    $( "#bookingRange" ).daterangepicker({    
      "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Seleziona",
        "cancelLabel": "Chiudi",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
          "Do",
          "Lu",
          "Ma",
          "Me",
          "Gi",
          "Ve",
          "Sa",
        ],
        "monthNames": [
          "Gennaio",
          "Febbraio",
          "Marzo",
          "Aprile",
          "Maggio",
          "Giugno",
          "Luglio",
          "Agosto",
          "Settembre",
          "Ottobre",
          "Novembre",
          "Dicembre"
        ],
        "firstDay": 1
      },
      minDate:  data.bookingDate.day +'/'+ data.bookingDate.month +'/'+ data.bookingDate.year,
      autoUpdateInput: false,
      showDropdowns: true, 
      isInvalidDate: function(date){
        for (let i in article.bookings) {	
          if(data._id != article.bookings[i].reservationId){
            var from = new Date(article.bookings[i].startDate.month +'-'+article.bookings[i].startDate.day+'-'+article.bookings[i].startDate.year );
            var to = new Date(article.bookings[i].endDate.month +'-'+article.bookings[i].endDate.day+'-'+article.bookings[i].endDate.year);
            var current = new Date(date);					
            if (current >= from && current <= to) return true;
          }		
        }
      return false
      }  
    });
  }
  boolModify = true
  readOnly()
}

$('#bookingRange').on('apply.daterangepicker', function(ev, picker) {
  $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('#bookingRange').on('apply.daterangepicker', function(ev, picker) {
  let block = false
  let dateRange = $(this).val()
  dateRange = dateRange.replace(/ /g, "")
  dateRange = dateRange.split("-")
  let date1 = dateRange[0]
  let date2 = dateRange[1]
  date1 = date1.split("/")
  date2 = date2.split("/")
  //modifico le variabili per salvare le date con i nuovi valori
  for(let i in date1){
    dateBeginnig[i] = date1[i]
  }
  for(let i in date2){
    dateFinish[i] = date2[i]
  }
  let d1 = new Date(date1[2], date1[1] -1, date1[0])
  let d2 = new Date(date2[2], date2[1] -1, date2[0])
  for(let i in article.bookings){
    if(data._id != article.bookings[i].reservationId){
      bookingStart = new Date(article.bookings[i].startDate.year, article.bookings[i].startDate.month-1, article.bookings[i].startDate.day)
      bookingEnd = new Date(article.bookings[i].endDate.year, article.bookings[i].endDate.month-1, article.bookings[i].endDate.day)

      if( d1 < bookingStart && bookingEnd < d2 )
       block = true
    }
  }
  if(block){
    $("#save").text("seleziona una data valida")
    $("#save").prop("disabled", true)
  }
  else{
    $("#save").text("Salva")
    $("#save").prop("disabled", false)
  }
  calculateTotal()
});

$('#rentalOccurred').change(function() {
	if (this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
  }
	if (!this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto non è stato ritirato");
    $('label[for=returned]').text("Il prodotto non è stato restituito");
    $('#returned').prop('checked', false);
  } 
})

$('#returned').change(function() {
	if (this.checked) {
	  $('label[for=returned]').text("Il prodotto è stato restituito");
    $('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
    $('#rentalOccurred').prop('checked', true);
  }
	if (!this.checked) {
		$('label[for=returned]').text("Il prodotto non è stato restituito");
  } 
})

$('#sale').change(changeSale)

function changeSale() {
  if ($('#sale').is(":checked") == true) {
		$('label[for=sale]').text("Il prodotto è scontato");
		$("#saleRow").append(
			'<div id="saleInfo" class="mt-2">' +
				'<div class="row">' +
						'<div class="col-3"><p> Tipo di sconto:</p></div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" aria-label="Sconto percentuale, seleziona uno dei due" id="percentage" required>' +
								'<label class="form-check-label" for="percentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" aria-label="Sconto fisso, seleziona uno dei due" name="flexRadioDefault" id="flat" required>' +
								'<label class="form-check-label" for="flat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step=".01" id="saleValue" onkeyup="calculateTotal()" aria-label="Valore sconto prezzo fisso. Campo obbligatorio" required>' +
					'</div>' +
				'</div>' +
			'</div>'
		);  	
  }
	else {
		$('label[for=sale]').text("Il prodotto non è scontato");
	  $("#saleInfo").remove()
  } 
  calculateTotal()
}

//prezzo giornaliero
$('#dailySale').change(changeDailySale)

function changeDailySale() {
	if ($('#dailySale').is(":checked")) {
		$('label[for=dailySale]').text("Il prodotto è scontato");
		$("#dayliSaleRow").append(
			'<div id="dailySaleInfo" class="mt-2">' +
				'<div class="row">' +
						'<div class="col-3"><p> Tipo di sconto:</p></div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" aria-label="Sconto percentuale, seleziona uno dei due"  name="flexRadioDefault1" id="dailyPercentage" required>' +
								'<label class="form-check-label" for="dailyPercentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" aria-label="Sconto fisso, seleziona uno dei due" name="flexRadioDefault1" id="dailyFlat" required>' +
								'<label class="form-check-label" for="dailyFlat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step=".01" id="dailySaleValue" onkeyup="calculateTotal()" aria-label="Valore sconto prezzo giornaliero. Campo obbligatorio" required>' +
					'</div>' +
				'</div>' +
				'<div class="row mt-2">'+
					'<div class="col-3">Giorni per sconto:</div>' +
					'<div class="col-9">' +
						'<input type="number" min="1" step="1" class="form-control"  id="daysCount" onkeyup="calculateTotal()" aria-label="Numero giorni da supera per ottenere sconto sul prezzo giornaliero. Campo obbligatorio" required>' +
					'</div>'+
				'</div>'+
			'</div>'
		);  	
  }
	else {
		$('label[for=dailySale]').text("Il prodotto non è scontato");
	  $("#dailySaleInfo").remove()
  }
  calculateTotal() 
}

document.addEventListener('click',function(e){
  if(e.target && (e.target.id== 'dailyFlat' || e.target.id== 'dailyPercentage' || e.target.id== 'percentage' || e.target.id== 'flat')){
      calculateTotal()
   }
});

function calculateTotal(){
  if ($('#bookingRange').val()!= ''){
    let dateRange = $("#bookingRange").val()
    dateRange = dateRange.replace(/ /g, "")
    dateRange = dateRange.split("-")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("/")
    date2 = date2.split("/")

    let start = new Date(date1[2] , date1[1] -1, date1[0])
    let end = new Date(date2[2], date2[1]-1, date2[0])
    const diffTime = Math.abs(end - start);
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

    let addendum1, addendum2


    if($('#sale').is(":checked") == true){
      if($('#percentage').is(":checked") == true)
        addendum1 = $('#fixedPrice').val()  - $('#fixedPrice').val() * $('#saleValue').val() /100
      else
        addendum1 = $('#fixedPrice').val() - $('#saleValue').val()
    }
    else{
      addendum1 = $('#fixedPrice').val()
    }
    if( $('#dailySale').is(":checked") == true && $('#daysCount').val() != '' && days > $('#daysCount').val() ){
      if($('#dailyPercentage').is(":checked") == true)
        addendum2 = $('#dailyPrice').val() * days - $('#dailyPrice').val() * days * $('#dailySaleValue').val() / 100
      else
        addendum2 =  $('#dailyPrice').val() * days - $('#dailySaleValue').val()
    }
    else{
      addendum2 = $('#dailyPrice').val() * days
    }
    console.log(start +'-'+ end +'-'+ addendum1 +'-'+ addendum2)
    let total = parseFloat((parseFloat(addendum1) +parseFloat(addendum2)).toFixed(2))
    $('#newTotal').val(total) 
    if($('#newTotal').val() <= 0){
      $('#save').prop('disabled', true);
    }
    else{
      $('#save').prop('disabled', false);
    } 
  }
}

function readOnly(){
  if(!boolModify){
    $("form :input").each(function(){ 
      $(this).prop("disabled", true);
    });
    //impedisce la disabilitazione del bottone modifica
    $("#edit").prop("disabled", false)

    $('label[for=bookingRange]').text('Periodo prenotazione*');
    
  }
  else{ 
    var today = new Date();
    var start = new Date(dateBeginnig[2], dateBeginnig[1] -1, dateBeginnig[0])
    if(today > start){
      $("#delete").prop("disabled", true)
      $("#rentalOccurred").prop("disabled", false);
      $("#returned").prop("disabled", false);
    }
    else {
      $("form :input").each(function(){
        $(this).prop("disabled", false);
      });
      console.log(article.available)
      $("#bookingRequest").prop("readonly", true);
      $("#bookingRange").prop("disabled", false);
      $("#bookingRange").prop("readonly", false);
      if(!article.available){
        $("#bookingRange").prop("readonly", true);
        $('label[for=bookingRange]').text('Non disponibile in periodo diverso');
      } 
    }
  }
}

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'reset'){
    reset()
   }
});

function reset(){
  $("#myButtons").empty()
  $("#myButtons").append(
  '<button type="button" id="edit" class="btn btn-lg btn-secondary" onclick="modify()" aria-label="Bottone modifica. Abilita la modifica della pagina. Se la prenotazione è attiva sarà possibile modificare solo i campi riguardanti la consegna e la restituzione">Modifica</button>'
  )
  boolModify = false
  $("#saleInfo").remove()
  $("#dailySaleInfo").remove()
  fill()
  readOnly()
  
}

$('#formId').submit(function (evt) {
  evt.preventDefault();
  save()
});

function save(){
  console.log(dateBeginnig[0] + dateBeginnig[1] + dateBeginnig[2])
  console.log(dateFinish[0] + dateFinish[1] + dateFinish[2])

  if(data.startDate.day != dateBeginnig[0] || data.startDate.month != dateBeginnig[1] || data.startDate.year != dateBeginnig[2] ||
    data.endDate.day != dateFinish[0] || data.endDate.month != dateFinish[1] || data.endDate.year != dateFinish[2] || $('#newTotal').val() != data.totalPrice){

    let reservations = []
    reservations = article.bookings
    for(let i in reservations){
      if(data._id == reservations[i].reservationId){
        reservations[i].startDate.day = parseInt(dateBeginnig[0])
        reservations[i].startDate.month = parseInt(dateBeginnig[1])
        reservations[i].startDate.year = parseInt(dateBeginnig[2])
        reservations[i].endDate.day = parseInt(dateFinish[0])
        reservations[i].endDate.month = parseInt(dateFinish[1])
        reservations[i].endDate.year = parseInt(dateFinish[2])
        reservations[i].total = parseFloat($('#newTotal').val())
      }
    }
    $.ajax({
      url:"/api/product?id=" + data.productId,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        bookings : reservations     
      }),
      success: () => {
        console.log("prenotazione modificata")
      },
      error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
      }
    }); 
  }

  let sale, type, value
  if($("#sale").is(':checked') == true){
    sale = true 
    type = ($("#flat").is(':checked') == true) ? false : true
    value = $("#saleValue").val() 
  }
  else{
    sale = false 
    type = false
    value = 0
  }

  let dailySale, dailyType, dailyValue, dailyDays
  if($("#dailySale").is(':checked') == true){
    dailySale = true 
    dailyType = ($("#dailyFlat").is(':checked') == true) ? false : true
    dailyValue = $("#dailySaleValue").val() 
    dailyDays = $("#daysCount").val()
  }
  else{
    dailySale = false 
    dailyType = false
    dailyValue = 0
    dailyDays = 0
  }

  $.ajax({
    url:"/api/reservation?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      fixedPrice: parseFloat($("#fixedPrice").val()),
      variablePrice: parseFloat($("#dailyPrice").val()),
      totalPrice: parseFloat($("#newTotal").val()),

      fixedDiscount: {
        onSale: sale,
        onSaleType: type,
        onSaleValue: parseFloat(value)
      },
      variableDiscount: {
        days: parseInt(dailyDays),
        onSale: dailySale,
        onSaleType: dailyType,
        onSaleValue: parseFloat(dailyValue)
      },
      
      startDate:{
        day: parseInt(dateBeginnig[0]),
        month: parseInt(dateBeginnig[1]),
        year: parseInt(dateBeginnig[2]),
      },
      endDate:{
        day: parseInt(dateFinish[0]),
        month: parseInt(dateFinish[1]),
        year: parseInt(dateFinish[2]),
      },
      isTaken : $('#rentalOccurred').is(":checked") ? true : false,
      isReturned : $('#returned').is(":checked") ? true : false,
      description : $("#notes").val(),
      note : $("#privateNotes").val()

    }),
    // Risposta del server in caso di successo
    success: (result) => {
      console.log(result)
      data.fixedPrice = $("#fixedPrice").val()
      data.variablePrice = $("#dailyPrice").val()
      data.totalPrice = $("#newTotal").val()
      
      data.fixedDiscount.onSale = sale
      data.fixedDiscount.onSaleType = type
      data.fixedDiscount.onSaleValue = value

      data.variableDiscount.onSale = dailySale
      data.variableDiscount.onSaleType = dailyType
      data.variableDiscount.onSaleValue = dailyValue
      data.variableDiscount.days = dailyDays

      data.startDate.day = dateBeginnig[0]
      data.startDate.month = dateBeginnig[1]
      data.startDate.year = dateBeginnig[2]
      data.endDate.day = dateFinish[0]
      data.endDate.month = dateFinish[1]
      data.endDate.year = dateFinish[2]
      data.isTaken = $('#rentalOccurred').is(":checked") ? true : false
      data.isReturned = $('#returned').is(":checked") ? true : false
      data.description = $("#notes").val()
      data.note = $("#privateNotes").val()

      boolModify = false
      reset()
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
  }); 
   
}



function remove(){
  let reservations = []
  reservations = article.bookings
  for (let i in reservations){
    if(reservations[i].reservationId == data._id){
      reservations.splice(i,1)
    }
  }
  console.log(reservations)

  $.ajax({
    url:"/api/product?id=" + data.productId,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      bookings : reservations     
    }),
    success: () => {
      $.ajax({
        url: "/api/reservation?id=" + data._id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: () => {
          window.location = "http://localhost:8081/worker/navbar.html?";
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
          console.log("Error");
          alert("Errore. " + error.responseText);
        }
      });
    },
    error: (error) => {
      console.log("Error");
      alert("Errore. " + error.responseText);
    }
  });  
}

/////////////////////////////////
////////////////////////////////////
//////////////////////////////////
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'searchButton'){
    $("#main").empty()
  }
});