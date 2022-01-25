let data = {}
var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()

window.onload = function getProduct() {
  
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
					console.log(data)
          $("#articleId").val(id + " " + data.title + " " + data.brand) 
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
            console.log("Error");
            alert("Pagina non disponibile o inesistente");
						window.location = "http://localhost:8081/worker/navbar.html?";
        }
    });
}

$(document).ready(function(){
  $( "#dateRange" ).daterangepicker({    
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
    autoUpdateInput: false,
    showDropdowns: true, 
    isInvalidDate: function(date){
      for (let i in data.bookings) {								
          var from = new Date(data.bookings[i].startDate.month +'-'+data.bookings[i].startDate.day+'-'+data.bookings[i].startDate.year );
          var to = new Date(data.bookings[i].endDate.month +'-'+data.bookings[i].endDate.day+'-'+data.bookings[i].endDate.year);
          var current = new Date(date);					
          if (current >= from && current <= to) return true;
      }
    return false
    } 
  });
})

$('#dateRange').on('apply.daterangepicker', function(ev, picker) {
  $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('#dateRange').on('apply.daterangepicker', function(ev, picker) {
  let block = false
  let dateRange = $(this).val()
  dateRange = dateRange.replace(/ /g, "")
  dateRange = dateRange.split("-")
  let date1 = dateRange[0]
  let date2 = dateRange[1]
  date1 = date1.split("/")
  date2 = date2.split("/")
  date1 = date1[2] * 10000  + date1[1] * 100 + date1[0]
  date2 = date2[2] * 10000  + date2[1] * 100 + date2[0]
  for(let i in data.bookings){
    bookingStart = data.bookings[i].startDate.year * 10000 + data.bookings[i].startDate.month * 100 + data.bookings[i].startDate.day
    bookingEnd = data.bookings[i].endDate.year * 10000 + data.bookings[i].endDate.month * 100 + data.bookings[i].endDate.day
    if( date1 < bookingStart && bookingEnd < date2 )
     block = true
  }
  console.log('changed');
  console.log(block)
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
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="percentage" required>' +
								'<label class="form-check-label" for="percentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="flat" required>' +
								'<label class="form-check-label" for="flat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step="1" id="saleValue" onkeyup="calculateTotal()" aria-label="saleValue" aria-describedby="basic-addon6" required>' +
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
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="dailyPercentage" required>' +
								'<label class="form-check-label" for="dailyPercentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="dailyFlat" required>' +
								'<label class="form-check-label" for="dailyFlat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step="1" id="dailySaleValue" onkeyup="calculateTotal()" aria-label="saleValue" aria-describedby="basic-addon6" required>' +
					'</div>' +
				'</div>' +
				'<div class="row mt-2">'+
					'<div class="col-3">Giorni per sconto:</div>' +
					'<div class="col-9">' +
						'<input type="number" class="form-control"  id="daysCount" onkeyup="calculateTotal()" aria-label="SalePrice" aria-describedby="basic-addon6" required>' +
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
    dateRange = dateRange.replace(/ /g, "")
    dateRange = dateRange.split("-")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("/")
    date2 = date2.split("/")

    let start = date1[2] * 10000 + date1[1] * 100 + date1[0]
    let end = date2[2] * 10000 + date2[1] * 100 + date2[0]
    let days = end - start + 1
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
    $('#newTotal').val(parseInt(addendum1) + parseInt(addendum2))  
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
  console.log("preventDefault")
  save()
});

function save(){
    let dateRange = $("#dateRange").val()
    dateRange = dateRange.replace(/ /g, "")
    dateRange = dateRange.split("-")
    let date1 = dateRange[0]
    let date2 = dateRange[1]
    date1 = date1.split("/")
    date2 = date2.split("/")
    console.log(date1)
    let dayStart = date1[0]
    let monthStart = date1[1]
    let yearStart = date1[2]
    let dayEnd = date2[0]
    let monthEnd = date2[1]
    let yearEnd = date2[2] 
    let today = year*10000+month*100+day
    let start = parseInt(yearStart)*10000+parseInt(monthStart)*100+parseInt(dayStart)

    if(today > start){
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
      value = ""
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
      dailyValue = ""
      dailyDays = ""
    }

    $.ajax({
      url:"/api/user?email=" + $("#email").val(),
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
          console.log(result)
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
              day: day,
              month: month,
              year: year  
            },
            startDate: {
              day: dayStart,
              month: monthStart,
              year: yearStart
            },
            endDate: {
              day: dayEnd,
              month: monthEnd,
              year: yearEnd 
            }, 
            isTaken: false,
            isReturned: false,
            fixedPrice:  $("#fixedPrice").val(),
            fixedDiscount: {
              onSale: sale,
              onSaleType: type,
              onSaleValue: value
            },
            variablePrice:  $("#dailyPrice").val(),
            variableDiscount: {
              days: dailySale,
              onSale: dailyType,
              onSaleType: dailyValue,
              onSaleValue: dailyDays
            },
            totalPrice: $("#newTotal").val(),
            description:  $("#notes").val(),
            note: $("#privateNotes").val(),
          }),
          // Risposta del server in caso di successo
          success: (result) => {
            console.log(result)
            //aggiornamento article
            let reservations = []
            reservations = data.bookings
            let newBooking = {}
            newBooking.productId = data._id
            newBooking.clientId = user.email
            newBooking.reservationId = result.data._id
            newBooking.total  = $("#newTotal").val()
            newBooking.startDate = {}
            newBooking.startDate.day = dayStart
            newBooking.startDate.month = monthStart
            newBooking.startDate.year = yearStart
            newBooking.endDate = {}
            newBooking.endDate.day = dayEnd
            newBooking.endDate.month = monthEnd
            newBooking.endDate.year = yearEnd
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
              location.reload(true);
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
              alert("Errore. " + error.responseText);
          }
          }); 
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
          console.log("Error");
          alert("La mail non esiste");
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