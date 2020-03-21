import { UserInterface } from '../../../server/src/database/models/UserModel';

export interface ServerResponseInterface {
  success:boolean|undefined;
  users:[];
  user:UserInterface;
  error:string|undefined;
}
