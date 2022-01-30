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
    $("#emittente").append(" ")
    $("#emittente").append(" ")
    fill()
  } 