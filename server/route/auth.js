const router = require("express").Router();
  
// Prova
router.use(function(req, res, next) {
    console.log(req.header);
    console.log(req.url);
});

module.exports = router;