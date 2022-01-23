// ----------------------------------------------------------------------------
//                         NoloNoloPlus API - Pubbliche
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const myMongoAuth = require('./../database/mongoAuth.js');
const myMongoUser = require('./../database/mongoUser.js');
const config = require('./../config');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

// POST /api/public/sign-up/
// ----------------------------------------------------------------------------
// [Tutti] Crea un nuovo account come utente con i dati passti nel body.
// 
// Header: vuoto
// Body:
// - È un oggetto JSON di tipo JSON { attributo: valore } e rappresentano i
//   dati del nuovo utente.
//
// Valori di ritorno: { message, error }
// - message
//   È un messaggio descrittivo.
// - error
//   È l'errore.
router.post('/sign-up', async function(req, res) {
    try {
        const {
            userName,
            userSurname,
            birthday,
            sex,
            phoneNumber,
            email,
            plainTextPassword,
            address,
            paymentMethod
        } = req.body;
        // Cifrazione password
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        const newUser = {
            userName: userName,
            userSurname: userSurname,
            birthday: birthday,
            sex: sex,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            address: address,
            payment: paymentMethod
        };
        const mongoRes = await myMongoUser.usersInsertOne(newUser);
        if(mongoRes.status == 0) {
            // OK
            return res.status(200).json({
                message: mongoRes.message,
                obj: mongoRes.obj
            });
        } else {
            // Errore del database
            return res.status(400).json({
                message: mongoRes.message,
                error: mongoRes.error
            });
        }    
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/public/sign-up/',
            error: error
        });
    }
});

// POST /api/public/login
// ----------------------------------------------------------------------------
// [Tutti] Effettua il login con i dati passati nel body.
// 
// Header: vuoto
// Body:
// - email
//   É l'email
// - plainTextPassword
//   È la password in chiara
//
// Valori di ritorno: { message, data, error }
// - message
//   È un messaggio descrittivo.
// - data
//   Sono i dati da ritornare al chiamante.
// - error
//   È l'errore.
router.post('/login', async function(req, res) {
    console.log('api/public/login');
    try {
        let email = req.body.email
        let plainTextPassword = req.body.plainTextPassword

        console.log(email)
        console.log(plainTextPassword)

        const mongoRes = await myMongoAuth.login(email, plainTextPassword);
        if(mongoRes.status < 0) {
            // Errore nel login
            return res.status(400).json({
                message: mongoRes.message,
                error: mongoRes.error
            });
        } else {
            // OK
            res.cookie('jwt', mongoRes.obj.token, { maxAge: 86400 * 1000 });
            return res.status(200).json({
                message: "Password corretta",
                data: mongoRes.obj
            });
        }    
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/public/login/',
            error: error
        });
    }
});
router.get('/auth', async function(req, res) {
    console.log('api/public/auth');
    try {
        const token = req.cookies['jwt'];
        const tokenId = (jwt.verify(token, config.JSONWebTokenKey)).id;
        const sender = await myMongoAuth.auth({ '_id': ObjectId(tokenId) });
        switch(sender.status) {
            case -2:
                return res.status(401).json({
                    message: 'Token non valido.',
                    obj: -2
                });
            case -1:
                return res.status(400).json({
                    message: 'Errore di myMongoAuth.auth.',
                    obj: -1
                });
            case 0:
                return res.status(200).json({
                    message: 'Cliente',
                    obj: 0
                });
            case 1:
                return res.status(200).json({
                    message: 'Funzionario',
                    obj: 1
                });
            case 2:
                return res.status(200).json({
                    message: 'Manager',
                    obj: 2
                });
        }
    } catch(error) {
        return res.status(400).json({
            message: 'Errore di POST /api/public/login/',
            error: error
        });
    } 
})

module.exports = router;