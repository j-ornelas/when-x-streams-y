import { UserInterface } from '../database/models/UserModel';
import emailUser from './emailUser';
// TODO: remove the any from this.
const notifyUsers = (users:any) => new Promise((resolve, reject) => {
  users.forEach(async (user:UserInterface) => {
    await emailUser(user);
  });
  console.log('finished notifying users.');
  resolve(true);
});


export default notifyUsers;
