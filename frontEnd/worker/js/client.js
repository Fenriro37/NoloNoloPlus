let data = {}
let bookings = []
let boolModify = false
let deletable = true
window.onload = function getClient() {
  
  var url = window.location.href;
  var email = url.substring(url.lastIndexOf('=') + 1);
  let customUrl = "/api/user?email=" + email
  $.ajax({
      url: customUrl,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        data = result.data
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
  //aggiungere getAllReservation di questo user
  let query = {
    filter: email,
    sort: false
  }
  $.ajax({
      url: "/api/reservation/all?filter=" + query.filter + "&sort=" + query.sort,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        bookings = result.obj
        console.log(bookings)
        if(bookings.length === 0){
          $("#Table").empty()
        }
        else{
          let current = new Date();      

          for(let i in bookings){
            bookingEnd =  new Date(parseInt(bookings[i].endDate.year), parseInt(bookings[i].endDate.month) - 1, parseInt(bookings[i].endDate.day))
            if(current <= bookingEnd){
              deletable = false
            }
          }
          for (let i in bookings){
            $("#myTable").append(
              '<tr>'+
              '<td width="20%"><a aria-label="Link alla prenotazione. Identificativo:'+bookings[i]._id+'" href="reservation.html?id=' +bookings[i]._id+'">Prenotazione</td>'+
              '<td ><a aria-label="Link al prodotto prenotato '+bookings[i].productTitle+' '+bookings[i].productBrand+'" href="article.html?id=' +bookings[i].productId+'">'+bookings[i].productTitle+' '+bookings[i].productBrand+'</td>'+
              '<td tabindex="0" aria-label="Prezzo totale: '+bookings[i].totalPrice +'€" >'+bookings[i].totalPrice+'€</td>'+
              '<td tabindex="0" aria-label="Data inizio prenotazione '+bookings[i].startDate.day+"-"+bookings[i].startDate.month+"-"+bookings[i].startDate.year+'" >'+bookings[i].startDate.day+"-"+bookings[i].startDate.month+"-"+bookings[i].startDate.year+'</td>'+
              '<td tabindex="0" aria-label="Data fine prenotazione '+bookings[i].endDate.day+"-"+bookings[i].endDate.month+"-"+bookings[i].endDate.year+'" >'+bookings[i].endDate.day+"-"+bookings[i].endDate.month+"-"+bookings[i].endDate.year+'</td>'+
              '</tr>'
            )
          }
        }
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
  $("#name").attr("placeholder", data.userName);
  $("#name").val(data.userName);
  $("#surname").attr("placeholder", data.userSurname);
  $("#surname").val(data.userSurname);
  $("#identifier").attr("placeholder", data._id);
  $("#identifier").val(data._id);

  $("#sex").val(data.sex)

  $("#phone").attr("placeholder", data.phoneNumber);
  $("#phone").val(data.phoneNumber);
  $("#mail").attr("placeholder", data.email);
  $("#mail").val(data.email);

  $("#birthday").val(new Date(data.birthday.year, data.birthday.month, data.birthday.day));
  let month = data.birthday.month
  if (String(month).length < 2 && parseInt(data.birthday.month) < 10)
    month = '0' + String(month)
  let day = data.birthday.day
  if (String(day).length < 2 && parseInt(data.birthday.day) < 10)
    day = '0' + String(day)
  document.getElementById('birthday').value = data.birthday.year +'-'+ month +'-'+ day

  $("#street").attr("placeholder", data.address.addressStreet);
  $("#street").val(data.address.addressStreet);
  $("#num").attr("placeholder", data.address.addressNumber);
  $("#num").val(data.address.addressNumber);
  $("#city").attr("placeholder", data.address.addressCity);
  $("#city").val(data.address.addressCity);
  $("#cardType").attr("placeholder", data.payment.cardType);
  $("#cardType").val(data.payment.cardType);
  $("#cardName").attr("placeholder", data.payment.cardCode);
  $("#cardName").val(data.payment.cardCode);
  $("#owner").attr("placeholder", data.payment.cardOwner);
  $("#owner").val(data.payment.cardOwner);
  $("#cardMonth").attr("placeholder", data.payment.cardExpireMonth); 
  $("#cardMonth").val(data.payment.cardExpireMonth);
  $("#cardYear").attr("placeholder", data.payment.cardExpireYear);
  $("#cardYear").val(data.payment.cardExpireYear);
}

function modify(){
  console.log("modify")
  $("#myButtons").empty()
  $("#myButtons").append(
    '<button class="btn btn-lg btn-success" aria-label="Bottone salva. Cliccandolo i campi saranno salvati e resi non modificabili" >Salva</button>'+
    '<button type="button" id="reset" aria-label="Bottone annulla. Cliccandolo i campi ritorneranno allo stato originale e non modificabili" class="btn btn-lg btn-danger" >Annulla</button>'+
    '<button type="button" id="delete" aria-label="Bottone elimina. Cliccandolo il cliente sarà cancellato e verrai reindirizzato al catalogo" class="btn btn-lg btn-danger delete">Elimina cliente</button>'
  )
  boolModify = true
  readOnly()

}

function readOnly(){
  console.log("readOnly")
  if(!boolModify){
    $("form :input").each(function(){
      $(this).prop("disabled", true); 
    });
    $("select").prop("disabled", true);
    $("#change").prop("disabled", false);

  }
  else{ 
    $("form :input").each(function(){
      $(this).prop("disabled", false); 
    });
    $("#identifier").prop("readonly", true); 
    $("#mail").prop("readonly", true); 
    $("select").prop("disabled", false);
    if(!deletable){
      $("#delete").prop("disabled", true)
      $("#delete").text("Prenotazione attive")
    }
  }
}

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'reset'){
    reset()
   }
});

function reset(){
  console.log('reset')
  $("#myButtons").empty()
  $("#myButtons").append(
  '<button type="button" id="change" class="btn btn-lg btn-secondary" onclick="modify()">Modifica</button>'
  )
  boolModify = false
  fill()
  readOnly()
  
}
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'delete'){
    remove()
   }
});

