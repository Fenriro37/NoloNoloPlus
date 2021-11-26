const router = require("express").Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const jwt = require("jsonwebtoken");
const config = require('./../config.js');

// Middleware per l'autenticazione
router.use(function(req, res, next) {
    console.log("Auth:");
    console.log(req.cookies)
    try {
        const token = req.cookies['JWT'];
        jwt.verify(token, config.JSONWebTokenKey);
        next();
    } catch {
        res.status(401).json({
            error: new Error("Utente non autenticato")
        });
    }
});

module.exports = router;