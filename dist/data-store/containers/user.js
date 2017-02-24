"use strict";
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 8,
    },
    firstName: {
        type: String,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    }
});
exports.User = mongoose_1.model('Users', schema);
