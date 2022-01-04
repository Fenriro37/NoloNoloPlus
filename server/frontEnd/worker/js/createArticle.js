//listener per checkbox available
$('#available').change(function() {
	if (this.checked) {
		$('label[for=available]').text("Il prodotto è disponibile");
  }
	if (!this.checked) {
		$('label[for=available]').text("Il prodotto non è disponibile");
  } 
})

//listener per checkbox available
$('#sale').change(function() {
	if (this.checked) {
		$('label[for=sale]').text("Il prodotto è scontato");
		$("#saleRow").append(
			'<div id="saleInfo">' +
				'<div class="row">' +
						'<div class="col-3"><p> Tipo di sconto:</p></div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="percentage" required>' +
								'<label class="form-check-label" for="percentage">Percentuale</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-3">' +
							'<div class="form-check">' +
								'<input class="form-check-input" type="radio" name="flexRadioDefault" id="flat" required>' +
								'<label class="form-check-label" for="flat">Fisso</label>' +
							'</div>' +
						'</div>' +
				'</div>'+
				'<div class="row">' +
					'<div class="col-3"> <p> Valore sconto:</p>	</div>' +
					'<div class="col-9">' +
					'<input type="number" class="form-control" min="1" step="1" id="salePrice" aria-label="SalePrice" aria-describedby="basic-addon6" required>' +
					'</div>' +
				'</div>' +
			'</div>'
		);  	
  }
	if (!this.checked) {
		$('label[for=sale]').text("Il prodotto non è scontato");
	  $("#saleInfo").remove()
  } 
})

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
				onSaleValue = $('#salePrice').val()
			}
			else{
				onSaleType = false,
				onSaleValue = ""
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
				onSaleValue: onSaleValue
			},
			available: $("#available").is(':checked') ? true : false,
		
			price:  $('#price').val(),
			quality:  $('#quality').val(),
			description:  $('#description').val(),
			note:  $('#note').val(),
			bookings: {}
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
