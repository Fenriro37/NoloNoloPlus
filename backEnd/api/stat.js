// ----------------------------------------------------------------------------
//                        NoloNoloPlus API - Statistiche
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const myMongoAuth = require('./../database/mongoAuth.js');
const myMongoProduct = require('./../database/mongoProduct.js');
const config = require('./../config');

// GET /api/stat
// ----------------------------------------------------------------------------
// [Manager] Cerca per tag e ritorna il fatturato, il numero noleggi e il
// prezzo medio (fatturato / noleggi) dei prodotti contente il tag ricercato.
// 
// Header:
// - Cookies jwt
//   È il token per autenticare il chiamante.
// - Parametri
//   - key - string
//     È la parola da ricercare come tag.
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
    console.log('GET /api/stat/');
    try {
        const token = jwt.verify(req.cookies['jwt'], config.JSONWebTokenKey)
        const tokenId = token.id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: 'Token non valido.'
            });
        } else {
            if(sender.status == 2) {
                // È un manager
                // Cerca i prodotti per tag
                if(req.query.tag != null && req.query.tag != '') {
                    const resultProducts = await myMongoProduct.productsFindByTag(req.query.tag);
                    if(resultProducts.status == 0) {
                        // Ricerca dei prodotti andato a buon fine
                        if(resultProducts.obj.length > 0) {
                            // Ci sono prodotti col tag ricercato
                            // Calcolo dei dati
                            let productIndex, bookingIndex;
                            let totalRevenue = 0;
                            let totalReservation = 0
                            for(productIndex in resultProducts.obj) {
                                if(resultProducts.obj[productIndex].booking == false) {
                                    continue;
                                } else {
                                    for(bookingIndex in resultProducts.obj[productIndex].bookings) {
                                        totalRevenue = totalRevenue + parseFloat(resultProducts.obj[productIndex].bookings[bookingIndex].total)
                                    }
                                    totalReservation = totalReservation + resultProducts.obj[productIndex].bookings.length
                                }
                                
                            }
                            return res.status(200).json({
                                message: 'Ricerca effettuata con successo.',
                                data: {
                                    products: resultProducts.obj,
                                    totalRevenue: totalRevenue,
                                    totalReservation: totalReservation,
                                    averagePrice: totalRevenue / totalReservation
                                }
                            });
                        } else {
                            // Non ci sono prodotti col tag ricercato
                            return res.status(200).json({
                                message: 'Non ci sono prodotti col tag ricercato',
                                data: resultProducts.obj
                            });
                        }
                    } else {
                        // Ricerca dei prodotti non andato a buon fine
                        return res.status(400).json({
                            message: resultProducts.message,
                            error: resultProducts.obj
                        });
                    }
                } else {
                    // Tag vuoto o mancante
                    return res.status(400).json({
                        message: 'Parametro mancante.'
                    });    
                }
            } else {
                // È un cliente o funzionario
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            }
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/stat/',
            error: error
        });
    }
});

module.exports = router;