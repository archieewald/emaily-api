import { IUser } from './models';

declare global {
  namespace Express {
    interface User extends IUser {
      id?: string;
    }
  }
}
