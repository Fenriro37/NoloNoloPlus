import http from './http'

class ApiCall {

    // Login
    login(email, password) {
        const body = {
            'email': email,
            'plainTextPassword': password
        }
        return http.post('/api/public/login', body);
    }

    // API client
    getUser(id) {
        const query = id ? '?id=' + id : '';
        return http.get('/api/user/' + query)
    }

    postUser(id, query) {
        if(id != null) {
            return http.post('/api/user?id=' + id, query)
        } else {
            return http.post('/api/user', query)
        }
        
    }

    // API product
    getProduct(id) {
        return http.get('/api/product/?id=' + id)
    }

    getAllProduct(filter, sort) {
        return http.get('/api/product/all' + '?filter=' + filter + '&sort=' + sort)
    }

    postProduct(id, bookings) {
        return http.post('/api/product/?id=' + id, bookings);
    }

    // API reservation
    getReservation(id) {
        return http.get('/api/reservation/?id=' + id)
    }

    getAllReservation(filter, sort) {
        return http.get('/api/reservation/all' + '?filter=' + filter + '&sort=' + sort);
    }

    postReservation(id, data) {
        if(id == null) {
            return http.post('/api/reservation', data);
        } else {
            return http.post('/api/reservation' + '?id=' + id, data);
        }
        
    }
    
    deleteReservation(reservationId) {
        return http.delete('/api/reservation?id=' + reservationId);
    }
}

export default new ApiCall();