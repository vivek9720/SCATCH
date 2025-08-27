const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        trime: true
    },
    email: String,
    password: String,
    product: {
        type: Array,
        default: []
    },
    gstin: String,
    picture: String
});

module.exports = mongoose.model("owner", ownerSchema); 