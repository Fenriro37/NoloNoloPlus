let data = {}
let dateRange = []
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
          for(let i in data.bookings){
            let tmp = []
            tmp.push(data.bookings[i].startDate.month + '-' + data.bookings[i].startDate.day + '-' + data.bookings[i].startDate.year)
            tmp.push(data.bookings[i].endDate.month + '-' + data.bookings[i].endDate.day + '-' + data.bookings[i].endDate.year)
            dateRange.push(tmp)
          }
          $("#articleId").val(id + " " + data.title + " " + data.brand)
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });
}
var date_range = [ ["11-01-2022", "18-01-2022"], ["01-11-2022", "01-14-2022"]];
$(document).ready(function(){
  $( "#date-input" ).datepicker({
    changeMonth: true,
    changeYear: true
  });
  $( "#date-start" ).datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd-mm-yy",
    beforeShowDay: function(date) {
			var string = $.datepicker.formatDate('mm-dd-yy', date);
      //$.datepicker.formatDate('mm-dd-yy', date)  //salva la data nel formato specificato
			for (let i in dateRange) {				
				if (Array.isArray(dateRange[i])) {				
					var from = new Date(dateRange[i][0]);
					var to = new Date(dateRange[i][1]);
					var current = new Date(string);					
					if (current >= from && current <= to) return false;
				}				
			}
			return [dateRange.indexOf(string) == -1]
    }
  });
  $( "#date-end" ).datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd-mm-yy",
    beforeShowDay: function(date) {
			var string = $.datepicker.formatDate('mm-dd-yy', date);
      //$.datepicker.formatDate('mm-dd-yy', date)  //salva la data nel formato specificato
			for (let i in dateRange) {				
				if (Array.isArray(dateRange[i])) {				
					var from = new Date(dateRange[i][0]);
					var to = new Date(dateRange[i][1]);
					var current = new Date(string);					
					if (current >= from && current <= to) return false;
				}				
			}
			return [dateRange.indexOf(string) == -1]
    }
  });
})
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


$("#clear").click(function() {
  $("input").each(function(){
    //console.log($(this).attr('id') != "articleId")
    if($(this).attr('id') != "articleId")
      $(this).val("")
    if($(this).is(':checkbox'))
      $(this).prop('checked', false);
  });
});

$('#formId').submit(function (evt) {
  evt.preventDefault();
  console.log("preventDefault")
  save()
});

function save(){
    let date0 = new Date($('#date-input').val());
    let dayInput = date.getDate();
    let monthInput = date.getMonth() + 1;
    let yearInput = date.getFullYear();
    let date1 = new Date($('#date-start').val());
    let dayStart = date.getDate();
    let monthStart = date.getMonth() + 1;
    let yearStart = date.getFullYear();
    let date2 = new Date($('#date-end').val());
    let dayEnd = date.getDate();
    let monthEnd = date.getMonth() + 1;
    let yearEnd = date.getFullYear();
    console.log(day +"-"+ month +"-"+ year)
    $.ajax({
      url:"/api/user?email=" + $("#email").val(),
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
          console.log(result)
          let user = result.data
          /*$.ajax({
          url:"/api/reservation",
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          data: JSON.stringify({
            productId: data._id,
            productTitle: data.title,
            productBrand: data.brand,
            productImage: data.image,
            clientEmail: user.email,
            clientName: user.userName,
            clientSurname: user.userSurname,
            bookingDate: {
              day: dayInput,
              month: monthInput,
              year: yearInput 
            },
            startDate: {
              day: dayStart,
              month: monthStart,
              year: yearStart
            },
            endDate: {
              day: dayEnd,
              month: monthEnd,
              year: yearEnd 
            }, 
            isTaken: $("#rentalOccurred").is(':checked') ? true  : false,
            isReturned: $("#returned").is(':checked') ? true  : false,
            price:  $("#price").val(),
            description:  $("#notes").val(),
            note: $("#privateNotes").val(),

          }),
          // Risposta del server in caso di successo
          success: (result) => {
            console.log(result)
            //aggiornamento article
            let newBooking = {}
            newBooking.productId = data._id
            newBooking.clientId = user.email
            newBooking.reservationId = result.something ._id
            newBooking.startDate = {}
            newBooking.startDate.day = dayStart
            newBooking.startDate.month = monthStart
            newBooking.startDate.year = yearStart
            newBooking.endDate = {}
            newBooking.endDate.day = dayEnd
            newBooking.endDate.month = monthEnd
            newBooking.endDate.year = yearEnd
            data.bookings.push(newBooking)
            /*$.ajax({
            url:"/api/product/?id=" + data._id,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
              bookings: data.bookings
            }),
            // Risposta del server in caso di successo
            success: (result) => {
                console.log(result)
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
          }); */
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
          console.log("Error");
          alert("Errore. " + error.responseText);
      }
    });   
}