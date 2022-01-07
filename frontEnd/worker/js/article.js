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
	$("#img").attr("src", data.image)
	$("#productidentifier").text("ID: " + data._id)
	$("#title").text(data.title + ' ' + data.brand)

	//etichette
	$('#tags').empty();
	for (let i in data.tags){
		$("#tags").append('<span class="badge rounded-pill bg-primary" >'+data.tags[i]+'</span>')
	}
	//stelle
	$('#stars').empty();
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
	$("#price").empty()
	if(data.discount.onSale){
		let newPrice
		if(data.discount.onSaleType){
			newPrice = data.price - data.discount.onSaleValue;
		}
		else{
			newPrice = data.price - data.price * data.discount.onSaleValue / 100;
		}
		$("#price").append(
			'<span class="price"><s>' +data.price+'€</s><span>' +newPrice+ '€</span></span>'
		)
	}
	else{
		$("#price").append(
			'<span class="price">' +data.price+' €<span>'
		)
	}

	if(data.available){
		$('#flexSwitchCheckDefault').prop('checked', false);
	}
	else{
		$('#flexSwitchCheckDefault').prop('checked', true);
		$('#rentProduct').prop('disabled', true);
	}

	//descrizione e note
	$("#description").text(data.description)
	$("#note").text(data.note)

	//tabella
	if(data.bookings.length !== 0){
		for (let i in data.bookings){
			console.log(data.bookings)
			console.log(i)
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
}

$("#rentProduct").click( function(){
	let productId =  $("#productidentifier span").text()
	location.href = "createReservation.html?product="+ data._id;
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

function getModalData(){
	$("#productName").attr("placeholder", data.title);
  $("#productName").val(data.title);
	$("#productModel").attr("placeholder", data.brand);
  $("#productModel").val(data.brand);

	if(data.quality == '1')
		$("#qualityModal").val(1)
	else if(data.quality == '2')
		$("#qualityModal").val(2)
	else
		$("#qualityModal").val(3)

	$("#imageLink").attr("placeholder", data.image);
  $("#imageLink").val(data.image);
	
	$("#productPrice").attr("placeholder", data.price);
  $("#productPrice").val(data.price);
	$("#productDescription").attr("placeholder", data.description);
  $("#productDescription").val(data.description);
	$("#productNote").attr("placeholder", data.note);
  $("#productNote").val(data.note);

	if(data.discount.onSale){
		$('#onSale').prop('checked', true);
		$('#discountAmount').prop('disabled', false);
		$('#discountPercentage').prop('disabled', false);
		$('#discountValue').prop('readonly', false);

		$("#discountValue").val(data.discount.onSaleValue);
		if(data.discount.onSaleType){
			$('#discountAmount').prop('checked', true);
			$('#pd').text("€")
			$('#newPrice').val(data.price - data.discount.onSaleValue)
		}
		else{
			$('#discountPercentage').prop('checked', true);
			$('#pd').text("%")
			$('#newPrice').val(data.price - data.price * data.discount.onSaleValue / 100)
		}
	}
	let labels = ""
	for(let i in data.tags){
		labels += data.tags[i]  + " "
	}
	$("#productTags").attr("placeholder", labels);
  $("#productTags").val(labels);
}

$('#formId').submit(function (evt) {
  evt.preventDefault();
  save()
});

function save(){
	console.log("save")
  /*$.ajax({
    url:"/api/product?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      userName: $("#name").val(),
    }),
    // Risposta del server in caso di successo
    success: (result) => {
        console.log(result)
        data.title = $("#productName").val()
				data.brand = $("#productModel").val()
				data.image = $("#imageLink").val()
				data.price = $("#productPrice").val()
				data.quality = $("#qualityModal").val()
				data.discount.onSale = $('#onSale').is(":checked") ? true : false,
				data.discount.onSaleType = $('#discountAmount').is(":checked") ? true : false,
				data.discount.onSaleValue = $("#discountValue").val()

				newLabels = $("#productTags").val()
				newLabels = newLabels.replace(/,/g, ' ');

        let newTags = [...new Set(newLabels.split(/\s+/))];
        //potrebbe non essere l'ultimo?
        if(newTags[newTags.length - 1] == '') {
          newTags.pop()
        }
				data.tags = newTags

				data.description = $("#productDescription").val()
				data.note = $("#productNote").val()
				
				fill()
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	});  */
}

//listener per checkbox available
$('#onSale').change(function() {
	if (this.checked) {
		$('#discountAmount').prop('disabled', false);
		$('#discountPercentage').prop('disabled', false);
		$('#discountValue').prop('readonly', false);
		$('#newPrice').val(data.price);
  }
	if (!this.checked) {
		$('#discountAmount').prop('checked', false);
		$('#discountPercentage').prop('checked', false);
		$('#discountValue').val("");
		$('#discountAmount').prop('disabled', true);
		$('#discountPercentage').prop('disabled', true);
		$('#discountValue').prop('readonly', true);
		$('#newPrice').val("");
  } 
}) 

$('#discountAmount').change(percentageSale)
	 
function percentageSale() {
	if (this.checked) {
		$('#pd').text("€")
		$('#newPrice').val($("#productPrice").val() - $('#discountValue').val())
	}
}

$('#discountPercentage').change(percentageFlat)

function percentageFlat() {
	if (this.checked) {
		$('#pd').text("%")
		console.log($('#newPrice').val() != "")
		let total = $("#productPrice").val()
		let sale = $('#discountValue').val()
		let newTotal = total - total * sale / 100; 
		$('#newPrice').val(newTotal)
	}
}

function calculateDiscount(){
	if($('#discountAmount').is(":checked")){
		$('#newPrice').val($("#productPrice").val() - $('#discountValue').val())
	} 
	if($('#discountPercentage').is(":checked")){
		let total = $("#productPrice").val()
		let sale = $('#discountValue').val()
		let newTotal = total - total * sale / 100; 
		$('#newPrice').val(newTotal)
	}
}