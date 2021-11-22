// Framework esterne
const router = require('express').Router();
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
// Librerie interne
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoReservation = require('../database/mongoReservation.js');
const config = require('./../config');

// GET - /api/reservation
// req.query deve avere un parametro id
// req.body è vuota
// [Cliente] Ritorna la prenotazione se è del cliente
// [Funzionario o Manager] Ritorna la prenotazione ricercata
router.get('/', async function(req, res) {
    console.log('GET /api/reservation/');
    try {
        const token = jwt.verify(req.cookies['JWT'], config.JSONWebTokenKey)
        const tokenId = token.id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(req.query.id == null) {
            return res.status(400).json({
                message: 'ID mancante.'
            })
        } else {
            if(sender.status == -1) {
                return res.status(401).json({
                    message: 'Errore di autenticazione.'
                })
            } else {
                const result = await myMongoReservation.reservationsFindOne(req.query.id);
                if((sender.status == 0 && result.obj.clientEmail == token.email) || (sender.status > 0)) {
                    // È il cliente che cerca una sua prenotazione o un funzionario/manager che cerca una prenotazione
                    return res.status(200).json({
                        message: 'Ricerca effettuata con successo.',
                        obj: result
                    });
                } else {
                    return res.status(401).json({
                        message: 'Operazione non autorizzata.'
                    });
                }
            }
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/reservation/',
            error: error
        });
    }
});

// GET - /api/reservation/all
// req.body ha due elementi:
// - filter (è la stringa che filtra il database per title e brand)
// - sort (è un booleano che ordina i dati in maniera crescente, true, o in
//   maniera decrescente, false)
// [Cliente] Ritorna le prenotazioni del cliente filtrati
// [Funzionario] Ritorna le prenotazioni filtrati
router.get('/all', async function(req, res) {
    console.log('GET /api/reservation/all');
    try {
        const token = jwt.verify(req.cookies['JWT'], config.JSONWebTokenKey)
        const sender = await myMongoAuth.auth({ '_id': ObjectId(token.id) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Errore di autenticazione.'
            });
        } else if(sender.status == 0 && req.body.id == token.id || sender.status > 0) {
            // È un cliente o funzionario/manager
            if(req.body != null) {
                const result = await myMongoReservation.reservationsFind(token, req.body.filter ? req.body.filter : '', req.body.sort ? 1 : -1);
                if(result.status == 0) {
                    return res.status(200).json({
                        message: result.message,
                        obj: result.obj
                    });
                } else {
                    return res.status(400).json({
                        message: result.message,
                        error: result.obj
                    });
                }
            } else {
                return res.status(400).json({
                    message: 'Parametri mancanti.'
                });
            } 
        } else {
            return res.status(401).json({
                message: 'Operazione non autorizzata.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore. ' + error
        })
    }
});

// POST - /api/reservation
// req.query può avere un parametro id
// req.body ha un oggetto di tipo JSON { attributo: valore }
// [Funzionario e Manager] Se il parametro non è specificato, crea un nuovo
// oggetto con i dati di req.body (devono essere completi), altrimenti aggiorna
// i dati dell'oggetto id
router.post('/', async function(req, res) {
    console.log('POST /api/reservation/');
    try {
        const reservationId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        // Controlla chi sta effettuando la richiesta
        if(sender.status == -1) {
            return res.status(400).json({
                message: "Errore d'autenticazione.",
                error: error
            });
        } else {
            // È un utente autenticato 
            if(reservationId == null && sender.status == 0) {
                // Parametro non specificato
                // Creazione di una nuova prenotazione da parte del funzionario
                result = await myMongoReservation.reservationsInsertOne(req.body);
            } else if(sender.status > 0) {
                // Parametro specificato
                // Modifica di una prenotazione da parte del funzionario
                result = await myMongoReservation.reservationsUpdateOne(reservationId, req.body);
            } else {
                return res.status(401).json({
                    message: "Violazione d'accesso."
                });
            }
            if(result.status == 0) {
                return res.status(200).json({
                    message: result.message,
                    obj: result.obj
                });
            } else {
                return res.status(400).json({
                    message: result.message,
                    error: result.obj
                });
            }
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore.',
            error: error
        });
    }
});

// DELETE - /api/product
// req.query ha un parametro id
// [Funzionario e Manager] Cancella il prodotto id
router.delete('/', async function(req, res) {
    console.log('DELETE /api/reservation/');
    try {
        const reservationId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
            // È un funzionario o manager
            if(reservationId == null) {
                // Parametro non specificato
                return res.status(400).json({
                    message: 'Parametro mancante.'
                });
            } else {
                // Parametro specificato    
                result = await myMongoReservation.reservationsDeleteOne(reservationId);
                if(result.status == 0) {
                    return res.status(200).json({
                        message: result.message,
                        obj: result.obj
                    });
                } else {
                    return res.status(400).json({
                        message: result.message,
                        error: result.obj
                    });
                }
            }
        } else {
            // È un cliente
            return res.status(400).json({
                message: 'Operazione non autorizzata.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore.',
            error: error
        });
    }
});

module.exports = router;