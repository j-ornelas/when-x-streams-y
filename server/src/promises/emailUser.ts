import { UserInterface } from '../database/models/UserModel';

const emailUser = (user:UserInterface) => new Promise((resolve, reject) => {
  console.log('user.email', user.email);
  resolve(user.email);
  // TODO: DO SOME ASYNC EMAILING WORK HERE
});

export default emailUser;
