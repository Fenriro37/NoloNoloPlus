let data = {}
window.onload = function getProduct() {
  
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('=') + 1);
    let customUrl = "/api/product/?id=" + id
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
		' <img class="img-thumbnail" alt="immagine prodotto" src='+ data.image+'>'
	)
	$("#productidentifier").append(
			'<span>'+data._id+'</span>'
	)
	$("#title").text(data.title + ' ' + data.brand)
	//etichette
	for (let i in data.tags){
		$("#tags").append('<span class="badge rounded-pill bg-primary" >'+data.tags[i]+'</span>')
	}
	//stelle
	let j;
	for ( j = 0; j < data.quality; j++){
			$("#stars").append(
					'<span class="bi bi-star-fill checked big-size"</span>'
			)
	}
	for (j = 0; j < 3 - data.quality; j++){
			$("#stars").append(
					'<span class="bi bi-star big-size"</span>'
			)
	}
	//prezzo
	if(data.discount.onSale){
		$("#price").append(
			'<span class="price"><s>' +data.price+' €</s> <span>' +data.price+ 'cpmputed€</span></span>'
			)
	}
	else{
		$("#price").append(
			'<span class="price">' +data.price+' €<span>'
			)
	}
	//descrizione e note
	$("#description").text(data.description)
	$("#note").text(data.note)

	//tabella
	for (let i in data.bookings){
		$("#myTable").append(
			'<tr>'+
			'<td><a href="reservation.html?id=' +data.bookings[i].reservationId+'">'+data.bookings[i].reservationId+'</td>'+
			'<td><a href="reservation.html?id=' +data.bookings[i].clientId+'">'+data.bookings[i].clientId+'</td>'+
			'<td>'+data.bookings[i].startDate.day+"-"+data.bookings[i].startDate.month+"-"+data.bookings[i].startDate.year+'</td>'+
			'<td>'+data.bookings[i].endDate.day+"-"+data.bookings[i].endDate.month+"-"+data.bookings[i].endDate.year+'</td>'+
			'</tr>'
		)
	}
}

$("#rentProduct").click( function(){
	let productId =  $("#productidentifier span").text()
	location.href = "createArticle.html?product="+ productId;
});

$(document).ready(function(){
	$("#myInput").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

$('#flexSwitchCheckDefault').change(function() {
	if (this.checked) {
		$("#rentProduct").prop("disabled", true);
  }
	if (!this.checked) {
		$("#rentProduct").prop("disabled", false);
  } 
/* 	$.ajax({
    url:"/api/product?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      available : $('#flexSwitchCheckDefault').is(":checked") ? false : true
    }),
    // Risposta del server in caso di successo
    success: (result) => {
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	});  */
})

function remove(){
	let current = new Date();      
  current = current.getFullYear() + '-' + (current.getMonth()+1)+ '-' + current.getDate() 
  for(let i in data.bookings){
    let bookingDate = data.bookings[i].endDate.year + '-' + data.bookings[i].endDate.month + '-' +  data.bookings[i].endDate.day
    console.log(bookingDate)
    console.log(current)
    if(bookingDate >= current )  
      return(alert('Il prodotto ha ancora prenotazioni attive'))
  }
	return(alert('Il prodotto è stato cancellato'))
/*$.ajax({
		url: "/api/product?id=" + data._id,
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
}