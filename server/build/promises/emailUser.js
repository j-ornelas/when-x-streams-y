"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailUser = function (user) { return new Promise(function (resolve, reject) {
    console.log('user.email', user.email);
    resolve(user.email);
    // TODO: DO SOME ASYNC EMAILING WORK HERE
}); };
exports.default = emailUser;
