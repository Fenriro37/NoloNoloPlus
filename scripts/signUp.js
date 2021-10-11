const router = require("express").Router();
const myMongo = require("./mongo.js")

router.post("/", async function(req, res) {
    const {
        user,
        address,
        email,
        password,
        payment
    } = req.body;
    const newUser = {
        user: user,
        email: email,
        password: password,
        address: address,
        payment: payment
    };
    console.log("ok")
    myMongo.insertUser(newUser);
    console.log("ok")
    res.status(200)
});

module.exports = router;