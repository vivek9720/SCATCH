const express = require('express');
const isLoggedIn = require("../midlewares/isLoggedIn");
const router = express.Router();
router.get("/", function (req, res) {
    res.render("index.js");
})

router.get("/shop", isLoggedIn, function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
})

module.exports = router;