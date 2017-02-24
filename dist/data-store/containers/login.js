"use strict";
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    time: { type: Date, required: true }
});
exports.Login = mongoose_1.model('Logins', schema);
