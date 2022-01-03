let data = {}
let editable

window.onload = function getClient() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('=') + 1);
  console.log(id)
  let customUrl = "/api/reservation?id=" + id
  $.ajax({
      url: customUrl,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        data = result.data.obj
        console.log(data)
        let today = new Date().toISOString().slice(0, 10)
        let start = data.startDate.year +'-'+ data.startDate.month +'-'+ data.startDate.day
        editable = (today >= start) ? false : true
        console.log("today >= start")
        console.log("today " + today)
        console.log("startDate " + start)
        console.log(editable)
        insertData()

          
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
    '<p><a href="article.html?id=' +data.productId+ '">' +data.productTitle + " " + data.productBrand + '</a></p>' +
    '<p><a href="client.html?mail=' +data.clientEmail+ '">' +data.clientEmail+ '</a></p>' 
  )
  if(editable){
    $("#formButtons").append(
    '<button type="button" id="delete" class="btn btn-lg btn-danger delete" onclick="remove()">Elimina prenotazione</button>'
    )}

  fill()
} 

function fill(){
  $("#price").attr("placeholder", data.price);
  $("#price").val(data.price);

  $("#bookingRequest").attr("placeholder", data.bookingDate.year +'-'+ data.bookingDate.month +'-'+ data.bookingDate.day);
  $("#bookingRequest").val( data.bookingDate.year +'-'+ data.bookingDate.month +'-'+ data.bookingDate.day);

  $("#bookingStart").attr("placeholder", data.startDate.year +'-'+ data.startDate.month +'-'+ data.startDate.day);
  $("#bookingStart").val( data.startDate.year +'-'+ data.startDate.month +'-'+ data.startDate.day);  

  $("#bookingEnd").attr("placeholder", data.endDate.year +'-'+ data.endDate.month +'-'+ data.endDate.day);
  $("#bookingEnd").val( data.endDate.year +'-'+ data.endDate.month +'-'+ data.endDate.day);

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

  var button = document.getElementById("myButton");
  button.style.visibility = "hidden"
  boolModify = true
  readOnly()
  document.getElementById("formButtons").style.visibility  = "visible" 
}

function readOnly(){
  console.log("readOnly")
  if(!boolModify){
    $("form :input").each(function(){
      $(this).prop("readonly", true); 
      $(this).prop("disabled", true);
    });
  }
  else{ 
    $("form :input").each(function(){
      if(editable){
        $(this).prop("readonly", false); 
      }
      $(this).prop("disabled", false);
    });
    $("#bookingRequest").prop("readonly", true);
    
  }
}

document.getElementById("reset").addEventListener("click", reset);

function reset(){
  console.log('reset')
  boolModify = false
  fill()
  readOnly()
  document.getElementById("formButtons").style.visibility  = "hidden" 
  document.getElementById("myButton").style.visibility = "visible"
}

$('#formId').submit(function (evt) {
  evt.preventDefault();
  save()
});

function save(){
  //annullare i giorni non validi
  alert("save")
  let dateModified = false
  let dateStart = $("#bookingStart").val()
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
  } 
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
