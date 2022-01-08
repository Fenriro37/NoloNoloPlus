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
          $("#price").val(data.price)       
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
    minDate: day+'/'+month+'/'+year,
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

function check(){
  console.log("smigle")
}

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
            isTaken: $("#rentalOccurred").is(':checked') ? true  : false,
            isReturned: $("#returned").is(':checked') ? true  : false,
            price:  $("#price").val(),
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
          alert("Errore. " + error.responseText);
      }
    });   
}