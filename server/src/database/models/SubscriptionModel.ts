import { model, Schema, Model, Document } from 'mongoose';

export interface SubscriptionInterface {
  streamerId: String;
  gameId: String;
  streamName: String;
  gameName: String;
};

const SubscriptionSchema = new Schema({
  streamerId: String,
  gameId: String,
  streamName: String,
  gameName: String,
});

export const Subscription:Model<Document> = model('Subscription', SubscriptionSchema);
