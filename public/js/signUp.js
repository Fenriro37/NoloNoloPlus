window.addEventListener("load", () => {
    // Seleziona il bottone per inviare il form
    $("#invia").click((event) => event.preventDefault());
    $("#invia").click(async () => {
        // Cattura dei dati
        const data = []
        $(".card input").each(function() {
            data.push($(this).val())
        });
        // Controllo dei dati con una stampa
        console.log(data)
        // Invio dei dati
        $.ajax({
            url: "/signUp",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                user: data[0],
                email: data[2],
                password: data[3],
                address: data[1],
                payment: data[4]
            }),
            // Risposta del server in caso di successo
            success: () => {
                window.location.replace("/login.html");
            },
            // Risposta del server in caso di insuccesso
            error: (error) => {
                alert("Errore. " + error.responseText);
            }
        });
    });
});