let data = {}
var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()
let isTaken = false

window.onload = function login() {
  //console.log("Cookie");  
  $.ajax({
      url: "/api/public/auth",
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        //console.log(result)
        if(result.obj !== 1){
            window.location = site202131Url + "/public/login.html";
        }
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('=') + 1);
        $.ajax({
          url: "/api/product/?id=" + id,
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          // Risposta del server in caso di successo
          success: (result) => {
            data = result.data.obj
            //console.log(data)
            $("#articleId").val(id) 
            $("#fixedPrice").val(data.fixedPrice) 
            $("#dailyPrice").val(data.price)      
            if(data.discount.onSale){
              $('#sale').prop('checked', true);
              changeSale()
              $("#saleValue").val(data.discount.onSaleValue);
              $("#saleValue").attr("placeholder", data.discount.onSaleValue);
              if(data.discount.onSaleType)
                $('#percentage').prop('checked', true);
              
              else 
                $('#flat').prop('checked', true);
            }
            if(data.overDays.onSale){
              $('#dailySale').prop('checked', true);
              changeDailySale()
              $("#dailySaleValue").val(data.overDays.onSaleValue);
              $("#dailySaleValue").attr("placeholder", data.overDays.onSaleValue);
              $("#daysCount").val(data.overDays.days);
              $("#daysCount").attr("placeholder", data.overDays.days);
              if(data.overDays.onSaleType)
                $('#dailyPercentage').prop('checked', true);
              
              else 
                $('#dailyFlat').prop('checked', true);
            }
          },
          // Risposta del server in caso di insuccesso
          error: (error) => {
              //console.log("Error");
              alert("Pagina non disponibile o inesistente");
              window.location = site202131Url +"/worker/navbar.html?";
          }
        });  
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
        window.location = site202131Url + "/public/login.html";
      }
  });
}
  

$(document).ready(function(){
  $( "#dateRange" ).daterangepicker({    
    "locale": {
      "format": "DD-MM-YYYY",
      "separator": " ",
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
    autoUpdateInput: false,
    showDropdowns: true, 
    isInvalidDate: function(date){
      for (let i in data.bookings) {								
          var from = new Date(data.bookings[i].startDate.year, data.bookings[i].startDate.month-1,data.bookings[i].startDate.day );
          var to = new Date(data.bookings[i].endDate.year, data.bookings[i].endDate.month-1,data.bookings[i].endDate.day);
          var current = new Date(date);					
          if (current >= from && current <= to) return true;
      }
    return false
    } 
  });
})

$('#dateRange').on('apply.daterangepicker', function(ev, picker) {
  $(this).val(picker.startDate.format('DD-MM-YYYY') + ' ' + picker.endDate.format('DD-MM-YYYY'));
});

$('#dateRange').on('apply.daterangepicker', function(ev, picker) {
  let dateRange = $(this).val()
  //dateRange = dateRange.replace(/ /g, "")
  dateRange = dateRange.split(" ")
  let date1 = dateRange[0]
  let date2 = dateRange[1]
  date1 = date1.split("-")
  date2 = date2.split("-")
  let d1 = new Date(date1[2], date1[1] -1, date1[0], 0, 0, 0)
  let d2 = new Date(date2[2], date2[1] -1, date2[0], 23, 59, 59)

  for(let i in data.bookings){
    bookingStart = new Date(data.bookings[i].startDate.year, data.bookings[i].startDate.month-1, data.bookings[i].startDate.day)
    bookingEnd = new Date(data.bookings[i].endDate.year, data.bookings[i].endDate.month-1, data.bookings[i].endDate.day)
    if( d1 < bookingStart && bookingEnd < d2){
      $("#dateRange").val('')
      $('#returned').prop('disabled', true);
      isTaken = false
    }
  }
  let current = new Date()

  //se prenotazione completamente nel passato isTaken è vero
  //altrimenti posso modificare da manager
  if(current > d2 && $("#dateRange").val() != ''){
    $('#returned').prop('disabled', false);
    isTaken = true
  }
  else{
    $('#returned').prop('disabled', true);
    isTaken = false
  }

  calculateTotal()
});

$('#dateRange').focusout(() => {
  console.log($('#dateRange').val())
  if(checkRangeDatePicker($('#dateRange').val())){
    // Check range
    let dateRange = $('#dateRange').val()
    dateRange = dateRange.split(" ")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("-")
    date2 = date2.split("-")
    let d1 = new Date(date1[2], date1[1] -1, date1[0], 0, 0, 0)
    let d2 = new Date(date2[2], date2[1] -1, date2[0], 23, 59, 59)

    for(let i in data.bookings){
      bookingStart = new Date(data.bookings[i].startDate.year, data.bookings[i].startDate.month-1, data.bookings[i].startDate.day, 0, 0, 0)
      bookingEnd = new Date(data.bookings[i].endDate.year, data.bookings[i].endDate.month-1, data.bookings[i].endDate.day, 23, 59, 59)
      if(d1 < bookingStart && bookingEnd < d2 || (bookingStart <= d1 && d1 <= bookingEnd) || (bookingStart <= d2 && d2 <= bookingEnd)){
        $("#dateRange").val('')
      }
    }
    if(checkDateIsPast($('#dateRange').val()) === true) {
      // Enable check
      $('#returned').prop('disabled', false)
    } else {
      // Disable check
      $('#returned').prop('disabled', true)
    }
  }
  else{
    $("#dateRange").val('')
  }

})

//prezzo fisso
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
								'<input class="form-check-input" type="radio" aria-label="Sconto percentuale, seleziona uno dei due" name="flexRadioDefault" id="percentage" required>' +
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
								'<input class="form-check-input" type="radio" aria-label="Sconto percentuale, seleziona uno dei due" name="flexRadioDefault1" id="dailyPercentage" required>' +
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
					'<input type="number" class="form-control" min="1" step=".01" id="dailySaleValue" onkeyup="calculateTotal()" aria-label="Valore sconto prezzo giornaliero. Campo obbligatorio"  required>' +
					'</div>' +
				'</div>' +
				'<div class="row mt-2">'+
					'<div class="col-3">Giorni per sconto:</div>' +
					'<div class="col-9">' +
						'<input type="number" class="form-control" min="1" step="1"  id="daysCount" onkeyup="calculateTotal()" aria-label="Numero giorni da supera per ottenere sconto sul prezzo giornaliero. Campo obbligatorio" required>' +
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
  if ($('#dateRange').val()!= ''){
    let dateRange = $("#dateRange").val()
    //dateRange = dateRange.replace(/ /g, "")
    dateRange = dateRange.split(" ")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("-")
    //console.log(date1[1])
    date2 = date2.split("-")

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

    let total = parseFloat((parseFloat(addendum1) +parseFloat(addendum2)).toFixed(2))
    $('#newTotal').val(total)  
    if($('#newTotal').val() <= 0){
      $('#save').prop('disabled', true);
      let total = document.getElementById('newTotal');
			total.ariaLabel = 'Nuovo totale scontato: Sola lettura Se negativo non sarà possibile aggiungere il prodotto al catalogo'
    }
    else{
      $('#save').prop('disabled', false);
    } 
  }
}

