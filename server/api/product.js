// ----------------------------------------------------------------------------
//                         NoloNoloPlus API - Prodotti
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoProduct = require('../database/mongoProduct.js');
const config = require('./../config');

// GET /api/product
// ----------------------------------------------------------------------------
// [Tutti] Ritorna i dati del prodotto con id passato per parametro.
// 
// Header:
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
router.get('/', async function(req, res) {
    console.log('GET /api/product/');
    try {
        if(req.query.id == null) {
            // Parametro mancante
            return res.status(400).json({
                message: 'ID mancante.'
            });
        } else {
            const result = await myMongoProduct.productsFindOne(req.query.id);
            if(result.status == 0) {
                // OK
                return res.status(200).json({
                    message: 'Ricerca effettuata con successo.',
                    data: result
                });    
            } else {
                // Errore database
                return res.status(400).json({
                    message: result.message,
                    error: result.obj
                });
            }
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/product/',
            error: error
        });
    }
});

// GET /api/product/all
// ----------------------------------------------------------------------------
// [Tutti] Ritorna i prodotto del DB filtrati e ordinati con i parametri
// passati in input
// 
// Header: vuoto
// Body:
// - filter (opzionale) - string
//   È la parola chiave da ricercare nel DB; si filtra per:
//   - title
//   - brand
// - sort (opzionale) - bool
//   È l'ordine dei valori di ritorno; può essere true (crescente) o false 
//   (descrescente); è applicato al prezzo.
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.get('/all', async function(req, res) {
    console.log('GET /api/product/all');
    try {
        if(req.body != null) {
            const result = await myMongoProduct.productsFind(req.body.filter ? req.body.filter : '', req.body.sort ? 1 : -1);
            if(result.status == 0) {
                // OK
                return res.status(200).json({
                    message: result.message,
                    data: result.obj
                });
            } else {
                // Errore database
                return res.status(400).json({
                    message: result.message,
                    error: result.obj
                });
            }
        } else {
            // filter e/o sort mancanti
            return res.status(400).json({
                message: 'Parametri mancanti.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/product/all/',
            error: error
        });
    }
});

// POST /api/product
// ----------------------------------------------------------------------------
// [Funzionario, Manager] Se il parametro non è specificato, crea un nuovo
// oggetto con i dati di req.body (devono essere completi), altrimenti aggiorna
// i dati dell'oggetto id.
// 
// Header:
// - Cookies jwt
//   È il token per autenticare il chiamante.
// - Parametri
//   - id - string
//     È l'id del prodotto.
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
    console.log('POST /api/product/');
    try {
        const productId = req.query.id;
        const token = req.cookies['jwt'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        let result;
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
            // È un funzionario o manager
            if(productId == null) {
                // Parametro non specificato
                result = await myMongoProduct.productsInsertOne(req.body);
            } else {
                // Parametro specificato
                result = await myMongoProduct.productsUpdateOne(productId, req.body);
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
        } else {
            // È un cliente
            return res.status(401).json({
                message: 'Operazione non autorizzata.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/product/',
            error: error
        });
    }
});

// DELETE /api/product
// ----------------------------------------------------------------------------
// [Funzionario, Manager] Cancella il prodotto con id passato come parametro.
// 
// Header:
// - Cookies jwt
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
    console.log('DELETE /api/product/');
    try {
        const productId = req.query.id;
        const token = req.cookies['jwt'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else if(sender.status > 0) {
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
        } else {
            // È un cliente
            return res.status(400).json({
                message: 'Operazione non autorizzata.'
            });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di DELETE /api/product',
            error: error
        });
    }
});

module.exports = router;