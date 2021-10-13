const router = require("express").Router();
const myMongo = require("./mongo.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config.js");

router.post("/", async function(req, res) {
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
            return res.status(200).send(token);
        }
    }
});

module.exports = router;