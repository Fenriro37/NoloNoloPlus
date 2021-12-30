let data = {}
window.onload = function getClient() {
  
  var url = window.location.href;
  var email = url.substring(url.lastIndexOf('=') + 1);
  let customUrl = "/api/user?id=" + email
  $.ajax({
      url: customUrl,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      // Risposta del server in caso di successo
      success: (result) => {
        data = result.data
        fill()
        console.log(data)
          
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
        console.log("Error");
        alert("Errore. " + error.responseText);
      }
  });
}

function fill(){
  $("#name").append(
    '<input type="text" class="form-control" placeholder="' +data.userName+ '" aria-label="Name" aria-describedby="basic-addon1" readonly>'
  )
  $("#surname").append(
    '<input type="text" class="form-control" placeholder="' +data.userSurname+ '" aria-label="surname" aria-describedby="basic-addon2" readonly>'
  )
  $("#identifier").append(
    '<input type="text" class="form-control" placeholder="' +data._id+ '" aria-label="identifier" aria-describedby="basic-addon3" readonly>'
  )
  $("#sex").append(
    '<select class="form-select" aria-label="Default select example" disabled>'+
      +data.sex+
      '<option value="1">M</option>'+
      '<option value="2">F</option>'+
      '<option value="3">Altro</option>'+
    '</select>'
  )
  $("#phone").append(
    '<input type="tel" class="form-control" placeholder="' +data.phoneNumber+ '" aria-label="phone" aria-describedby="basic-addon5" readonly>'
  )
  $("#mail").append(
    '<input type="tel" class="form-control" placeholder="' +data.email+ '" aria-label="mail" aria-describedby="basic-addon6" readonly>'
  )
  $("#birthday").append(
    '<input type="tel" class="form-control" placeholder="' +data.birthday.day +'-'+data.birthday.month+'-'+data.birthday.year+ '" aria-label="birthday" aria-describedby="basic-addon7" readonly>'
  )
  $("#street").append(
    '<input type="tel" class="form-control" placeholder="' +data.address.addressStreet +'" aria-label="street" aria-describedby="basic-addon8" readonly>'
  )
  $("#num").append(
    '<input type="tel" class="form-control" placeholder="' +data.address.addressNumber+'" aria-label="num" aria-describedby="basic-addon9" readonly>'
  )
  $("#city").append(
    '<input type="tel" class="form-control" placeholder="' +data.address.addressCity+ '" aria-label="city" aria-describedby="basic-addon10" readonly>'
  )
  $("#cardType").append(
    '<input type="tel" class="form-control" placeholder="' +data.payment.cardType+ '" aria-label="cardType" aria-describedby="basic-addon11" readonly>'
  )
  $("#cardName").append(
    '<input type="tel" class="form-control" placeholder="' +data.payment.cardName+ '" aria-label="cardName" aria-describedby="basic-addon12" readonly>'
  )
  $("#owner").append(
    '<input type="tel" class="form-control" placeholder="' +data.payment.cardSurname+ '" aria-label="owner" aria-describedby="basic-addon13" readonly>'
  )
  $("#cardMonth").append(
    '<input type="tel" class="form-control" placeholder="' +data.payment.cardExpireMonth+ '" aria-label="cardMonth" aria-describedby="basic-addon14" readonly>'
  )
  $("#cardYear").append(
    '<input type="tel" class="form-control" placeholder="' +data.payment.cardExpireYear+ '" aria-label="cardYear" aria-describedby="basic-addon15" readonly>'
  )
}

/*
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-success" @click="saveData" >Salva</b-button>
    <b-button v-if="boolModify" type="button" class="btn btn-lg btn-danger" @click="undoChange">Annulla</b-button>
    <b-button type="button" class="btn btn-lg btn-danger delete" @click="deleteUser">Elimina cliente</b-button>
*/