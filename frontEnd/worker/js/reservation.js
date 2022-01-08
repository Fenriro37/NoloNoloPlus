let data = {}
let article = {}
let editable
let boolModify

//serve per inizializzare il datepickerRange. Se viene inizializzato più volte smette di funzionare
let firstTime = 0

let dateBeginnig = []
let dateFinish = []

window.onload = function getClient() {
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
        editable = (data.isTaken) ? false : true
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
    ' <img class="img-thumbnail" alt="immagine prodotto" src='+ data.productImage+'>'
  )
  $("#info").prepend(
    '<p>Id prenotazione: ' +data._id+ '</p>' +
    '<p>Articolo: <a href="article.html?id=' +data.productId+ '">' +data.productTitle + " " + data.productBrand + '</a></p>' +
    '<p>Email: <a href="client.html?mail=' +data.clientEmail+ '">' +data.clientEmail+ '</a></p>' 
  )
  fill()
} 

function fill(){
  $("#price").attr("placeholder", data.price);
  $("#price").val(data.price);

  $("#bookingRequest").val( data.bookingDate.day +'/'+ data.bookingDate.month +'/'+ data.bookingDate.year);

  $("#bookingRange").val( data.startDate.day +'/'+ data.startDate.month +'/'+ data.startDate.year + ' - ' + data.endDate.day +'/'+ data.endDate.month +'/'+ data.endDate.year);

  $("#notes").attr("placeholder", data.description);
  $("#notes").val(data.description);

  $("#privateNotes").attr("placeholder", data.note);
  $("#privateNotes").val(data.note);

  if(data.isTaken){
    $('#rentalOccurred').prop('checked', true);
  }
  else{
    $('#rentalOccurred').prop('checked', false);
  }
  if(data.isReturned){
    $('#returned').prop('checked', true);
  }
  else{
    $('#returned').prop('checked', false);
  }
}


function modify(){

  $("#myButtons").empty()
  $("#myButtons").append(
    '<button id="save" class="btn btn-lg btn-success">Salva</button>'+
    '<button type="button" id="reset" class="btn btn-lg btn-danger" >Annulla</button>' +
    '<button type="button" id="delete" class="btn btn-lg btn-danger delete" onclick="remove()">Elimina prenotazione</button>'
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
  console.log("-----------")
  console.log(dateRange)
  console.log("-----------")
  dateRange = dateRange.replace(/ /g, "")
  dateRange = dateRange.split("-")
  let date1 = dateRange[0]
  let date2 = dateRange[1]
  date1 = date1.split("/")
  date2 = date2.split("/")
  for(let i in date1){
    dateBeginnig[i] = date1[i]
  }
  for(let i in date2){
    dateFinish[i] = date2[i]
  }
  date1 = date1[2] * 10000  + date1[1] * 100 + date1[0]
  date2 = date2[2] * 10000  + date2[1] * 100 + date2[0]
  for(let i in article.bookings){
    if(data._id != article.bookings[i].reservationId){
      bookingStart = article.bookings[i].startDate.year * 10000 + article.bookings[i].startDate.month * 100 + article.bookings[i].startDate.day
      bookingEnd = article.bookings[i].endDate.year * 10000 + article.bookings[i].endDate.month * 100 + article.bookings[i].endDate.day
      if( date1 < bookingStart && bookingEnd < date2 )
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
});

$('#rentalOccurred').change(function() {
	if (this.checked) {
		//$('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
  }
	if (!this.checked) {
		//$('label[for=rentalOccurred]').text("Il prodotto non è stato ritirato");
    //$('label[for=returned]').text("Il prodotto non è stato restituito");
    $('#returned').prop('checked', false);
  } 
})

$('#returned').change(function() {
	if (this.checked) {
	  //$('label[for=returned]').text("Il prodotto è stato restituito");
    //$('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
    $('#rentalOccurred').prop('checked', true);
  }
	if (!this.checked) {
		//$('label[for=returned]').text("Il prodotto non è stato restituito");
  } 
})


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function readOnly(){
  if(!boolModify){
    $("form :input").each(function(){
      $(this).prop("readonly", true); 
      $(this).prop("disabled", true);
    });
    //impedisce la disabilitazione del bottone modifica
    $("#edit").prop("disabled", false)
    
  }
  else{ 
    $("form :input").each(function(){
    if(editable){
      $(this).prop("readonly", false); 
    }
      $(this).prop("disabled", false);
    });
    
    $("#bookingRequest").prop("readonly", true);
    
    if(data.available == false){
      $("#bookingRange").prop("readonly", true);
    }

    if(data.isTaken){
      $("#delete").prop("disabled", true)
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
  '<button type="button" id="edit" class="btn btn-lg btn-secondary" onclick="modify()">Modifica</button>'
  )
  boolModify = false
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
  console.log("----------------------------------")
  let boolDataChanged = false
  if(data.startDate.day != dateBeginnig[0] || data.startDate.month != dateBeginnig[1] || data.startDate.year != dateBeginnig[2] ||
    data.endDate.day != dateFinish[0] || data.endDate.month != dateFinish[1] || data.endDate.year != dateFinish[2]){
      boolDataChanged = true
  }
  if(boolDataChanged){
    // se abbiamo modificato le date modifichiamo anche la prenotazione sul prodotto
    $.ajax({
      url:"/api/reservation?id=" + data._id,
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify({
        price : $("#price").val(),
        startDate:{
          day: dateBeginnig[0],
          month: dateBeginnig[1],
          year: dateBeginnig[2],
        },
        endDate:{
          day: dateFinish[0],
          month: dateFinish[1],
          year: dateFinish[2],
        },
        isTaken : $('#rentalOccurred').is(":checked") ? true : false,
        isReturned : $('#returned').is(":checked") ? true : false,
        description : $("#notes").val(),
        note : $("#privateNotes").val()

      }),
      // Risposta del server in caso di successo
      success: (result) => {
        console.log(result)
        data.price = $("#price").val()
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
        
        let reservations = []
        reservations = article.bookings
        for(let i in reservations){
          if(data._id == reservations[i].reservationId){
            reservations[i].startDate.day = dateBeginnig[0]
            reservations[i].startDate.month = dateBeginnig[1]
            reservations[i].startDate.year = dateBeginnig[2]
            reservations[i].endDate.day = dateFinish[0]
            reservations[i].endDate.month = dateFinish[1]
            reservations[i].endDate.year = dateFinish[2]
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
            reset()
          },
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
  //se non abbiamo modificato le date
  else{
    $.ajax({
      url:"/api/reservation?id=" + data._id,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        price : $("#price").val(),
        isTaken : $('#rentalOccurred').is(":checked") ? true : false,
        isReturned : $('#returned').is(":checked") ? true : false,
        description : $("#notes").val(),
        note : $("#privateNotes").val() 
      }),
      success: () => {
        data.price = $("#price").val()
        data.isTaken = $('#rentalOccurred').is(":checked") ? true : false
        data.isReturned = $('#returned').is(":checked") ? true : false
        data.description = $("#notes").val()
        data.note = $("#privateNotes").val()
        console.log("prenotazione modificata")
        reset()
      },
      error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
      }
    });  
  }
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
