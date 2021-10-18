const app = Vue.createApp({
    data() {
        return {
            title: 'Bici',
            brand: 'RockRider',
            image: './assets/images/bici.jpg',
            description: "Questa bici è verde, maneggevole e leggera. I bambini possono guardarla. Odio vitali",
            note: "Porcodio",
            price: 120.99,
            discount: {
                onSale: false,
                // onSaleType indica il tipo di sconto:
                // - true se è uno sconto percentuale
                // - false se è uno sconto fisso
                onSaleType: false,
                onSaleValue: 10
            },
            quality: 2,
            tags: ["veicolo", "bicicletta", "a", "c"],
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

