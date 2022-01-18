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
            alert("Pagina non disponibile o inesistente");
						window.location = "http://localhost:8081/worker/navbar.html?";
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

	let current = new Date();      
	current = parseInt(current.getFullYear()) * 10000 + parseInt((current.getMonth()+1)) * 100 + parseInt(current.getDate())

	for(let i in data.bookings){
		bookingStart = parseInt(data.bookings[i].startDate.year) * 10000 + parseInt(data.bookings[i].startDate.month) * 100 + parseInt(data.bookings[i].startDate.day)
		if(current <= bookingStart){
			$('#delete').prop('disabled', true);
			$('#delete').text('Prenotazioni attive');
		}
	}

	if(data.available){
		$('#flexSwitchCheckDefault').prop('checked', false);
		$('label[for=flexSwitchCheckDefault]').text("Il prodotto è disponibile");
	}
	else{
		$('#flexSwitchCheckDefault').prop('checked', true);
		$('#rentProduct').prop('disabled', true);
		$('label[for=flexSwitchCheckDefault]').text("Il prodotto non è disponibile");
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
		$('label[for=flexSwitchCheckDefault]').text("Il prodotto non è disponibile");
  }
	if (!this.checked) {
		$("#rentProduct").prop("disabled", false);
		$('label[for=flexSwitchCheckDefault]').text("Il prodotto è disponibile");
  } 
	$.ajax({
    url:"/api/product?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      available : $('#flexSwitchCheckDefault').is(":checked") ? false : true
    }),
    // Risposta del server in caso di successo
    success: () => {
			alert("modifica avvenuta")
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	});
})

function remove(){

	$.ajax({
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
	}); 
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
	let newTitle = ($("#productName").val() == "") ? data.title : $("#productName").val()
	let newImage = ($("#imageLink").val() == "") ? data.image : $("#imageLink").val()
	let newPrice = ($("#productPrice").val() == "") ? data.price : $("#productPrice").val()
	let newDescription = ($("#productDescription").val() == "") ? data.description : $("#productDescription").val()

	let newTags = []
  if($("#productTags").val() == "") {
		newTags =  data.tags
	} 
	else {
		let newLabels = $("#productTags").val()
		newLabels = newLabels.replace(/,/g, ' ');

		newTags = [...new Set(newLabels.split(/\s+/))];
		if(newTags[newTags.length - 1] == '') {
			newTags.pop()
		}
	}
	let sale, type, value
	if($("#onSale").is(':checked') == true && 
	   ($("#discountAmount").is(':checked') == true || $("#discountPercentage").is(':checked') == true) &&
		 $("#discountValue").val() != ""){
			sale = true 
			type = ($("#discountAmount").is(':checked') == true) ? true : false
			value = $("#discountValue").val() 
	}
	else{
		sale = false 
		type = false
		value = ""
	}



   $.ajax({
    url:"/api/product?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
			title: newTitle,
			brand: $("#productModel").val(),
			image: newImage,
			tags: newTags,
			price: newPrice,
			discount:{
				onSale: sale, 
				onSaleType: type, 
				onSaleValue: value
			},
			description: newDescription,
			note: $("#productNote").val(),
			quality: $("#qualityModal").val(),

    }),
    // Risposta del server in caso di successo
    success: (result) => {
        console.log(result)
        data.title = newTitle
				data.brand = $("#productModel").val()
				data.image = newImage
				data.price = newPrice
				data.quality = $("#qualityModal").val()

				data.discount.onSale = sale
				data.discount.onSaleType = type
				data.discount.onSaleValue = value

				let newLabels = $("#productTags").val()
				newLabels = newLabels.replace(/,/g, ' ');

        let newTags = [...new Set(newLabels.split(/\s+/))];
        //potrebbe non essere l'ultimo?
        if(newTags[newTags.length - 1] == '') {
          newTags.pop()
        }
				data.tags = newTags

				data.description = newDescription
				data.note = $("#productNote").val()
				
				fill()
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	});
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
/////////////////////////////////
////////////////////////////////////
//////////////////////////////////
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'searchButton'){
    $("#main").empty()
  }
});