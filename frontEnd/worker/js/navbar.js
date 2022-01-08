let reservations = []

window.onload = function login() {
  $.ajax({
      url: "/api/public/login",
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify({
          email: "han.chu@worker.com",
          plainTextPassword: "1234567890"
      }),
      // Risposta del server in caso di successo
      success: (result) => {
          console.log(result)
          document.cookie = 'jwt=' + result.data;
          getAllArticle("")


          //window.location.href = "http://localhost:8081/user/index.html";
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
          console.log("Error");
          alert("Errore. " + error.responseText);
      }
  });
}

 function changeTextDropdown(val){
    if (val === 0 ){
        $("#dropNavBar").text("Articoli") 
    }
    else if(val === 1){
        $("#dropNavBar").text("Clienti") 
    }
    else{
        $("#dropNavBar").text("Prenotazioni") 
    }
       
}

 function search(){
    let text = $("#searchText").val();
    if($("#dropNavBar").text() == "Articoli"){
        getAllArticle(text)
    }
    else if($("#dropNavBar").text() == "Clienti"){
        getAllClient(text)
    }
    else{
        getAllReservation(text)
    }

}

 function getAllArticle(text){
    let query = {
        filter: text,
        sort: false
    }
    let customUrl = "/api/product/all/?filter=" + query.filter + "&sort=" + query.sort

    $.ajax({
        url: customUrl,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: (result) => {
            console.log(result)
            $("#catalog").empty()
            let articles = result.data
            for (let i in articles){
                $( "#catalog" ).append(
                    '<div class="d-flex justify-content-center align-items-center">' +
                        '<div class="card mb-1 mt-1" style="height: 10em; width:60%; ">' +
                            '<div class="card-body h-100">' +
                                '<div class="row h-100">' +
                                    '<div class="col-5 align-items-center h-100"> <img class="myImg " alt="immagine prodotto" src='+ articles[i].image +'></div>' +
                                    '<div class="col-7 text-truncate" style="height:100%;">'+
                                        '<h2><a href="article.html?id=' +articles[i]._id+ '">'+ articles[i].title + " " + articles[i].brand + '</a></h2> '+ 
                                        '<div id="price' +i+ '"></div>' +
                                        '<span id="star' +i+ '"></span>'+
                                    '</div>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );  
                //prezzo
                if(articles[i].discount.onSale){
                    let newPrice
                    if(articles[i].discount.onSaleType){
                        newPrice = articles[i].price - articles[i].discount.onSaleValue;
                    }
                    else{
                        newPrice = articles[i].price - articles[i].price * articles[i].discount.onSaleValue / 100;
                    }
                    $("#price"+ i).append(
                        '<span class="price"><s>' +articles[i].price+'€  </s><span>' +newPrice+ '€</span></span>'
                    )
                }
                else{
                    $("#price"+ i).append(
                        '<span class="price">' +articles[i].price+'€<span>'
                    )
                }
                //stelle
                let j;
                for ( j = 0; j < articles[i].quality; j++){
                    $("#star" + i).append(
                        '<span class="bi bi-star-fill checked big-size"</span>'
                    )
                }
                for (j = 0; j < 3 - articles[i].quality; j++){
                    $("#star" + i).append(
                        '<span class="bi bi-star big-size"</span>'
                    )
                }
            }             
            //window.location.href = "http://localhost:8081/user/index.html";
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });
}
      
 function getAllClient(text){
    let query = {
        filter: text,
        sort: false
    }
    let customUrl = "/api/user/all?filter=" + query.filter + "&sort=" + query.sort

    $.ajax({
        url: customUrl,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: (result) => {
            console.log(result)
            $("#catalog").empty()
            let clients = result.data
            clients.forEach(user => {
                $("#catalog").append(
                    '<div class="d-flex justify-content-center align-items-center">' +
                        '<div class="card mb-1 mt-1" style="height: 10em; width:60%; ">' +
                            '<div class="card-body h-100">' +
                                '<div class="row h-100">' +
                                    '<div class="col-4 align-items-center h-100"> <img class="myImg " src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"  alt="Immagine utente base"></div>' +
                                    '<div class="col-8 text-truncate" style="height:100%;"> <h2><a href="client.html?email=' +user.email+ '">'+ user.userName + ' ' + user.userSurname + '</a></h4>'+ 
                                        '<h4>Email: ' +user.email+'</h4>'+ 
                                        '<h4>Tel: ' +user.phoneNumber+ '</h4>'+ 
                                    '</div>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );  
            });        
            //window.location.href = "http://localhost:8081/user/index.html";
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });
}

 function getAllReservation(text){
    let query = {
        filter: text,
        sort: false
    }
    let customUrl = "/api/reservation/all?filter=" + query.filter + "&sort=" + query.sort

    $.ajax({
        url: customUrl,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Risposta del server in caso di successo
        success: (result) => {
            console.log(result)
            $("#catalog").empty()
            reservations = result.obj
            $("#catalog").append(
            '<div >'+
                '<button class="btn btn-secondary dropdown-toggle"  id="reservationsFilter" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tutte</button>'+
                '<div class="dropdown-menu dropdown-menu-right">'+
                    '<button class="dropdown-item" type="button" id="all">Tutte</button>'+
                    '<button class="dropdown-item" type="button" id="active">Attive</button>'+
                    '<button class="dropdown-item" type="button" id="old">Concluse</button>'+
                '</div>'+
            '</div>'
            );
            fillReservation(reservations)
            
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });   
}

 function fillReservation(data){
    for(let i in data) {
        $("#catalog").append(
        '<div id="'+i+'" class="d-flex justify-content-center align-items-center">' +
            '<div class="card mb-1 mt-1" style="height: 10em; width:60%; ">' +
                '<div class="card-body h-100">' +
                    '<div class="row h-100">' +
                        '<div class="col-5 align-items-center h-100"> <img class="myImg " alt="immagine prodotto" src='+ data[i].productImage +'></div>' +
                        '<div class="col-7" style="height:100%;"> '+
                            '<h4 class="text-truncate">Id: <a href="reservation.html?id=' +data[i]._id+ '">' +data[i]._id+ '</a></h4>' +
                            '<h4 class="text-truncate">Articolo: <a href="article.html?id=' +data[i].productId+ '">' +data[i].productTitle + " " + data[i].productBrand + '</a></h4>' +
                            '<h4 class="text-truncate">Cliente: <a href="client.html?id=' +data[i].clientEmail+ '">' +data[i].clientEmail+ '</a></h4>' +
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
        );  
    };
}


document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'all'){
        $("#reservationsFilter").text("Tutte")  
        let bookings = []   
        for(let i in reservations){
            $("#" + i).remove()
            bookings[i] = reservations[i]      
        }
        console.log(bookings)
        fillReservation(reservations)
    }
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'active'){
        $("#reservationsFilter").text("Attive")    
        let bookings = []   
        for(let i in reservations){
            $("#" + i).remove()
            if(reservations[i].isTaken && !reservations[i].isReturned){
                bookings[i] = reservations[i]
            }     
        }
        console.log(bookings)
        fillReservation(bookings)
    }
 });

 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'old'){
        $("#reservationsFilter").text("Concluse")   
        let bookings = [] 
        for(let i in reservations){
            $("#" + i).remove()
            if(reservations[i].isTaken && reservations[i].isReturned){
                bookings[i] = reservations[i]
            }
        }    
        console.log(bookings)
        fillReservation(bookings)
    }
 });
