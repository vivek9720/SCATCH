const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", function (req, res) {
    res.send("hey this is owner route");
})

if (process.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res.status(504).send("you don't have permission to create owner");
        }
        res.send("You can create owner");
        let { name, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            name,
            email,
            password
        })
        res.status(201).send(createdOwner);
    })
}



module.exports = router;