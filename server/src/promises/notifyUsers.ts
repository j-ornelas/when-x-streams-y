import { UserInterface } from '../database/models/UserModel';
import { SubscriptionInterface } from '../database/models/SubscriptionModel';
import emailUser from './emailUser';
// TODO: remove the any from this.
const notifyUsers = (users:any, subscription:SubscriptionInterface) => new Promise((resolve, reject) => {
  users.forEach(async (user:UserInterface) => {
    await emailUser(user, subscription);
  });
  resolve(true);
});


export default notifyUsers;
