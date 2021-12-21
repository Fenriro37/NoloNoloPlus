// ----------------------------------------------------------------------------
//                         NoloNoloPlus API - Fattura
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const myMongoAuth = require('./../database/mongoAuth');
const myMongoReservation = require('./../database/mongoReservation');
const config = require('./../config');

// GET /api/invoice/
// ----------------------------------------------------------------------------
// [Cliente] Ritorna i dati della fattura correlata alla prenotazione con id
// passata per parametro, se il cliente chiamante è colui che ha effettuato la
// prenotazione.
// [Funzionario, Manager] Ritorna i dati della fattura correlata alla
// prenotazione con id passata per parametro.
// 
// Header:
// - Cookies jwt
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
    console.log('GET /api/invoice/');
    try {
        const result = await myMongoReservation.reservationsFindOne(req.query.id);
        if(result.status == '0') {
            const token = jwt.verify(req.cookies['jwt'], config.JSONWebTokenKey);
            const tokenId = token.id;
            const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
            if(sender.status == -1) {
                return res.status(401).json({
                    message: 'Token non valido.'
                });
            } else if(sender.status == 0 && token.email != result.obj.clientEmail) {
                return res.status(401).json({
                    message: 'Operazione non autorizzata.'
                });
            } else {
                return res.status(200).json({
                    message: 'Ok.',
                    data: result.obj
                });
            }
        } else {
            return res.status(400).json({
                message: result.message,
                data: result.obj
            });
        }    
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di GET /api/invoice',
            error: error
        })
    }
});

module.exports = router;