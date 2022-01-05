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
            let articles = result.data
            for (let i in articles){
                $( "#catalog" ).append(
                    '<div class="row single justify-content-center">' +
                    '<div class="col-5"> <img class="img-thumbnail" alt="immagine prodotto" src='+ articles[i].image +'></div>' +
                    '<div class="col-5"> <h2><a href="article.html?id=' +articles[i]._id+ '">'+ articles[i].title + " " + articles[i].brand + '</a></h2> <h2>' +articles[i].price+'€</h2>' +
                    '<span id="star' +i+ '"></span></div>' +
                    '</div>'
                );  
                let j;
                for ( j = 0; j < articles[i].quality; j++){
                    $("#star" + i).append(
                        '<i class="bi bi-star-fill checked big-size"</i>'
                    )
                }
                for (j = 0; j < 3 - articles[i].quality; j++){
                    $("#star" + i).append(
                        '<i class="bi bi-star big-size"</i>'
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
      
