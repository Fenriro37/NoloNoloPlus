const router = require("express").Router();
const myMongo = require("./mongo.js")
const bcrypt = require("bcryptjs");

router.post("/", async function(req, res) {
    const {
        userName,
        userSurname,
        birthday,
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
        phoneNumber: phoneNumber,
        email: email,
        password: hashedPassword,
        address: address,
        payment: paymentMethod
    };
    const mongoRes = await myMongo.insertUser(newUser);
    if(mongoRes.status == "200") {
        return res.status(200).send(mongoRes.message);
    } else {
        return res.status(400).send(mongoRes.message);
    }
});

module.exports = router;