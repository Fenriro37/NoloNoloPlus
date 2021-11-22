// Framework esterne
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
// Librerie interne
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoProduct = require('../database/mongoProduct.js');
const config = require('./../config');

// GET - /api/product
// req.query deve avere un parametro id
// req.body è vuota
// [Tutti] Ritorna i dati del prodotto
router.get('/', async function(req, res) {
    console.log('GET /api/product/');
    try {
        if(req.query.id == null) {
            return res.status(400).json({
                message: 'ID mancante.'
            })
        } else {
            const result = await myMongoProduct.productsFindOne(req.query.id);
            return res.status(200).json({
                message: 'Ricerca effettuata con successo.',
                obj: result
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore',
            error: error
        });
    }
});

// GET - /api/product/all
// req.body ha due elementi:
// - filter (è la stringa che filtra il database per title e brand)
// - sort (è un booleano che ordina i dati in maniera crescente, true, o in
//   maniera decrescente, false)
// [Tutti] Ritorna gli oggetti del DB filtrati
router.get('/all', async function(req, res) {
    console.log('GET /api/product/all');
    try {
        if(req.body != null) {
            const result = await myMongoProduct.productsFind(req.body.filter ? req.body.filter : '', req.body.sort ? 1 : -1);
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
    } catch(error) {
        return res.status(400).json({
            message: 'Errore. ' + error
        })
    }
});

// POST - /api/product
// req.query deve avere un parametro id
// req.body ha un oggetto di tipo JSON { attributo: valore }
// [Funzionario e Manager] Se il parametro non è specificato, crea un nuovo
// oggetto con i dati di req.body (devono essere completi), altrimenti aggiorna
// i dati dell'oggetto id
router.post('/', async function(req, res) {
    console.log('POST /api/product/');
    try {
        const productId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
            // È un funzionario o manager
            if(productId == null) {
                // Parametro non specificato
                result = await myMongoProduct.productsInsertOne(req.body);
            } else {
                // Parametro specificato
                result = await myMongoProduct.productsUpdateOne(productId, req.body);
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
        } else {
            // È un cliente
            return res.status(401).json({
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

// DELETE - /api/prodcut
// req.query ha un parametro id
// [Funzionario e Manager] Cancella il prodotto id
router.delete('/', async function(req, res) {
    console.log('DELETE /api/product/');
    try {
        const productId = req.query.id;
        const token = req.cookies['JWT'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        // Controlla chi sta effettuando la richiesta
        if(sender.status > 0) {
            // È un funzionario o manager
            if(productId == null) {
                // Parametro non specificato
                return res.status(400).json({
                    message: 'Parametro mancante.'
                });
            } else {
                // Parametro specificato    
                result = await myMongoProduct.productsDeleteOne(productId);
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