"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var UserModel_1 = require("../models/UserModel");
var SubscriptionModel_1 = require("../models/SubscriptionModel");
var router = express_1.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({
    extended: true
}));
var TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
router.get('/get', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserModel_1.User.find()];
            case 1:
                users = _a.sent();
                res.send({ users: users, success: true });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send({ employees: [] });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/add-subscription', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, streamName, gameName, twitchStreamerRequest, streamerData, streamerId, twitchGameRequest, gameData, gameId, previousSubscription, subscriptionId, newSubscription, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, userId = _a.userId, streamName = _a.streamName, gameName = _a.gameName;
                return [4 /*yield*/, node_fetch_1.default("https://api.twitch.tv/helix/users?login=" + streamName, {
                        headers: {
                            "Client-ID": TWITCH_CLIENT_ID || ''
                        }
                    })];
            case 1:
                twitchStreamerRequest = _b.sent();
                return [4 /*yield*/, twitchStreamerRequest.json()];
            case 2:
                streamerData = _b.sent();
                if (!streamerData || !streamerData.data || !streamerData.data.length)
                    return [2 /*return*/, res.send({ message: "We couldn't find a streamer with the name " + streamName })];
                streamerId = streamerData.data[0].id;
                return [4 /*yield*/, node_fetch_1.default("https://api.twitch.tv/helix/games?name=" + gameName, {
                        headers: {
                            "Client-ID": TWITCH_CLIENT_ID || ''
                        }
                    })];
            case 3:
                twitchGameRequest = _b.sent();
                return [4 /*yield*/, twitchGameRequest.json()];
            case 4:
                gameData = _b.sent();
                if (!gameData || !gameData.data || !gameData.data.length)
                    return [2 /*return*/, res.send({ message: "We couldn't find a game with the name " + gameName })];
                gameId = gameData.data[0].id;
                return [4 /*yield*/, SubscriptionModel_1.Subscription.findOne({
                        streamerId: streamerId,
                        gameId: gameId,
                    })];
            case 5:
                previousSubscription = _b.sent();
                subscriptionId = void 0;
                if (!!previousSubscription) return [3 /*break*/, 8];
                // create subscription;
                console.log('CREATING NEW SUB');
                return [4 /*yield*/, new SubscriptionModel_1.Subscription({
                        streamerId: streamerId,
                        gameId: gameId,
                        streamName: streamName,
                        gameName: gameName
                    }).save()];
            case 6:
                _b.sent();
                return [4 /*yield*/, SubscriptionModel_1.Subscription.findOne({
                        streamerId: streamerId,
                        gameId: gameId,
                    })];
            case 7:
                newSubscription = _b.sent();
                subscriptionId = (newSubscription && newSubscription._id);
                return [3 /*break*/, 9];
            case 8:
                console.log('FOUND SUB IN DB');
                subscriptionId = previousSubscription._id;
                _b.label = 9;
            case 9:
                if (!subscriptionId)
                    return [2 /*return*/, res.send({ message: 'something went wrong' })];
                return [4 /*yield*/, UserModel_1.User.updateOne({ _id: userId }, { $push: { subscriptions: subscriptionId } })];
            case 10:
                user = _b.sent();
                res.send({ user: user, success: true });
                return [3 /*break*/, 12];
            case 11:
                err_2 = _b.sent();
                res.send({ message: "unable to update user. info: " + err_2.toString() });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.post('/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                return [4 /*yield*/, UserModel_1.User.create({ email: email })];
            case 1:
                user = _a.sent();
                res.send({ user: user, success: true });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send({ message: "unable to update user. info: " + err_3.toString() });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.UserController = router;