$("#clear").click(reset)


function reset(){
  $("input").each(function(){
    //console.log($(this).attr('id') != "articleId")
    if($(this).attr('id') != "articleId")
      $(this).val("")
    if($(this).is(':checkbox'))
      $(this).prop('checked', false);
  });
}

$('#formId').submit(function (evt) {
  evt.preventDefault();
  //console.log("preventDefault")
  save()
});

function save(){
    let dateRange = $("#dateRange").val()

    $('#save').prop('disabled', true);
    $('#clear').prop('disabled', true);

    //dateRange = dateRange.replace(/ /g, "")
    dateRange = dateRange.split(" ")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("-")
    date2 = date2.split("-")
    let dayStart = date1[0]
    let monthStart = date1[1]
    let yearStart = date1[2]
    let dayEnd = date2[0]
    let monthEnd = date2[1]
    let yearEnd = date2[2] 


    let start = new Date(yearStart,monthStart-1, dayStart)

    if(currentDate >= start){
      day = dayStart
      month = monthStart 
      year = yearStart
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

    let isReturned = ($('#returned').is(":checked") == true) ? true : false

    $.ajax({
      url:"/api/user?email=" + $("#email").val(),
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
          //(result)
          let user = result.data
          $.ajax({
          url:"/api/reservation",
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          data: JSON.stringify({
            productId: data._id,
            productTitle: data.title,
            productBrand: data.brand,
            productImage: data.image,
            clientEmail: user.email,
            clientName: user.userName,
            clientSurname: user.userSurname,
            bookingDate: {
              day: parseInt(day),
              month: parseInt(month),
              year: parseInt(year)  
            },
            startDate: {
              day: parseInt(dayStart),
              month: parseInt(monthStart),
              year: parseInt(yearStart)
            },
            endDate: {
              day: parseInt(dayEnd),
              month: parseInt(monthEnd),
              year: parseInt(yearEnd) 
            }, 
            isTaken: isTaken,
            isReturned: isReturned,
            fixedPrice: parseFloat($("#fixedPrice").val()),
            fixedDiscount: {
              onSale: sale,
              onSaleType: type,
              onSaleValue: parseFloat(value)
            },
            variablePrice:  parseFloat($("#dailyPrice").val()),
            variableDiscount: {
              days: parseInt(dailyDays),
              onSale: dailySale,
              onSaleType: dailyType ,
              onSaleValue: parseFloat(dailyValue)
            },
            totalPrice: parseFloat($("#newTotal").val()),
            description:  $("#notes").val(),
            note: $("#privateNotes").val(),
          }),
          // Risposta del server in caso di successo
          success: (result) => {
            //console.log(result)
            //aggiornamento article
            let reservations = []
            reservations = data.bookings
            let newBooking = {}
            newBooking.productId = data._id
            newBooking.clientId = user.email
            newBooking.reservationId = result.data._id
            newBooking.total  = parseFloat($("#newTotal").val())
            newBooking.startDate = {}
            newBooking.startDate.day = parseInt(dayStart)
            newBooking.startDate.month = parseInt(monthStart)
            newBooking.startDate.year = parseInt(yearStart)
            newBooking.endDate = {}
            newBooking.endDate.day = parseInt(dayEnd)
            newBooking.endDate.month = parseInt(monthEnd)
            newBooking.endDate.year = parseInt(yearEnd)
            reservations.push(newBooking)
            $.ajax({
            url:"/api/product/?id=" + data._id,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
              bookings: reservations
            }),
            // Risposta del server in caso di successo
            success: (result) => {
              alert("Prenotazione creata")
              location.reload(false);
            },
            // Risposta del server in caso di insuccesso
            error: (error) => {
                console.log("Errore nell'invio dei dati");
                alert("Errore nell'invio dei dati");
                $('#save').prop('disabled', false);
                $('#clear').prop('disabled', false);
            }
            }); 
              
          },
          // Risposta del server in caso di insuccesso
          error: (error) => {
              console.log("Errore nell'invio dei dati");
              alert("Errore nell'invio dei dati ");
              $('#save').prop('disabled', false);
              $('#clear').prop('disabled', false);
            }
          }); 
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
          console.log("Error");
          alert("La mail non esiste");
          $('#save').prop('disabled', false);
          $('#clear').prop('disabled', false);
      }
    });
}


