import config from './../../config';

window.addEventListener("load", () => {
    // Seleziona il bottone per inviare il form
    $("#loginButton").click((event) => event.preventDefault());
    $("#loginButton").click(async () => {
        // Cattura dei dati
        const data = []
        $(".card input").each(function() {
            data.push($(this).val())
        });
        // Controllo dei dati
        var allDataOk = true
        for(index in data) {
            console.log(data[index])
            if(data[index] == "") {
                alert("Non hai inserito tutti i dati.");
                allDataOk = false;
                break;
            }
        }
        // Invio dei dati
        if(allDataOk) {
            // Invio dei dati
            $.ajax({
                url: "/api/public/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    email: data[0],
                    plainTextPassword: data[1]
                }),
                // Risposta del server in caso di successo
                success: (result) => {
                    document.cookie = 'jwt=' + result.data;
                    window.location.href = config.site202131Url;
                },
                // Risposta del server in caso di insuccesso
                error: (error) => {
                    console.log("Error");
                    alert("Errore. " + error.responseText);
                }
            });
        }
    });
});