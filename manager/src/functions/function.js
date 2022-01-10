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
        console.log("AUTH");
        return result;
    }

    //////////////API relative ai prodotti///////////////////////////////////////////////
    getProduct(id) {
        return http.get("/api/product/?id=" + id)
    }

    getAllProduct(query){
        return http.get("/api/product/all/?filter=" + query.filter + "&sort=" + query.sort)
    }

    saveDataProduct(id, query){
        return http.post("/api/product?id=" + id, query)
    }

    addProduct(query){
        return http.post("/api/product", query)
    }

    deleteProduct(id)
    {
        return http.delete("/api/product?id=" + id)
    }
    /////////////////////////////////////////////////////////////////////////////////////
    //////////////API relative ai clienti///////////////////////////////////////////////
    //0 id 
    //1 email
    getUser(id, choice) {
        if(choice === 0)
            return http.get("/api/user?id=" + id)
        else     
            return http.get("/api/user?email=" + id)
    }
    
    getAllUser(query){
        return http.get("/api/user/all?filter=" + query.filter + "&sort=" + query.sort)
    }

    saveDataClient(id, query){
        return http.post("/api/user?id=" + id , query)
    }

    deleteUser(id){
        return http.delete("/api/user?id=" + id)
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //////////////API relative alle prenotazioni/////////////////////////////////////////
    getReservation(id) {
        return http.get("/api/reservation/?id=" + id)
    }

    getAllReservation(query){
        return http.get("/api/reservation/all?filter=" + query.filter + "&sort=" + query.sort)
    }

    saveReservation(id, query){
        return http.post("/api/reservation?id=" + id , query)        
    }

    addReservation(query){
        return http.post("/api/reservation", query)
    }

    deleteReservation(id){
        return http.delete("/api/reservation/?id=" + id)
    }

}

export default new Functions();