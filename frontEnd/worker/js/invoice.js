let data = {};

window.onload = function login() {
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
      $.ajax({
        url: "/api/reservation?id=" + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: (result) => {
          data = result.data.obj
          console.log(data)
          insertData(data)
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
  

  function calculateDays(obj1, obj2){
    //Create Dates
    console.log(obj1)
    console.log(obj2)
    var date1 = new Date(obj1.year, obj1.month-1, obj1.day) 
    var date2 = new Date(obj2.year, obj2.month-1, obj2.day)

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime()
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

    return Difference_In_Days+1
  }

  function scorporo(price) {
    return price / 122 * 100;
  }
  
  function insertData(data){
    // Variabili noti
    userName = data.userName
    userSurname = data.userSurname
    userEmail = data.userEmail

    enterpriseName = 'NoloNoloPlus'

    invoiceId = data._id
    date = data.endDate

    productTitle = data.productTitle
    productBrand = data.productBrand

    days = calculateDays(data.startDate, data.endDate)
    console.log(days)

    // Sono i prezzi lordi
    fixedPrice = parseFloat(data.fixedPrice)
    variablePrice = parseFloat(data.variablePrice)

    // Sconto di tipo oggetto
    fixedDiscount = data.fixedDiscount
    variableDiscount = data.variableDiscount

    // Valori in Prezzo
    prezzoFissoSenzaIva = scorporo(fixedPrice)
    prezzoVariabileSenzaIva = scorporo(variablePrice)
    // Valori in Imponibile
    imponibileFisso = prezzoFissoSenzaIva
    if(fixedDiscount.onSale == true) {
      if(fixedDiscount.onSaleType == true) {
        imponibileFisso = scorporo(fixedPrice * (100 - parseFloat(fixedDiscount.onSaleValue)) / 100)
      } else {
        imponibileFisso = scorporo(fixedPrice) - scorporo(parseFloat(fixedDiscount.onSaleValue))
      }
    }
    imponibileVariabile = prezzoVariabileSenzaIva * days
    if(variableDiscount.onSale == true && days > variableDiscount.days) {
      if(variableDiscount.onSaleType == true) {
        imponibileVariabile = scorporo(variablePrice * days * (100 - parseFloat(variableDiscount.onSaleValue)) / 100)
      } else {
        imponibileVariabile = scorporo(variablePrice * days - parseFloat(variableDiscount.onSaleValue)) 
      }
    }
    // Valori in Sconto
    scontoFisso = 0
    if(fixedDiscount.onSale == true) {
      if(fixedDiscount.onSaleType == true) {
        scontoFisso = parseFloat(fixedDiscount.onSaleValue)
      } else {
        scontoFisso = 100 - (imponibileFisso / prezzoFissoSenzaIva * 100)
      }
    }
    scontoVariabile = 0
    if(variableDiscount.onSale == true && days > variableDiscount.days) {
      if(variableDiscount.onSaleType == true) {
        scontoVariabile = parseFloat(variableDiscount.onSaleValue)
      } else {
        scontoVariabile = 100 - (imponibileVariabile / days / prezzoVariabileSenzaIva * 100)
      }
    }

    var totale = imponibileFisso + imponibileVariabile
    var penale = 0
    if(new Date() > new Date(data.endDate.year, data.endDate.month - 1, data.endDate.day) && data.isReturned == false && data.isTaken == true){
       penale = (imponibileFisso + imponibileVariabile) * 1.22 * 0.1
     }

    //Inserimento campi
    $("#ricevente").append(data.clientName + " " + data.clientSurname + " - " + data.clientEmail)
    $("#emittente").append("NonoNonoPlus")
    $("#idFattura").append(data._id)
    $("#dataCrazione").append(data.endDate.day + '/' + data.endDate.month + '/' + data.endDate.year)
    
    $("#descrizioneFisso").append(data.productTitle + " " + data.productBrand + " (fisso)")
    $("#descrizioneVariabile").append(data.productTitle + " " + data.productBrand + " (variabile)")
    $("#nGiorni").append(days)
    $("#prezzoFisso").append((prezzoFissoSenzaIva).toFixed(2) + " €")
    $("#prezzoVariabile").append((prezzoVariabileSenzaIva).toFixed(2) + " €")
    $("#scontoFisso").append((scontoFisso).toFixed(2) + "%")
    $("#scontoVariabile").append((scontoVariabile).toFixed(2) + "%")
    $("#imponibileFisso").append((imponibileFisso).toFixed(2) + " €")
    $("#imponibileVariabile").append((imponibileVariabile).toFixed(2) + " €")
    
    $("#totaleImponibile").append((totale).toFixed(2) + " €")
    $("#totaleIVA").append((totale * 0.22).toFixed(2) + " €")
    $("#penale").append((penale).toFixed(2) + " €")
    $("#totale").append((totale + totale * 0.22 + penale).toFixed(2) + " €")
    $("#note").append(data.description)    
  } 