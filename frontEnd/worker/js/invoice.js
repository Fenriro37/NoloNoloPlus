let data = {};

window.onload = function getReservation() {
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
          window.location = "http://localhost:8081/worker/navbar.html?";
        }
    });
  }

  function insertData(){
    $("#ricevente").append(data.clientName + " " + data.clientSurname)
    $("#emittente").append("NonoNonoPlus")
    $("#idFattura").append(data._id)
    $("#dataCrazione").append(data.endDate.day + '/' + data.endDate.month + '/' + data.endDate.year)

    $("#prezzoFisso").append((data.fixedPrice / 122 * 100).toFixed(2))
    $("#calcoloFisso").append(data.fixedDiscount.onSale ? 
      (data.fixedDiscount.onSaleType ? data.fixedDiscount.onSaleValue + "%" : data.fixedDiscount.onSaleValue + "€") : 0)
    $("#imponibileFisso").append(data.fixedDiscount.onSaleType ? 
      $("#prezzoFisso").val() * $("#calcoloFisso").val() : $("#prezzoFisso").val() - $("#calcoloFisso").val())

    $("#nGiorni").append(calculateDays(data.startDate, data.endDate))
    $("#prezzoVariabile").append((data.variablePrice / 122 * 100).toFixed(2))
    $("#calcoloVariabile").append(data.variableDiscount.onSale && calculateDays(data.startDate, data.endDate) > data.variableDiscount.days ?
      (data.variableDiscount.onSaleType ? data.variableDiscount.onSaleValue + "%" : data.fixedDiscount.onSaleValue + "€") : 0)
    $("#imponibileVariabile").append($("#prezzoVariabile").val() * $("#calcoloVariabile").val())
  } 

  function calculateDays(obj1, obj2){
    //Create Dates
    var date1 = new Date(obj1.year, obj1.month-1, obj1.day) 
    var date2 = new Date(obj2.year, obj2.month-1, obj2.day)

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime()
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

    return Difference_In_Days+1
  }