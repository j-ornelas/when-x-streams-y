"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('./database');
var express_1 = __importDefault(require("express"));
var PORT = process.env.PORT;
var app = express_1.default();
app.get('/', function (req, res) { return res.send('hello'); });
app.listen(PORT, function () { return console.log("wxsy listening on port: " + PORT + "!"); });
