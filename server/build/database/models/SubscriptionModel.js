"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
;
var SubscriptionSchema = new mongoose_1.Schema({
    streamerId: String,
    gameId: String,
    streamName: String,
    gameName: String,
});
exports.Subscription = mongoose_1.model('Subscription', SubscriptionSchema);
