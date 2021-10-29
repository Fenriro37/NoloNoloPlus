// import $ from 'jquery'
import http from './http'

class Functions {
    getProduct(id) {
        return http.get("/api/product?id=" + id)
    }
}

export default new Functions();