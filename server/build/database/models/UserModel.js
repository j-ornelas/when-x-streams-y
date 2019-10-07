"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
;
var UserSchema = new mongoose_1.Schema({
    subscriptions: [String],
    email: String,
    password: String,
    phone: String,
});
exports.User = mongoose_1.model('User', UserSchema);
