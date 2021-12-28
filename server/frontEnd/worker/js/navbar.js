 function login() {
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
    if($(".btn.dropdown-toggle").text() == "Articoli"){
        getAllArticle()
    }
    else if($(".btn.dropdown-toggle").text() == "Clienti"){

    }
    else{

    }

}

function getAllArticle(){
    let text = $("#searchText").val();
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
            result.data.forEach(article => {
                $( "#catalog" ).append(
                    '<div class="row single justify-content-center">' +
                    '<div class="col-5"> <img class="img-thumbnail" alt="immagine prodotto" src='+ article.image +'></div>' +
                    '<div class="col-5"> <h2><a href="article.html?id=' +article._id+ '">'+ article.title + " " + article.brand + '</a></h2> <h2>' +article.price+'€</h2>' +
                    '<span id="star" ></span></div>' +
                    '</div>'
                );  
                console.log(article.quality + article.title)
                let i;
                for ( i = 0; i < article.quality; i++){
                    console.log("color")
                    $("#star").append(
                        '<i class="bi bi-star-fill checked big-size</i>'
                    )
                }
                for (i = 0; i < 3 - article.quality; i++){
                    console.log("start")
                    $("#star").append(
                        '<i class="bi bi-star big-size </i>'
                    )
                }
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
      
