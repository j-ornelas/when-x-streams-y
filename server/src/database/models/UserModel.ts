import { model, Schema, Model, Document } from 'mongoose';
import { hashPassword, isMatchingPassword, tokenizeUser } from './utils';

const UserSchema = new Schema({
  subscriptions: [String],
  email: String,
  password: String,
  phone: String,
});
export interface UserInterface extends Document {
  subscriptions:[string];
  email: string;
  password: string;
  phone: string;
};
export interface UserModelInterface extends Model<UserInterface> {
  createUser({ email, password}:CreateOrLoginInterface):Promise<UserInterface>;
  loginUserLocal({ email, password}:CreateOrLoginInterface):Promise<UserInterface>;
};

interface CreateOrLoginInterface {
  email:string;
  password:string;
}
UserSchema.statics.createUser = function({ email, password }:CreateOrLoginInterface) {
  const userModel:UserModelInterface = this;
  return new Promise(async(resolve, reject) => {
    try {
      if (!email || !password) return reject("Missing info.")
      // TODO: do all sorts of validation here.
      const prevUser = await userModel.findOne({ email });
      if (prevUser) {
        return reject("This email already is registered. Use a different email or try logging in instead.");
      } else {
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) return reject("Error creating password hash. Try again later.")
        const createdUser = await userModel.create({ email, password: hashedPassword });
        if (!createdUser) return reject("Error creating user. Try again later.");
        return resolve( { success: true, user: tokenizeUser(createdUser) });
      }
    } catch (err) {
      return reject({ error: err.toString() });
    }
  });
};

UserSchema.statics.loginUserLocal = function({ email, password }:CreateOrLoginInterface) {
  const userModel:UserModelInterface = this;
  return new Promise(async(resolve, reject) => {
    try {
      if (!email || !password) return resolve({ error: "Missing info." })
      // TODO: do all sorts of validation here.
      const prevUser = await userModel.findOne({ email });
      if (!prevUser) {
        return resolve({ error: "This email was not found. Try creating an account instead." });
      } else {
        const isMatching = await isMatchingPassword(password, prevUser.password);
        if (isMatching) {
          return resolve( { success: true, user: tokenizeUser(prevUser) } );
        } else {
          reject('The password you entered was incorrect');
        }
      }
    } catch (err) {
      return reject({ error: err.toString() });
    }
  });
};


export const User:UserModelInterface = model<UserInterface, UserModelInterface>('User', UserSchema);