document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'searchButton'){
    $("#main").empty()
  }
});
/////////////////////////////////
////////////////////////////////////
//////////////////////////////////

daysInMonth = [
  0, // Per comodità
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

// Controlla se una stringa è un intero positivo
function isPositiveInteger(n) { return n >>> 0 === parseFloat(n) }

// Controlla se una stringa ha uno (o più) spazi bianchi
function hasWhiteSpace(x) { return x.indexOf(' ') >= 0 }

// Controlla se la stringa passata è una data
// La stringa dev'essere del seguente formato: GG-MM-YYYY
// Se ci sono più date (massimo 2) le due date devono essere separate da uno spazio vuoto
// La funzione ritorna true se va bene, altrimenti false
function checkRangeDatePicker(datesAsString) {
  try {
    const datesArray = datesAsString.split(' ');
    var dateValue
    var index
    if(datesArray.length > 2) {
      return false
    }
    for(index in datesArray) {
      dateValue = datesArray[index].split('-')
      // Controllo della lunghezza degli elementi
      if(dateValue.length != 3) {
        return false
      }
      // Controllo che gli elementi non abbiamo spazi bianchi
      if(hasWhiteSpace(dateValue[0]) || hasWhiteSpace(dateValue[1]) || hasWhiteSpace(dateValue[2])) {
        return false
      }
      // Controllo del tipo degli elementi
      if(!isPositiveInteger(dateValue[0]) || !isPositiveInteger(dateValue[1]) || !isPositiveInteger(dateValue[2])) {
        return false
      }
      // Controllo dei valori minimi degli elementi
      if(dateValue[1] > 12 || dateValue[0] < 1) {
        return false
      }
      // Controllo dei valori massimi degli elementi
      if(dateValue[2] % 4 == 0) {
        daysInMonth[2] = 29
      }
      if(dateValue[0] > daysInMonth[dateValue[1]]) {
        return false
      }
      // Controllo del formato dei giorni e mesi
      if(dateValue[0].length != 2 && dateValue[1].length != 2 && dateValue[2].length != 4) {
        return false
      }
    }
    return true
  } catch {
    return false
  }
}

// Get date-pick-range by ID (using jQuery)
function checkDateIsPast(value) {
  if(checkRangeDatePicker(value) === true) {
    const startDateAsString = value.split(' ')[0];
    const startDateAsArray = startDateAsString.split('-');
    const startDate = new Date(startDateAsArray[2], startDateAsArray[1] - 1, startDateAsArray[0]);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
    if(startDate < today) {
      return true;
    } else {
      return false;
    }
  }
}
