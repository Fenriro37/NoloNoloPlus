window.addEventListener("load", () => {
    alert("Questo è un progetto universitario, inserisci dei dati fittizi");
    // Seleziona il bottone per inviare il form
    $("#signUpButton").click((event) => event.preventDefault());
    $("#signUpButton").click(async () => {
        // Cattura dei dati
        const data = []
        $(".card input").each(function() {
            data.push($(this).val())
        });
        $(".card select").each(function() {
            data.push($(this).val())
        });
        const birthday = data[2].split("-");
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
        console.log(data)
        if(allDataOk) {
            // Invio dei dati
            $.ajax({
                url: "/api/public/sign-up",
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
                    sex: data[13],
                    phoneNumber: data[3],
                    email: data[4],
                    plainTextPassword: data[5],
                    address: {
                        addressStreet: data[6],
                        addressNumber: data[7],
                        addressCity: data[8]
                    },
                    paymentMethod: {
                        cardType: data[14],
                        cardCode: data[9],
                        cardOwner: data[10],
                        cardExpireMonth: data[15],
                        cardExpireYear: data[16],
                        cardCCV: data[11]
                    }
                }),
                // Risposta del server in caso di successo
                success: () => {
                    console.log("Success");
                    window.location.href = "/public/login.html";
                },
                // Risposta del server in caso di insuccesso
                error: (error) => {
                    alert("Errore. " + error.responseJSON.message);
                }
            });
        }
    });
});