import http from './http'

class ApiCall {
    
    test() {
        return http.get('/test');
    }

    // Chiamate alle API generiche
    login(email, password) {
        const body = {
            'email': email,
            'plainTextPassword': password
        }
        return http.post('/api/public/login', body);
    }

    signUp() {

    }

    // Chiamate alle API sul cliente autenticato
    getUser(id) {
        const query = id ? '?id=' + id : '';
        return http.get('/api/user/' + query)
    }

    postUser(id, query) {
        return http.post('/api/user?id=' + id , query)
    }

    // Chiamate alle API sui prodotti
    getProduct(id) {
        return http.get('/api/product/?id=' + id)
    }

    getAllProduct(filter, isDecreasing) {
        return http.get('/api/product/all' + '?filter=' + filter + '&&sort=' + isDecreasing)
    }

    // Chiamate alle API sulle prenotazioni
    getReservation(id) {
        return http.get('/api/reservation/?id=' + id)
    }

    getAllReservation(filter, sort) {
        return http.get('/api/reservation/all', {'filter': filter , 'sort': sort})
    }

    postReservation() {

    }

}

export default new ApiCall();