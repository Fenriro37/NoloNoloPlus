const app = Vue.createApp({
    data() {
        // chiami mongodb
        // scorpori i dati ricevuti
        // li metti nelle variabili: title, brand,...
        return {
            title: 'Bici',
            brand: 'RockRider',
            image: 'https://acquisti.corriere.it/wp-content/uploads/2021/05/BIciclette-Via-Veneto.jpeg',
            tags: ["veicolo", "bicicletta", "a", "c"],
            quality: 2,
            price: 120.99,
            discount: {
                onSale: true,
                // onSaleType indica il tipo di sconto:
                // - true se è uno sconto percentuale
                // - false se è uno sconto fisso
                onSaleType: false,
                onSaleValue: 10
            },
            available: true,
            description: `The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et malorum'.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "Neque porro quisquam est qui do-" and continues on page 36 with "lorem ipsum ...", suggesting that the galley type of that page was mixed up to make the dummy text seen today.[1]
            The discovery of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected Lorem ipsum to Cicero's writing sometime before 1982 while searching for instances of the Latin word consectetur, which was rarely used in classical literature.[2] McClintock first published his discovery in a 1994 letter to the editor of Before & After magazine, contesting the editor's earlier claim that Lorem ipsum held no meaning.[2]`,
            note: "Porcodio",
            bookings: [
                { id: 2234, clientId: 1111, startDate:"21/03/2019", endDate:"23/03/2019"},
                { id: 2236, clientId: 1912, startDate:"21/06/2019", endDate:"23/09/2019"},
            ]
        }
    },
    methods: {
        printBooking(index) {
            return this.bookings[index].id + ' ' + this.bookings[index].clientId + ' ' + 
                   this.bookings[index].startDate + ' ' + this.bookings[index].endDate
        },
        updateTags() {
            console.log("mi hai cliccato");
            // $(...) ottiene seleziona il textarea
            // .val() ottiene la stringa del textarea
            // .split(/\s+/) divide la stringa per newline e spazio
            // .split(/\s+/) divide la stringa per newline e spazio
            // [...new Set(...)] rimuove i duplicati
            this.tags = [...new Set($("#tagsTextarea").val().split(/\s+/))];
        },
    },
    computed: {
        reservetion(index) {
            return this.bookings[index].id + ' ' + this.bookings[index].clientId + ' ' + 
                   this.bookings[index].startDate + ' ' + this.bookings[index].endDate
        },
        getTags() {
            var x = ""
            for(index in this.tags) {
                x += this.tags[index] + "\n"
            }
            return x
        },
        isDisabled: function(){
            return !this.discount.onSale;
        },
        getDiscountedPrice() {
            if(this.discount.onSaleType) {
                return (this.price - this.price * this.discount.onSaleValue / 100).toFixed(2);
            } else {
                return (this.price - this.discount.onSaleValue).toFixed(2);
            }
        }
    }
})

