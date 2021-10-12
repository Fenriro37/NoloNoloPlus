window.addEventListener("load", () => {
    // Seleziona il bottone per inviare il form
    $("#signUp").click((event) => event.preventDefault());
    $("#signUp").click(async () => {
        // Cattura dei dati
        const data = []
        $(".card input").each(function() {
            data.push($(this).val())
        });
        $(".card select").each(function() {
            data.push($(this).val())
        });
        const birthday = data[2].split("-");
        // Controllo dei dati con una stampa
        console.log(data)
        console.log(birthday)
        // Invio dei dati
        $.ajax({
            url: "/signUp",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                userName: data[0],
                userSurname: data[1],
                birthday: {
                    year: birthday[0],
                    month: birthday[1],
                    day: birthday[2]
                },
                phone: data[3],
                email: data[4],
                password: data[5],
                address: {
                    addressStreet: data[6],
                    addressNumber: data[7],
                    addressCity: data[8]
                },
                paymentMethod: {
                    cardType: data[14],
                    cardName: data[9],
                    cardSurname: data[10],
                    cardExpireMonth: data[15],
                    cardExpireYear: data[16],
                    cardCCV: data[11]
                }
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