let data = {}
let deletable = true

function activateButtons(){
	if(($("#flexSwitchCheckDefault").is(':checked') == true))
		$('#rentProduct').prop('disabled', false);
	$('#flexSwitchCheckDefault').prop('disabled', false);
	$('#btnModify').prop('disabled', false);
	if(deletable)
		$('#delete').prop('disabled', false);
}
function deactivateButtons(){
	$('#rentProduct').prop('disabled', true);
	$('#flexSwitchCheckDefault').prop('disabled', true);
	$('#btnModify').prop('disabled', true);
	$('#delete').prop('disabled', true);
}

window.onload = window.onload = function login() {
  console.log("Cookie");  
  $.ajax({
		url: "/api/public/auth",
		method: "GET",
		headers: {
				"Content-Type": "application/json"
		},
		// Risposta del server in caso di successo
		success: (result) => {
			console.log(result)
			if(result.obj !== 1){
					window.location = site202131Url + "/public/login.html";
			}
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
						window.location = site202131Url + "/worker/navbar.html?";
				}
			});
		},
		// Risposta del server in caso di insuccesso
		error: (error) => {
			window.location = site202131Url + "/public/login.html";
		}
  });
}



function fill(){
	$("#img").attr("src", data.image)
	$("#img").attr("alt", 'Immagine '+data.title + ' ' + data.brand)
	$("#productidentifier").attr("aria-label", 'Identificativo: '+data._id)
	$("#productidentifier").text("ID: " + data._id)
	$("#title").text(data.title + ' ' + data.brand)
	$("#title").attr("aria-label", 'Articolo: : ' + data.title + ' ' + data.brand)

	//etichette
	$('#tags').empty();
	for (let i in data.tags){
		$("#tags").append('<span class="badge rounded-pill bg-primary" tabindex="0" >'+data.tags[i]+'</span>')
	}
	//stelle
	$('#stars').empty();
	$("#stars").attr("aria-label", 'Qualità: '+data.quality + 'stelle su tre')
	let j;
	for ( j = 0; j < data.quality; j++){
			$("#stars").append(
					'<span class="bi bi-star-fill checked big-size"></span>'
			)
	}
	for (j = 0; j < 3 - data.quality; j++){
			$("#stars").append(
					'<span class="bi bi-star big-size"></span>'
			)
	}
	//prezzo
	$("#fixedPrice").empty()
	$("#fixedPrice").append(
		'<span>Prezzo fisso: ' +data.fixedPrice+'€</span>'
	)
	$("#fixedPrice").attr("aria-label", 'Prezzo fisso: '+data.fixedPrice + ' €')

	$("#fixedDiscount").empty()
	if(data.discount.onSale){
		let newPrice
		if(!data.discount.onSaleType){
			newPrice = data.fixedPrice - data.discount.onSaleValue;
		}
		else{
			newPrice = data.fixedPrice - data.fixedPrice * data.discount.onSaleValue / 100;
		}
		$("#fixedDiscount").append(
			'<span>Prezzo fisso scontato: ' +newPrice+ '€</span>'
		)
		$("#fixedDiscount").attr("aria-label", 'Prezzo fisso scontato: '+newPrice + ' €')			

		document.getElementById("fixedDiscount").tabIndex = 0;
	}
	$("#dailyPrice").empty()
	$("#dailyPrice").append(
		'<span>Prezzo giornaliero: ' +data.price+'€/giorno</span>'
	)
	$("#dailyPrice").attr("aria-label", 'Prezzo giornaliero: '+data.price + ' €')
	$("#dailyDiscount").empty()
	if(data.overDays.days != ''){
		$("#dailyDiscount").append(
			'<span>Noleggia oltre ' +data.overDays.days+' giorni per ricevere sconto giornaliero</span>'
		)
		$("#dailyDiscount").attr("aria-label", 'Noleggia oltre: '+data.overDays.days +' giorni per ricevere sconto giornaliero')
		document.getElementById("dailyDiscount").tabIndex = 0;
	}


	let current = new Date();      

	if(data.bookings.length === 0){
		$("#Table").empty()
	}
	else{
		for(let i in data.bookings){
			let bookingEnd = new Date(data.bookings[i].endDate.year, data.bookings[i].endDate.month -1, data.bookings[i].endDate.day, 23, 59, 59)
			if(current <= bookingEnd){
				$('#delete').prop('disabled', true);
				deletable = false
				//<button type="button" id="delete" class="btn btn-lg btn-danger" onclick="remove()">Elimina</button>
				//data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover"
			}
		}
			//tabella
		for (let i in data.bookings){
			$("#myTable").append(
				'<tr>'+
				'<td><a aria-label="Link alla prenotazione. Identificativo:'+data.bookings[i].reservationId +'" href="reservation.html?id=' +data.bookings[i].reservationId+'">Prenotazione</td>'+
				'<td><a aria-label="Email cliente: '+data.bookings[i].clientId+' " href="client.html?email=' +data.bookings[i].clientId+'">'+data.bookings[i].clientId+'</td>'+
				'<td tabindex="0" aria-label="Prezzo totale: '+data.bookings[i].total +'€">'+data.bookings[i].total+'€</td>'+
				'<td tabindex="0" aria-label="Data inizio prenotazione '+data.bookings[i].startDate.day+"-"+data.bookings[i].startDate.month+"-"+data.bookings[i].startDate.year+'" >'+data.bookings[i].startDate.day+"-"+data.bookings[i].startDate.month+"-"+data.bookings[i].startDate.year+'</td>'+
				'<td tabindex="0" aria-label="Data fine prenotazione '+data.bookings[i].endDate.day+"-"+data.bookings[i].endDate.month+"-"+data.bookings[i].endDate.year+'">'+data.bookings[i].endDate.day+"-"+data.bookings[i].endDate.month+"-"+data.bookings[i].endDate.year+'</td>'+
				'</tr>'
			)
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
	$("#description").attr("aria-label", 'Descrizione: '+data.description)
	document.getElementById("description").tabIndex = 0;

	$("#note").text(data.note)
	$("#note").attr("aria-label", 'Note non visibili ai clienti: '+data.note)
	document.getElementById("note").tabIndex = 0;
	
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
	deactivateButtons()
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
			activateButtons()
			alert("modifica avvenuta")
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore nella modifica dei dati");
				activateButtons()
    }
	});
})

