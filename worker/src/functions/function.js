// import $ from 'jquery'
import http from './http'

class Functions {
    getProduct(id) {
        return http.get("/api/product?id=" + id)
    }

    updateProduct(id, isAvailable) {
        return http.post("/api/change/product?id=" + id, {
            available: isAvailable
        })
    }

    saveData(id, query){
        return http.post("/api/save/product?id=" + id, query)
    }
}

export default new Functions();