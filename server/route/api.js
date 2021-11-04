const router = require("express").Router();
const myMongo = require("../database/mongo.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config");
  
// Prova
router.get("/", myMongo.prova);
// Ottieni un prodotto
router.get('/product', myMongo.searchProduct);
// Sign up
router.post("/sign-up", async function(req, res) {
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

// Login
router.post("/login", async function(req, res) {
    const {
        email,
        plainTextPassword,
    } = req.body;
    const mongoRes = await myMongo.searchOneUser({ email: email });
    if(mongoRes.status == "400") {
        console.log("Email errata")
        return res.status(400).send(mongoRes.message)
    } else {
        const user = mongoRes.message
        if(await bcrypt.compare(plainTextPassword, user.password) === false) {
            console.log("Password errata")
            return res.status(401).send("Password errata")
        } else {
            const token = jwt.sign({
                    id: user._id,
                    userName: user.userName
                },
                config.JSONWebTokenKey
            );
            console.log("Password corretta")
            console.log(token)
            return res.status(200).send(token);
        }
    }
});

router.post("/update/product", async function(req, res) {
    console.log(":D");
    const {
        id,
        title,
        brand,
        image,
        tags,
        discount,
        price,
        descriptions,
        note,
        quality
    } = req.body;
    const query = {
        identifier: id,
        title: title,
        brand: brand,
        image: image,
        tags: tags,
        discount: discount,
        price: price,
        descriptions: descriptions,
        note: note,
        quality: quality
    }

    const result = await myMongo.editProduct(query);
    if(result.status == '400') {
        res.status(400).send(result.message);
    } else if(result.status == '200') {
        res.status(200).send(result.message);
    } else {
        res.status(404).send("SOS");
    }

});

module.exports = router;