function remove(){
  console.log('removeUser')
  $.ajax({
    url: "/api/user?id=" + data._id,
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

$('#formId').submit(function (evt) {
  evt.preventDefault();
  save()
});

function save() {
  let date = $("#birthday").val()
  date = date.split('-')
  let day, month, year

  if(data.birthday.day == date[0] && data.birthday.month == date[1] && data.birthday.year == date[2]){
    day = data.birthday.day
    month = data.birthday.month
    year = data.birthday.year
  }
  else{
    day = date[2]
    month = date[1]
    year = date[0]
  }
  let tmpYear = parseInt(year)
  console.log(tmpYear)
  if(tmpYear > 2003 && tmpYear < 1900)
    return(alert('Data non valida'))

  $.ajax({
    url:"/api/user?id=" + data._id,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: JSON.stringify({
      userName: $("#name").val(),
      userSurname: $("#surname").val(),
      birthday: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day)
      },
      sex: $("#sex").val(),
      phoneNumber: parseInt($("#phone").val()),
      email: $("#mail").val(),
      address: {
        addressStreet: $("#street").val(),
        addressNumber: $("#num").val(),
        addressCity: $("#city").val(),
      },
      payment: {
        cardType: $("#cardType").val(), 
        cardCode: parseInt($("#cardName").val()),
        cardOwner: $("#owner").val(),
        cardExpireMonth: parseInt($("#cardMonth").val()), 
        cardExpireYear: parseInt( $("#cardYear").val()),
      }
    }),
    // Risposta del server in caso di successo
    success: (result) => {
        console.log(result)
        data.userName = $("#name").val()
        data.userSurname = $("#surname").val()
        data.sex = $("#sex").val()
        data.birthday.year = year,
        data.birthday.month = month,
        data.birthday.day = day
        data.phoneNumber = $("#phone").val()
        data.email = $("#mail").val()
        data.address.addressStreet = $("#street").val()
        data.address.addressNumber = $("#num").val()
        data.address.addressCity = $("#city").val()
        data.payment.cardType = $("#cardType").val()
        data.payment.cardCode = $("#cardName").val()
        data.payment.cardOwner = $("#owner").val()
        data.payment.cardExpireMonth = $("#cardMonth").val()
        data.payment.cardExpireYear = $("#cardYear").val()
        alert("modifica riuscita")
        reset()
        //window.location.href = "http://localhost:8081/worker/client.html?id=" + data._id;
    },
    // Risposta del server in caso di insuccesso
    error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
    }
	});
}

$(document).ready(function(){
	$("#myInput").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'searchButton'){
    $("#main").empty()
  }
});