// Framework esterne
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
// Librerie interne
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoReservation = require('../database/mongoReservation.js');
const config = require('./../config');

router.get('/', async function(req, res) {
    const result = await myMongoReservation.reservationsFindOne(req.query.id);
    if(result.status == '0') {
        const token = jwt.verify(req.cookies['JWT'], config.JSONWebTokenKey)
        const tokenId = token.id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        if(sender.status == -1) {
            return res.status(401).json({
                message: "Errore sul token di autenticazione."
            });
        } else if(sender.status == 0 && token.email != result.obj.clientEmail) {
            return res.status(401).json({
                message: "Violazione d'accesso."
            });
        } else {
            return res.status(200).json({
                data: result.obj
            });
        }
    } else {
        return res.status(400).json({
            message: result.message,
            data: result.obj
        })
    }
});

module.exports = router;