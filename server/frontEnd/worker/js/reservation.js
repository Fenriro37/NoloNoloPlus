let data = {}

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
        fill()

          
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
      }
  });
}

function fill(){
  $("#img").append(
    ' <img class="img-thumbnail" alt="immagine prodotto" src='+ data.productImage+'>'
  )
  $("#info").append(
    '<p>Id prenotazione: ' +data._id+ '</p>' +
    '<p><a href="article.html?id=' +data.productId+ '">' +data.productTitle + " " + data.productBrand + '</a></p>' +
    '<p><a href="client.html?mail=' +data.clientEmail+ '">' +data.clientEmail+ '</a></p>' +
    '<p>Prezzo: '+data.price+'€</p>' 
  )
  $("#bookingRequest").append(
    '<p>Data richiesta prenotazione: '+ data.bookingDate.day +'-'+ data.bookingDate.month +'-'+ data.bookingDate.year+'<p>'
  )
  $("#bookingStart").append(
    '<p>Data inizio prenotazione: '+ data.startDate.day +'-'+ data.startDate.month +'-'+ data.startDate.year+'<p>'
  )
  $("#bookingEnd").append(
    '<p>Data fine prenotazione: '+ data.endDate.day +'-'+ data.endDate.month +'-'+ data.endDate.year+'<p>'
  )
  $("#notes").append(
    '<p>'+ data.description+'<p>'
  )
  $("#privateNotes").append(
    '<p>'+ data.note+'<p>'
  )
  if(data.isTaken){
    $('#rentalOccurred').prop('checked', true);
  }
  if(data.isReturned){
    $('#returned').prop('checked', true);
  }
} 