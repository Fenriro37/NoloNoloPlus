const router = require("express").Router();
var cookieParser = require('cookie-parser')  

// Prova
router.use(function(req, res, next) {
    console.log(req.cookies);
    console.log(req.url);
    console.log("Auth");
    next();
});

module.exports = router;