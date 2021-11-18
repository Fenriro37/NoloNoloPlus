// import $ from 'jquery'
import http from './http'

class Functions {
    getProduct(id) {
        return http.get("/api/product?id=" + id)
    }

    updateProduct(id, isAvailable) {
        return http.post("/api/change/product?id=" + id, { available: isAvailable } )
    }

    saveDataProduct(id, query){
        return http.post("/api/save/product?id=" + id, query)
    }

    
    saveDataClient(id, query){
        return http.post("/api/save/product?id=" + id + "&&acs=2", query)
    }

}

export default new Functions();