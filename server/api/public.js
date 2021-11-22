// Framework esterne
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
// Librerie interne
const myMongoAuth = require('../database/mongoAuth.js');
const myMongoUser = require('../database/mongoUser.js');

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
        return res.status(200).json({
            message: mongoRes.message
        });
    } else {
        return res.status(400).json({
            message: mongoRes.message
        });
    }
});

// POST - /api/public/login
// Accesso account
router.post('/login', async function(req, res) {
    const {
        email,
        plainTextPassword,
    } = req.body;
    const mongoRes = await myMongoAuth.login(email, plainTextPassword);
    if(mongoRes.status != 0) {
        return res.status(400).json({
            message: mongoRes.message
        });
    } else {
        res.cookie('JWT', mongoRes.obj, { maxAge: 86400 * 1000 });
        return res.status(200).json({
            message: "Password corretta",
            obj: mongoRes.obj
        });
    }
});

module.exports = router;