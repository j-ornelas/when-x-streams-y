import { model, Schema, Model, Document } from 'mongoose';

export interface UserInterface {
  subscriptions:[String];
  email: String;
  password: String;
  phone: String;
};

const UserSchema = new Schema({
  subscriptions: [String],
  email: String,
  password: String,
  phone: String,
});

export const User:Model<Document> = model('User', UserSchema);
