//serve solo per sovrascrivere la funzione login di navbar.js
window.onload = function hello(){}

//listener per checkbox available
$('#available').change(function() {
	if (this.checked) {
		$('label[for=available]').text("Il prodotto è disponibile");
  }
	if (!this.checked) {
		$('label[for=available]').text("Il prodotto non è disponibile");
  } 
})

//prezzo fisso
$('#sale').change(function() {
	if (this.checked) {
		$('label[for=sale]').text("Il prodotto è scontato");
		$("#saleRow").append(
			'<div id="saleInfo" class="mt-2">' +
				'<div class="row">' +
						'<div class="col-3"><p> Tipo di sconto:</p></div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="percentage" aria-label="Sconto percentuale, seleziona uno dei due" required>' +
								'<label class="form-check-label" for="percentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" aria-label="Sconto fisso, seleziona uno dei due" id="flat" required>' +
								'<label class="form-check-label" for="flat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step=".01" id="saleValue" onkeyup="calculateDiscount()" aria-label="Valore sconto prezzo fisso, campo obbligatorio" required>' +
					'</div>' +
				'</div>' +
				'<div class="row mt-2">'+
					'<div class="col-3">Prezzo scontato:</div>' +
					'<div class="col-9">' +
						'<input type="number" class="form-control"  id="newValue" aria-label="Nuovo prezzo fisso scontato. Sola lettura. Se negativo non sarà possibile aggiungere il prodotto al catalogo"  readonly>' +
					'</div>'+
				'</div>'+
			'</div>'
		);  	
  }
	if (!this.checked) {
		$('label[for=sale]').text("Il prodotto non è scontato");
	  $("#saleInfo").remove()
		$('#btnSave').prop('disabled', false);
  } 
})

//prezzo giornaliero
$('#dailySale').change(function() {
	if (this.checked) {
		$('label[for=dailySale]').text("Il prodotto è scontato");
		$("#dayliSaleRow").append(
			'<div id="dailySaleInfo" class="mt-2">' +
				'<div class="row">' +
						'<div class="col-3"><p> Tipo di sconto:</p></div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="dailyPercentage" aria-label="Sconto percentuale, seleziona uno dei due" required>' +
								'<label class="form-check-label" for="dailyPercentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="dailyFlat" aria-label="Sconto fisso, seleziona uno dei due" required>' +
								'<label class="form-check-label" for="dailyFlat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step=".01" id="dailySaleValue" aria-label="Valore sconto prezzo giornaliero, campo obbligatorio" required>' +
					'</div>' +
				'</div>' +
				'<div class="row mt-2">'+
					'<div class="col-3">Giorni per sconto:</div>' +
					'<div class="col-9">' +
						'<input type="number" class="form-control" min="1" step="1"  id="daysCount" aria-label="Numero giorni da supera per ottenere sconto sul prezzo giornaliero. Campo obbligatorio"  required>' +
					'</div>'+
				'</div>'+
			'</div>'
		);  	
  }
	if (!this.checked) {
		$('label[for=dailySale]').text("Il prodotto non è scontato");
	  $("#dailySaleInfo").remove()
  } 
})

$(document).on('click','#flat',function(){
	calculateDiscount()
})

$(document).on('click','#percentage',function(){
	calculateDiscount()
})

function calculateDiscount(){
	if($('#sale').is(":checked")){
		if($('#flat').is(":checked")){
			$('#newValue').val(parseFloat($("#price").val()) - parseFloat($('#saleValue').val()).toFixed(2))
		} 
		if($('#percentage').is(":checked")){
			let total = parseFloat($("#price").val())
			let sale = parseFloat($('#saleValue').val())
			let newTotal = (total - total * sale / 100).toFixed(2); 
			$('#newValue').val(newTotal)
		}
		console.log($('#newValue').val())
		if(	$('#newValue').val() <= 0){
			
			$('#btnSave').prop('disabled', true);
		}
		else{
			$('#btnSave').prop('disabled', false);
			let total = document.getElementById('newValue');
			total.ariaLabel = 'Nuovo prezzo scontato: Sola lettura Se negativo non sarà possibile aggiungere il prodotto al catalogo'
		} 
	}
}

//aggiunta della cancellazione del nodo saleInfo se creato in precedenza
$('form').on('reset', function(e){
	$("#saleInfo").remove()
});

function save() {
	let newTags = $('#tags').val().replace(/,/g, ' ');
	newTags = [...new Set(newTags.split(" "))];
	for (let i = 0; i < newTags.length;i++){
		 if(newTags[i] == ""){
			newTags.splice(i,1);
		}
	}    
	onSale = $("#sale").is(':checked') ? true : false
	if(onSale){
		onSaleType = $("#percentage").is(':checked') ? true  : false
		onSaleValue = $('#saleValue').val()
	}
	else{
		onSaleType = false,
		onSaleValue = 0
	}

	let dailySale = $("#dailySale").is(':checked') ? true : false
	let dayliType, dayliValue, days
	if(dailySale){
		dayliType = $("#dailyPercentage").is(':checked') ? true  : false
		dayliValue = $('#dailySaleValue').val()
		days = $('#daysCount').val()
	}
	else{
		dayliType = false
		dayliValue = 0
		days = 0
	}
	//ajax post
 	$.ajax({
		url:"/api/product",
		method: "POST",
		headers: {
				"Content-Type": "application/json"
		},
		data: JSON.stringify({
			title: $('#title').val(),
			brand: $('#brand').val(),
			image: $('#image').val() ,   
			tags: newTags,
		
			discount: {
				onSale: onSale,
				onSaleType: onSaleType,
				onSaleValue: parseFloat(onSaleValue)
			},
			available: $("#available").is(':checked') ? true : false,

			fixedPrice: parseFloat($('#price').val()),
			overDays:{
				days: parseInt(days),
				onSale: dailySale,
				onSaleType: dayliType,
				onSaleValue: parseFloat(dayliValue)
			},
			price:  parseFloat($('#dayliPrice').val()),
			quality:  parseInt($('#quality').val()),
			description:  $('#description').val(),
			note:  $('#note').val(),
			bookings: []
		}),
		// Risposta del server in caso di successo
		success: (result) => {
				console.log(result)

				//window.location.href = "http://localhost:8081/user/index.html";
		},
		// Risposta del server in caso di insuccesso
		error: (error) => {
				console.log("Error");
				alert("Errore. " + error.responseText);
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
