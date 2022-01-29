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
                    document.cookie = 'jwt=' + result.data.token;
                    switch(result.data.userType) {
                        case 0:
                            window.location.href = '/user/index.html';
                            break;
                        case 1:
                            window.location.href = '/worker/index.html';
                            break;
                        case 2:
                            window.location.href = '/manager/index.html';
                            break;
                        default:
                            alert('Utente sconosciuto.')
                    }
                },
                // Risposta del server in caso di insuccesso
                error: (error) => {
                    alert("Errore. " + error.responseText.message);
                }
            });
        }
    });
});