// ----------------------------------------------------------------------------
//                        NoloNoloPlus API - Prenotazioni
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoReservation = require('../database/mongoReservation.js');
const config = require('./../config');

// GET /api/reservation
// ----------------------------------------------------------------------------
// [Cliente] Ritorna la prenotazione con id passato per parametro, se è del
// cliente.
// [Funzionario o Manager] Ritorna la prenotazione ricercata per id.
// 
// Header:
// - Cookies JWT
//   È il token per autenticare il chiamante.
// - Parametri
//   - id - string
//     È l'id della prenotazione.
// Body: vuoto
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.get('/', async function(req, res) {
    console.log('GET /api/reservation/');
    try {
        const token = jwt.verify(req.cookies['JWT'], config.JSONWebTokenKey)
        const tokenId = token.id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(req.query.id == null) {
            return res.status(400).json({
                message: 'ID mancante.'
            });
        } else {
            if(sender.status == -1) {
                return res.status(401).json({
                    message: 'Token non valido.'
                });
            } else {
                const result = await myMongoReservation.reservationsFindOne(req.query.id);
                if((sender.status == 0 && result.obj.clientEmail == token.email) || (sender.status > 0)) {
                    // È il cliente che cerca una sua prenotazione o un funzionario/manager che cerca una prenotazione
                    return res.status(200).json({
                        message: 'Ricerca effettuata con successo.',
                        data: result
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

// GET /api/reservation/all
// ----------------------------------------------------------------------------
// [Cliente] Ritorna le prenotazioni del cliente filtrati e ordinati.
// [Funzionario, Manager] Ritorna le prenotazioni filtrati e ordinati.
// 
// Header:
// - Cookies JWT
//   È il token per autenticare il chiamante.
// Body:
// - filter (opzionale) - string
//   È la parola chiave da ricercare nel DB; si filtra per:
//   - userName
//   - userSurname
//   - email
//   - productTitle
//   - productBrand
// - sort (opzionale) - bool
//   È l'ordine dei valori di ritorno; può essere true (crescente) o false 
//   (descrescente); è applicato alla data di prenotazione.
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.get('/all', async function(req, res) {
    console.log('GET /api/reservation/all');
    try {
        const token = jwt.verify(req.cookies['JWT'], config.JSONWebTokenKey)
        const sender = await myMongoAuth.auth({ '_id': ObjectId(token.id) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status == 0 && req.body.id == token.id || sender.status > 0) {
            // È un cliente o funzionario/manager
            if(req.body != null) {
                const result = await myMongoReservation.reservationsFind(token, req.body.filter ? req.body.filter : '', req.body.sort ? 1 : -1);
                if(result.status == 0) {
                    // OK
                    return res.status(200).json({
                        message: result.message,
                        obj: result.obj
                    });
                } else {
                    // Errore del database
                    return res.status(400).json({
                        message: result.message,
                        error: result.obj
                    });
                }
            } else {
                // Parametri mancanti
                return res.status(400).json({
                    message: 'Parametri mancanti.'
                });
            } 
        } else {
            // È un cliente che sta cercando prenotazioni di altri clienti
            return res.status(401).json({
                message: 'Operazione non autorizzata.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/reservation/all',
            error: error
        })
    }
});

// POST /api/reservation
// ----------------------------------------------------------------------------
// [Cliente] Aggiorna i dati di una propria prenotazione.
// [Funzionario, Manager] Se il parametro non è specificato, crea una nuova
// prenotazione con i dati di req.body (devono essere completi), altrimenti
// aggiorna i dati della prenotazione id.
// 
// Header:
// - Cookies JWT
//   È il token per autenticare il chiamante.
// - Parametri
//   - id (opzionale) - string
//     È l'id della prenotazione.
// Body:
// - È un oggetto JSON di tipo JSON { attributo: valore } e rappresentano i
//   dati da aggiornare/inserire.
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.post('/', async function(req, res) {
    console.log('POST /api/reservation/');
    try {
        const reservationId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        if(sender.status == -1) {
            return res.status(400).json({
                message: 'Token non valido.'
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
                // Cliente che cerca di modificare una prenotazione di un altro cliente
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            }
            if(result.status == 0) {
                // OK
                return res.status(200).json({
                    message: result.message,
                    data: result.obj
                });
            } else {
                // Errore del database
                return res.status(400).json({
                    message: result.message,
                    error: result.obj
                });
            }
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/reservation/',
            error: error
        });
    }
});

// DELETE /api/reservation
// ----------------------------------------------------------------------------
// [Funzionario, Manager] Cancella la prenotazione con id passato per
// parametro.
// 
// Header:
// - Cookies JWT
//   È il token per autenticare il chiamante.
// - Parametri
//   - id - string
//     È l'id del prodotto.
// Body: vuoto
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.delete('/', async function(req, res) {
    console.log('DELETE /api/reservation/');
    try {
        const reservationId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(400).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
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
                    // OK
                    return res.status(200).json({
                        message: result.message,
                        obj: result.obj
                    });
                } else {
                    // Errore del database
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
            message: 'Errore di DELETE /api/reservation/',
            error: error
        });
    }
});

module.exports = router;