// Framework esterne
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
// Librerie interne
const myMongo = require('../database/mongo.js');
const config = require('./../config');

router.use(cookieParser());

// POST - /api/public/sign-up
// Registrazione account
router.post('/sign-up', async function(req, res) {
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
    console.log(req.body);
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
    const mongoRes = await myMongo.insertUser(newUser);
    if(mongoRes.status == '200') {
        return res.status(200).send(mongoRes.message);
    } else {
        return res.status(400).send(mongoRes.message);
    }
});

// POST - /api/public/login
// Accesso account
router.post('/login', async function(req, res) {
    const {
        email,
        plainTextPassword,
    } = req.body;
    const mongoRes = await myMongo.searchOneUser({ email: email });
    if(mongoRes.status == '400') {
        console.log('Email errata')
        return res.status(400).send(mongoRes.message)
    } else {
        const user = mongoRes.message
        if(await bcrypt.compare(plainTextPassword, user.password) === false) {
            console.log('Password errata')
            return res.status(401).send('Password errata')
        } else {
            const token = jwt.sign({
                    id: user._id,
                    userName: user.userName
                },
                config.JSONWebTokenKey
            );
            // console.log('Password corretta')
            // console.log(token)
            res.cookie('JWT', token, { maxAge: 86400 * 1000 });
            return res.status(200);
        }
    }
});

module.exports = router;