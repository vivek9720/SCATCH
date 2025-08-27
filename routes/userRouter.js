const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");



router.get("/", function (req, res) {
    res.send("hey this is user route");
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;