import { model, Schema, Model, Document } from 'mongoose';

const SubscriptionSchema = new Schema({
  streamerId: String,
  gameId: String,
});

export const Subscription:Model<Document> = model('Subscription', SubscriptionSchema);
