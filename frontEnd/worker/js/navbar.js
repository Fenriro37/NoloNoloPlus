let reservations = []

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
            window.location = "../public/login.html";
        }
        getAllArticle("")
      },
      // Risposta del server in caso di insuccesso
      error: (error) => {
        window.location = "../public/login.html"
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

function logout(){
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('sparta')
    window.location = "http:/localhost:8081/public/login.html";
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
                                    '<div class="col-5 d-flex align-items-center h-100"> <img class="myImg " tabindex="0" alt="Immagine: ' +articles[i].title + " " + articles[i].brand +'" src='+ articles[i].image +'></div>' +
                                    '<div class="col-7" style="height:100%;">'+
                                        '<h2 class="text-truncate"><a aria-label="Link a prodotto '+articles[i].title + " " + articles[i].brand+ '" href="article.html?id=' +articles[i]._id+ '">'+ articles[i].title + " " + articles[i].brand + '</a></h2> '+ 
                                        '<div class="row">' +
                                            '<div class="col-5">'+
                                                '<div tabindex="0" aria-label="Prezzo fisso '+articles[i].fixedPrice+ '€" id="price' +i+ '"></div>' +
                                            '</div>'+
                                            '<div class="col-5">'+
                                                '<div tabindex="0" aria-label="Prezzo giornaliero '+articles[i].price+ '€" id="dailyPrice' +i+ '"></div>' +
                                            '</div>'+
                                        '</div>'+
                                        '<div tabindex="0" aria-label="qualità: '+articles[i].quality+ ' stelle su tre" ><span id="star' +i+ '"></span></div>'+
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
                        newPrice = articles[i].fixedPrice - articles[i].discount.onSaleValue;
                    }
                    else{
                        newPrice = articles[i].fixedPrice - articles[i].fixedPrice * articles[i].discount.onSaleValue / 100;
                    }
                    $("#price"+ i).append(
                        '<span class="price"><s>' +articles[i].fixedPrice+'€  </s><span>' +newPrice+ '€</span></span>'
                    )
                }
                else{
                    $("#price"+ i).append(
                        '<span class="price">' +articles[i].fixedPrice+'€<span>'
                    )
                }
                $("#dailyPrice"+ i).append(
                    '<span class="price">' +articles[i].price+'€/giorno </span>'
                )
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
                if(articles[i].discount.onSale){
                    let fixedPrice = document.getElementById('price' +i);
                    let newPrice = 0
                    if(articles[i].discount.onSaleType){
                        newPrice = (articles[i].fixedPrice - articles[i].fixedPrice * articles[i].discount.onSaleValue / 100)//.toFixed(2)

                    }   
                    else{
                        (articles[i].fixedPrice - articles[i].discount.onSaleValue)//.toFixed(2);
                    }
                    fixedPrice.ariaLabel = "Prezzo fisso "+articles[i].fixedPrice+ "€"
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
                                    '<div class="col-4 align-items-center h-100"> <img class="myImg" tabindex="0" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"  alt="Immagine utente generico"></div>' +
                                    '<div class="col-8 text-truncate" style="height:100%;"> <h2><a aria-label="Link alla pagina del Cliente '+user.userName + ' ' + user.userSurname+'" href="client.html?email=' +user.email+ '">'+ user.userName + ' ' + user.userSurname + '</a></h4>'+ 
                                        '<h4 tabindex="0" aria-label="Email cliente: '+user.email+'">Email: ' +user.email+'</h4>'+ 
                                        '<h4 tabindex="0" aria-label="Numero telefono: '+user.phoneNumber+ '" >Tel: ' +user.phoneNumber+ '</h4>'+ 
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
            '<div class="mt-2">'+
                '<button class="btn btn-secondary dropdown-toggle" aria-label="Bottone a tendina per filtrare le prenotazioni"  id="reservationsFilter" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tutte</button>'+
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
                        '<div class="col-5 align-items-center h-100"> <img tabindex="0" class="myImg " alt="immagine '+data[i].productTitle + " " + data[i].productBrand+'" src='+ data[i].productImage +'></div>' +
                        '<div class="col-7" style="height:100%;"> '+
                            '<h4 class="text-truncate">Id: <a aria-label="Link alla prenotazione '+data[i]._id+'" href="reservation.html?id=' +data[i]._id+ '">' +data[i]._id+ '</a></h4>' +
                            '<h4 class="text-truncate">Articolo: <a aria-label="Link al prodotto '+data[i].productTitle + " " + data[i].productBrand+'" href="article.html?id=' +data[i].productId+ '">' +data[i].productTitle + " " + data[i].productBrand + '</a></h4>' +
                            '<h4 class="text-truncate">Cliente: <a aria-label="Link al cliente prenotante '+data[i].clientEmail+'" href="client.html?id=' +data[i].clientEmail+ '">' +data[i].clientEmail+ '</a></h4>' +
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
