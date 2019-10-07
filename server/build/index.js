"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('./database');
var express_1 = __importDefault(require("express"));
/* ******** CONTROLLERS ******** */
var userController_1 = require("./database/controllers/userController");
var twitchController_1 = require("./database/controllers/twitchController");
/* *********** CONFIG ********** */
var PORT = process.env.PORT;
var app = express_1.default();
/* ********** ROUTES *********** */
app.use('/users', userController_1.UserController);
app.use('/twitch', twitchController_1.TwitchController);
app.get('/', function (req, res) { return res.send('wxsy coming soon'); });
/* ******** SERVER INIT ******** */
app.listen(PORT, function () { return console.log("wxsy listening on port: " + PORT + "!"); });
