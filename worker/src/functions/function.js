// import $ from 'jquery'
import http from './http'

class Functions {

    loginAsWorker() {
        let result = http.post(
            "/api/public/login",
            {
                email: "han.chu@worker.com",
                plainTextPassword: "1234567890"
            }
        );
        return result;
    }

    //////////////API relative ai prodotti///////////////////////////////////////////////
    getProduct(id) {
        return http.get("/api/product/?id=" + id)
    }

    getAllProduct(){
        return http.get("/api/product/all")
    }

    updateProduct(id, isAvailable) {
        return http.post("/api/change/product?id=" + id, { available: isAvailable } )
    }

    saveDataProduct(id, query){
        return http.post("/api/product?id=" + id, query)
    }

    addProduct(query){
        return http.post("/api/product", query)
    }
    /////////////////////////////////////////////////////////////////////////////////////
    //////////////API relative ai clienti///////////////////////////////////////////////
    getUser(query) {
        return http.get("/api/user/" + query)
    }
    
    getAllUser(query){
        return http.get("/api/user/all", query)
    }

    saveDataClient(id, query){
        return http.post("/api/user?id=" + id , query)
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //////////////API relative alle prenotazioni/////////////////////////////////////////
    getReservation(id) {
        return http.get("/api/reservation/?id=" + id)
    }

    getAllReservation(filter, sort){
        return http.get("/api/reservation/all", {'filter': filter , 'sort': sort})
    }

    saveReservation(id, query){
        return http.post("/api/reservation?id=" + id , query)        
    }

    addReservation(query){
        return http.post("/api/reservation", query)
    }

}

export default new Functions();