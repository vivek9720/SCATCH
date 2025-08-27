const userModel = require("../models/user-model");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { password, name, email } = req.body;

        let use = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account . Please Login");

        bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                let user = await userModel.create({
                    name,
                    password: hash,
                    email
                })
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("user created successfully");
            })
        })
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        return res.send("email or password is incorrect");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("you can Login");
        } else {
            res.send("Email or password is incorrect");
        }
    })
}

module.exports.logoutUser = async function (req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    res.redirect("/");
}
