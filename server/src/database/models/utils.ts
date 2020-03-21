import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserInterface } from './UserModel';

const { PASSWORD_SALT = '', JWT_SECRET = '' } = process.env;

export async function hashPassword (password:string) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(PASSWORD_SALT), (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  })
  return hashedPassword
}

export async function isMatchingPassword (password:string, hash:string) {
  const isMatching = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, result) {
        if (err) reject(err);
        resolve(result)
    });
  })
  return isMatching;
}

export function tokenizeUser (user:UserInterface) {
  const strippedUser = { ...user };
  var token = jwt.sign({ id: user._id }, JWT_SECRET);
  delete strippedUser.password;
  return { email: user.email, subscriptions: user.subscriptions, token };
}
