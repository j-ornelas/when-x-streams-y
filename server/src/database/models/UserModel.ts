import { model, Schema, Model, Document } from 'mongoose';

const UserSchema = new Schema({
  subscriptions: [String],
  email: String,
  password: String,
  phone: String,
});

export const UserModel:Model<Document> = model('User', UserSchema);
