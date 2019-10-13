import { model, Schema, Model, Document } from 'mongoose';

export interface UserInterface extends Document {
  subscriptions:[string];
  email: string;
  password: string;
  phone: string;
};
export interface UserModelInterface extends Model<UserInterface> {
  findOrCreate(email:string):Promise<UserInterface>;
}

const UserSchema = new Schema({
  subscriptions: [String],
  email: String,
  password: String,
  phone: String,
})

UserSchema.statics.findOrCreate = function(email:string) {
  const userModel:UserModelInterface = this;
  return new Promise(async(resolve, reject) => {
    try {
      const prevUser = await userModel.findOne({ email });
      if (prevUser) {
        return resolve(prevUser);
      } else {
        resolve(await userModel.create({ email }))
      }
    } catch (err) {
      reject(err);
    }
  })
}


export const User:UserModelInterface = model<UserInterface, UserModelInterface>('User', UserSchema);
