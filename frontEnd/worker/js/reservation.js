let data = {}
let article = {}
let editable
let boolModify

window.onload = function getClient() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('=') + 1);
  console.log(id)
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
        alert("Errore. " + error.responseText);
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
  console.log("modify")

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
          var from = new Date(article.bookings[i].startDate.month +'-'+article.bookings[i].startDate.day+'-'+article.bookings[i].startDate.year );
          var to = new Date(article.bookings[i].endDate.month +'-'+article.bookings[i].endDate.day+'-'+article.bookings[i].endDate.year);
          var current = new Date(date);					
          if (current >= from && current <= to) return true;
      }
    return false
    }  
  });

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
  date1 = date1[2] * 10000  + date1[1] * 100 + date1[0]
  date2 = date2[2] * 10000  + date2[1] * 100 + date2[0]
  for(let i in article.bookings){
    bookingStart = article.bookings[i].startDate.year * 10000 + article.bookings[i].startDate.month * 100 + article.bookings[i].startDate.day
    bookingEnd = article.bookings[i].endDate.year * 10000 + article.bookings[i].endDate.month * 100 + article.bookings[i].endDate.day
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
  console.log("readOnly")
  if(!boolModify){
    $("form :input").each(function(){
      $(this).prop("readonly", true); 
      $(this).prop("disabled", true);
    });
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
  console.log('reset')
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
  //annullare i giorni non validi
  alert("save")
 /*  let dateModified = false
  console.log(dateStart)
  let dayStart, monthStart, yearStart
  //se non hai modificato la data la tiene nel formato dd/mm/yyyy
  if(dateStart == data.startDate.year+'-'+data.startDate.month+'-'+data.startDate.day){
    dayStart = data.startDate.day
    monthStart = data.startDate.month
    yearStart = data.startDate.year
  }
  //se la modifichi è nel formato yyyy/mm/dd
  else{
    dateStart = dateStart.split('-')
    dateModified = true
    dayStart = dateStart[2]
    monthStart = dateStart[1]
    yearStart = dateStart[0]
  } 
  //controllare se le due date sono state modificate se sì fare le due chiamate ajax riinserire i dati
  let dateEnd = $("#bookingEnd").val()
  let dayEnd, monthEnd, yearEnd
  if(dateEnd == data.endDate.year +'-'+  data.endDate.month +'-'+  data.endDate.day){
    dayEnd = data.endDate.day
    monthEnd = data.endDate.month
    yearEnd = data.endDate.year
  }
  //se la modifichi è nel formato yyyy/mm/dd
  else{
    dateModified = true
    dateEnd = dateEnd.split('-')
    dayEnd = dateEnd[2]
    monthEnd = dateEnd[1]
    yearEnd = dateEnd[0]
  }  */

/*   $.ajax({
    url:"/api/reservation?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      price : $("#price").val(),
      startDate:{
        day: dayStart,
        month: monthStart,
        year: yearStart,
      },
      endDate:{
        day: dayEnd,
        month: monthEnd,
        year: yearEnd,
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
      data.startDate.day = dayStart
      data.startDate.month = monthStart
      data.startDate.year = yearStart
      data.endDate.day = dayEnd
      data.endDate.month = monthEnd
      data.endDate.year = yearEnd
      data.isTaken = $('#rentalOccurred').is(":checked") ? true : false
      data.isReturned = $('#returned').is(":checked") ? true : false
      data.description = $("#notes").val()
      data.note = $("#privateNotes").val()
      alert("modifica riuscita")
      reset()
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	}); 
  //se abbiamo modificato le date modifichiamo anche la prenotazione sul prodotto
  if(editable){
    let article = {}
    $.ajax({
      url:"/api/product?id=" + data.productId,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      success: (result) => {
        article = result.data.obj.bookings
        console.log(article)
        for (let i in article){
          if(article[i].reservationId == data._id){
            article[i].startDate.day = dayStart
            article[i].startDate.month = monthStart
            article[i].startDate.year = yearStart
            article[i].endDate.day = dayEnd
            article[i].endDate.month = monthEnd
            article[i].endDate.year = yearEnd
          }
        }
        $.ajax({
          url:"/api/product?id=" + data.productId,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            bookings : article     
          }),
          success: (result) => {
            console.log(article)
          },
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
  }*/
}

function remove(){
/*   $.ajax({
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
  }); */


  $.ajax({
    url:"/api/product?id=" + data.productId,
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    success: (result) => {
      let article = {}
      article = result.data.obj.bookings
      console.log(result.data.obj)
      for (let i in article){
        if(article[i].reservationId == data._id){
          article.splice(i,1)
        }
      }
      console.log(article)
      /* $.ajax({
        url:"/api/product?id=" + data.productId,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          bookings : article     
        }),
        success: (result) => {
          console.log(article)
        },
        error: (error) => {
          console.log("Error");
          alert("Errore. " + error.responseText);
        }
      }); */
    },
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
  });
}
