// ----------------------------------------------------------------------------
//                         NoloNoloPlus API - Pubbliche
// ----------------------------------------------------------------------------

// Moduli
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoUser = require('../database/mongoUser.js');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

console.log('/api/public.js');

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
                message: mongoRes.message
            });
        } else {
            // Errore del database
            return res.status(400).json({
                message: mongoRes.message
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
            res.cookie('jwt', mongoRes.obj, { maxAge: 86400 * 1000 });
            console.log(res.getHeader('Set-Cookie'));
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

module.exports = router;