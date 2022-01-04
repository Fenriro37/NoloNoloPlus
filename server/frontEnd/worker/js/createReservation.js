let data = {}
window.onload = function getProduct() {
  
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('=') + 1);
    $.ajax({
        url: "/api/product/?id=" + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: (result) => {
					data = result.data.obj
					console.log(data)
          $("#articleId").val(id + " " + data.title + " " + data.brand)
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });
}

$('#rentalOccurred').change(function() {
	if (this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
  }
	if (!this.checked) {
		$('label[for=rentalOccurred]').text("Il prodotto non è stato ritirato");
  } 
})

$('#returned').change(function() {
	if (this.checked) {
		$('label[for=returned]').text("Il prodotto è stato restituito");
    $('label[for=rentalOccurred]').text("Il prodotto è stato ritirato");
    $('#rentalOccurred').prop('checked', true);
  }
	if (!this.checked) {
		$('label[for=returned]').text("Il prodotto non è stato restituito");
  } 
})

$('#formId').submit(function (evt) {
  evt.preventDefault();
  console.log("preventDefault")
  save()
});

function save(){
    var date = new Date($('#date-input').val());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
/*     $.ajax({
      url:"/api/reservation",
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify({
        title: $('#title').val(),

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
    });  */
}