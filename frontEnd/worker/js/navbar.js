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
          //$("#reservationsWrap").hide();
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
        $(".btn.dropdown-toggle").text("Articoli") 
    }
    else if(val === 1)
        $(".btn.dropdown-toggle").text("Clienti") 
    else
        $(".btn.dropdown-toggle").text("Prenotazioni") 
}

function search(){
    let text = $("#searchText").val();
    if($(".btn.dropdown-toggle").text() == "Articoli"){
        getAllArticle(text)
    }
    else if($(".btn.dropdown-toggle").text() == "Clienti"){
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
            const myCatalog = document.getElementById("catalog");
            myCatalog.textContent = '';
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
            const myCatalog = document.getElementById("catalog");
            myCatalog.textContent = '';
            let clients = result.data
            clients.forEach(user => {
                $("#catalog").append(
                    '<div class="d-flex justify-content-center align-items-center">' +
                        '<div class="card mb-1 mt-1" style="height: 10em; width:60%; ">' +
                            '<div class="card-body h-100">' +
                                '<div class="row h-100">' +
                                    '<div class="col-5 align-items-center h-100"> <img class="myImg " src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"  alt="Immagine utente base"></div>' +
                                    '<div class="col-7 text-truncate" style="height:100%;"> <h2><a href="client.html?email=' +user.email+ '">'+ user.userName + ' ' + user.userSurname + '</a></h4>'+ 
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
            const myCatalog = document.getElementById("catalog");
            myCatalog.textContent = '';
            let reservations = result.obj
            //$("#reservationsWrap").show();
            reservations.forEach(reservation => {
                $("#catalog").append(
                '<div class="d-flex justify-content-center align-items-center">' +
                    '<div class="card mb-1 mt-1" style="height: 10em; width:60%; ">' +
                        '<div class="card-body h-100">' +
                            '<div class="row h-100">' +
                                '<div class="col-5 align-items-center h-100"> <img class="myImg " alt="immagine prodotto" src='+ reservation.productImage +'></div>' +
                                '<div class="col-7" style="height:100%;"> '+
                                    '<h4 class="text-truncate">Id: <a href="reservation.html?id=' +reservation._id+ '">' +reservation._id+ '</a></h4>' +
                                    '<h4 class="text-truncate">Articolo: <a href="article.html?id=' +reservation.productId+ '">' +reservation.productTitle + " " + reservation.productBrand + '</a></h4>' +
                                    '<h4 class="text-truncate">Cliente: <a href="client.html?id=' +reservation.clientEmail+ '">' +reservation.clientEmail+ '</a></h4>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
                );  
            });
        },
        // Risposta del server in caso di insuccesso
        error: (error) => {
            console.log("Error");
            alert("Errore. " + error.responseText);
        }
    });   
}



//document.getElementById("reservations").addEventListener("change", changeReservation);

function changeReservation(){
    if($("#reservations").val() == "all"){
        //check date e inserire in un array
        //chiamare una funzione che display l'array
        console.log(1)
    }
    else if($("#reservations").val() == "active"){
        //check date e inserire in un array
        console.log(2)
    }
    else{
        //check date e inserire in un array
        console.log(3)
    }
}