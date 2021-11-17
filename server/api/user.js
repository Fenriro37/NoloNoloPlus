// Framework esterne
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
// Librerie interne
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoUser = require('../database/mongoUser.js');
const config = require('./../config');

// GET - /api/user/
// req.query può avere un parametro id
// req.body è vuota
// [Funzionario o Manager] Cerca i dati del cliente con l'id passato come
// parametro.
// [Cliente] Cerca i dati dell'utente relativo al JWT salvato tra i cookie. Non
// deve avere il parametro id
router.get('/', async function(req, res) {
    console.log('GET /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
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
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            } else {
                result = await myMongoUser.usersFindOne({ '_id': ObjectId(tokenId) });                
            }
        }
        if(result.status == 0) {
            return res.status(200).json({
                user: result.obj
            });
        } else {
            return res.status(400).json({
                message: result.message,
                error: result.obj
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore',
            error: error
        });
    }
});

// POST - /api/user/
// req.query può avere un parametro id
// req.body ha due elementi:
// - id (è l'id dell'utente da modificare)
// - data (è un oggetto composto da dati da modificare; gli attributi devono
//   coincidere)
// [Funzionario o Manager] Aggiorna i dati del cliente se gli id del parametro
// e body sono uguali.
// [Cliente] Aggiorna i dati del cliente stesso. Non deve avere il parametro id
router.post('/', async function(req, res) {
    console.log('POST /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
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
    } catch(error) {
        return res.status(400).json({
            message: 'Errore.',
            error: error
        });
    }
});

// GET - /api/user/all
// req.body ha due elementi:
// - filter (è la stringa che filtra il database per userName, userSurname e
//   email)
// - sort (è un booleano che ordina i dati in maniera crescente, true, o in
//   maniera decrescente, false)
router.get('/all', async function(req, res) {
    console.log('GET /api/user/all');
    try {
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        // Solo il funzionario o manager può chiamare questa API
        if(sender.status <= 0) {
            res.status(400).json({
                message: 'Operazione non autorizzata.'
            });
        } else {
            const result = await myMongoUser.usersFind(req.body.filter, req.body.sort ? 1 : -1);
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
    } catch(error) {
        return res.status(400).json({
            message: 'Errore.',
            error: error
        });
    }
});

// DELETE - /api/user/
// req.query ha un parametro id
// [Funzionario] Cancella l'utente con l'id passato come parametro
router.delete('/', async function(req, res) {
    console.log('DELETE /api/user/');
    try {
        const paramId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
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