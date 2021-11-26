// ----------------------------------------------------------------------------
//                         NoloNoloPlus API - Utenti
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoUser = require('../database/mongoUser.js');
const config = require('./../config');

// GET /api/user
// ----------------------------------------------------------------------------
// [Cliente] Cerca i dati dell'utente relativo al JWT salvato tra i cookie. Non
// deve avere il parametro id.
// [Funzionario, Manager] Cerca i dati del cliente con l'id passato per
// parametro.
// 
// Header:
// - Cookies JWT
//   È il token per autenticare il chiamante.
// - Parametri
//   - id (opzionale) - string
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
    console.log('GET /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
            // È un funzionario o manager
            if(paramId == null) {
                // Parametro non specificato
                return res.status(400).json({
                    message: 'Parametro mancante.'
                });
            } else {
                // Parametro specificato
                result = await myMongoUser.usersFindOne({ '_id': ObjectId(paramId) });
            }
        } else {
            // È un cliente
            if(paramId != null) {
                // Parametro specificato
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            } else {
                // Parametro non specificato
                result = await myMongoUser.usersFindOne({ '_id': ObjectId(tokenId) });                
            }
        }
        if(result.status == 0) {
            // OK
            return res.status(200).json({
                data: result.obj
            });
        } else {
            // Errore del database
            return res.status(400).json({
                message: result.message,
                error: result.obj
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/user/',
            error: error
        });
    }
});

// GET /api/user/all
// ----------------------------------------------------------------------------
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
// - sort (opzionale) - bool
//   È l'ordine dei valori di ritorno; può essere true (crescente) o false 
//   (descrescente); è applicato al cognome e nome.
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.get('/all', async function(req, res) {
    console.log('GET /api/user/all');
    try {
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status == 0) {
            // È un cliente
            res.status(400).json({
                message: 'Operazione non autorizzata.'
            });
        } else {
            // È un manager o funzionario
            const result = await myMongoUser.usersFind(req.body.filter, req.body.sort ? 1 : -1);
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
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/user/all',
            error: error
        });
    }
});

// POST /api/user
// ----------------------------------------------------------------------------
// [Cliente] Aggiorna i dati del cliente identificato tramite JTW. Non deve
// avere il parametro id.
// [Funzionario o Manager] Aggiorna i dati del cliente se gli id del parametro
// e body sono uguali.
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
    console.log('POST /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
            // È un funzionario o manager
            if(paramId == null) {
                // Parametro non specificato
                return res.status(400).json({
                    message: 'Parametro mancante.'
                });
            } else {
                // Parametro specificato
                if(paramId == req.body.id) {
                    result = await myMongoUser.usersUpdateOne(paramId, req.body.data);
                } else {
                    return res.status(400).json({
                        message: 'I parametri non coincidono.'
                    })
                }
            }
        } else {
            // È un cliente
            if(paramId != null) {
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            } else if(tokenId != req.body.id) {
                return res.status(400).json({
                    message: 'I parametri non coincidono.'
                });
            } else {
                result = await myMongoUser.usersUpdateOne(tokenId, req.body.data);
            }
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
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/user/',
            error: error
        });
    }
});

// DELETE /api/user
// ----------------------------------------------------------------------------
// [Funzionario, Manager] Cancella l'utente con id passato per parametro.
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
    console.log('DELETE /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(400).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
            // È un funzionario o manager
            if(paramId == null) {
                // Parametro non specificato
                return res.status(400).json({
                    message: 'Parametro mancante.'
                });
            } else {
                // Parametro specificato    
                result = await myMongoUser.usersDeleteOne(paramId);
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
            message: 'Errore di DELETE /api/user/',
            error: error
        });
    }
});

module.exports = router;