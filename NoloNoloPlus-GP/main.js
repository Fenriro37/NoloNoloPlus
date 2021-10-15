const app = Vue.createApp({
    data() {
        return {
            title: 'Bici',
            brand: 'RockRider',
            image: './assets/images/bici.jpg',
            description: "Questa bici è verde, maneggevole e leggera. I bambini possono guardarla. Odio vitali",
            price: 20.99,
            onSale: 1,
            discountPercentage: 0,
            discountAmount: 0,
            quality: 2,
            tags: ["veicolo", "bicicletta", "a", "c"],
            bookings: [
                { id: 2234, clientId: 1111, startDate:"21/03/2019", endDate:"23/03/2019"},
                { id: 2236, clientId: 1912, startDate:"21/06/2019", endDate:"23/09/2019"},
            ]
        }
    },
    methods: {
        printBooking(index){
            return this.bookings[index].id + ' ' + this.bookings[index].clientId + ' ' + 
                   this.bookings[index].startDate + ' ' + this.bookings[index].endDate
        },
    },
    computed: {
        number() {
            return this.price + "€"
        },
        sale() {
            return this.price/2 + "€"
        },
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
            return !this.onSale;
        },
        getDiscountedPrice() {
            if(discountPercentage) {
                return price - price * discountPercentage / 100
            } else {
                return price - discountAmount
            }
        }
    }
})