function remove(){
	deactivateButtons()
	$.ajax({
		url: "/api/product?id=" + data._id,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		// Risposta del server in caso di successo
		success: () => {
			alert("operazione riuscita")
			window.location = site202131Url + "/worker/navbar.html?";
		},
		// Risposta del server in caso di insuccesso
		error: (error) => {
			console.log("Error");
			activateButtons()
			alert("Errore nella cancellazione dei dati");
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
	
	$("#productPrice").attr("placeholder", data.fixedPrice);
  $("#productPrice").val(data.fixedPrice);

	$("#dailyPriceModal").attr("placeholder", data.price);
  $("#dailyPriceModal").val(data.price);


	$("#productDescription").attr("placeholder", data.description);
  $("#productDescription").val(data.description);
	$("#productNote").attr("placeholder", data.note);
  $("#productNote").val(data.note);

	if(data.discount.onSale){
		$('#onSale').prop('checked', true);
		$('#discountAmount').prop('disabled', false);
		$('#discountPercentage').prop('disabled', false);
		$('#discountValue').prop('disabled', false);

		$("#discountValue").val(data.discount.onSaleValue);
		if(!data.discount.onSaleType){
			$('#discountAmount').prop('checked', true);
			$('#pd').text("€")
			$('#newPrice').val(data.fixedPrice - data.discount.onSaleValue)
		}
		else{
			$('#discountPercentage').prop('checked', true);
			$('#pd').text("%")
			$('#newPrice').val(data.fixedPrice - data.fixedPrice * data.discount.onSaleValue / 100)
		}
	}
	else{
		$('#onSale').prop('checked', false);
		changeSale()
	}


	if(data.overDays.onSale){
		$('#dailySale').prop('checked', true);
		$('#dailyDiscountAmount').prop('disabled', false);
		$('#dailyDiscountPercentage').prop('disabled', false);
		$('#dailyDiscountValue').prop('disabled', false);
		$('#daysDiscount').prop('disabled', false);

		$("#dailyDiscountValue").val(data.overDays.onSaleValue);
		$("#daysDiscount").val(data.overDays.days);
		if(!data.overDays.onSaleType){
			$('#dailyDiscountAmount').prop('checked', true);
			$('#pd1').text("€")
		}
		else{
			$('#dailyDiscountPercentage').prop('checked', true);
			$('#pd1').text("%")
		}
	}
	else{
		$('#dailySale').prop('checked', false);
		changeDailySale()
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
	$('#modalSave').prop('disabled', true);
	$('#modalClose').prop('disabled', true);
	let newTags = []
  if($("#productTags").val() != "") {
		let newLabels = $("#productTags").val()
		newLabels = newLabels.replace(/,/g, ' ');

		newTags = [...new Set(newLabels.split(/\s+/))];
		if(newTags[newTags.length - 1] == '') {
			newTags.pop()
		}
	}

	let sale, type, value
	if($("#onSale").is(':checked') == true){
		sale = true 
		type = ($("#discountAmount").is(':checked') == true) ? false : true
		value = $("#discountValue").val() 
	}
	else{
		sale = false 
		type = false
		value = 0
	}

	let dailySale, dailyType, dailyValue, dailyDays
	if($("#dailySale").is(':checked') == true){
		dailySale = true 
		dailyType = ($("#dailyDiscountAmount").is(':checked') == true) ? false : true
		dailyValue = $("#dailyDiscountValue").val() 
		dailyDays = $("#daysDiscount").val()
	}
	else{
		dailySale = false 
		dailyType = false
		dailyValue = 0
		dailyDays = 0
	}


   $.ajax({
    url:"/api/product?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
			title: $("#productName").val(),
			brand: $("#productModel").val(),
			image: $("#imageLink").val(),
			tags: newTags,
			price: parseFloat($("#dailyPriceModal").val()),
			fixedPrice: parseFloat($("#productPrice").val()),
			discount:{
				onSale: sale, 
				onSaleType: type, 
				onSaleValue: parseFloat(value)
			},
			overDays:{
				days: parseInt(dailyDays),
				onSale: dailySale,
				onSaleType: dailyType,
				onSaleValue: parseFloat(dailyValue)
			},
			description: $("#productDescription").val(),
			note: $("#productNote").val(),
			quality: $("#qualityModal").val(),

    }),
    // Risposta del server in caso di successo
    success: (result) => {
        console.log(result)
        data.title = $("#productName").val()
				data.brand = $("#productModel").val()
				data.image = $("#imageLink").val()
				data.fixedPrice = $("#productPrice").val()
				data.price = $("#dailyPriceModal").val()
				data.quality = parseInt($("#qualityModal").val())

				data.discount.onSale = sale
				data.discount.onSaleType = type
				data.discount.onSaleValue = value

				data.overDays.onSale = dailySale
				data.overDays.onSaleType = dailyType
				data.overDays.onSaleValue = dailyValue
				data.overDays.days = dailyDays

				let newLabels = $("#productTags").val()
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
				$('#modalSave').prop('disabled', false);
				$('#modalClose').prop('disabled', false);
				alert("operazione riuscita")
				$('#myModal').modal('hide')
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore nella modifica dei dati");
				$('#modalSave').prop('disabled', false);
				$('#modalClose').prop('disabled', false);
    }
	});
}

//listener per checkbox available
$('#onSale').change(changeSale)
	
function changeSale() {
	if (this.checked) {
		$('#discountAmount').prop('disabled', false);
		$('#discountPercentage').prop('disabled', false);
		$('#discountAmount').prop('checked', true);
		$('#discountValue').prop('disabled', false);
		$('#newPrice').val(data.fixedPrice);
  }
	if (!this.checked) {
		$('#discountAmount').prop('checked', false);
		$('#discountPercentage').prop('checked', false);
		$('#discountValue').val("");
		$('#discountAmount').prop('disabled', true);
		$('#discountPercentage').prop('disabled', true);
		$('#discountValue').prop('disabled', true);
		$('#newPrice').val("");
  } 
}

$('#dailySale').change(changeDailySale)

function changeDailySale() {
	if (this.checked) {
		$('#dailyDiscountAmount').prop('disabled', false);
		$('#dailyDiscountPercentage').prop('disabled', false);
		$('#dailyDiscountAmount').prop('checked', true);
		$('#dailyDiscountValue').prop('disabled', false);
		$('#daysDiscount').prop('disabled', false);
  }
	if (!this.checked) {
		$('#dailyDiscountAmount').prop('checked', false);
		$('#dailyDiscountPercentage').prop('checked', false);
		$('#dailyDiscountValue').val("");
		$('#daysDiscount').val('');
		$('#dailyDiscountAmount').prop('disabled', true);
		$('#dailyDiscountPercentage').prop('disabled', true);
		$('#dailyDiscountValue').prop('disabled', true);
		$('#daysDiscount').prop('disabled', true);
  } 
}

$('#discountAmount').change(percentageSale)
	 
function percentageSale() {
	if (this.checked) {
		$('#pd').text("€")
		calculateDiscount()
	}
}

$('#discountPercentage').change(percentageFlat)

function percentageFlat() {
	if (this.checked) {
		$('#pd').text("%")
		calculateDiscount()
	}
}

$('#dailyDiscountPercentage').change(percentageFlatDaily)

function percentageFlatDaily() {
	if (this.checked) 
		$('#pd1').text("%")
}

$('#dailyDiscountAmount').change(percentageSaledaily)
	 
function percentageSaledaily() {
	if (this.checked) 
		$('#pd1').text("€")
}

function calculateDiscount(){
	if($('#discountValue').val() != '' && $("#productPrice").val() != ''){
		if($('#discountAmount').is(":checked")){
			$('#newPrice').val($("#productPrice").val() - $('#discountValue').val())
		} 
		if($('#discountPercentage').is(":checked")){
			let total = $("#productPrice").val()
			let sale = $('#discountValue').val()
			let newTotal = total - total * sale / 100; 
			$('#newPrice').val(newTotal.toFixed(2))
		}
	}
	if($('#newPrice').val() <= 0){
		$('#modalSave').prop('disabled', true);
	}
	else{
		$('#modalSave').prop('disabled', false);
	}
}


//////////////////////////////////
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'searchButton'){
    $("#main").empty()
  }
});