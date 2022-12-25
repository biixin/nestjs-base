
import { User } from './../entities/User';

export interface IUserViewHTTP {
  id: string,
  name: string,
  email: string,
  avatar: string;
  gender: string;
  isAdmin: boolean
}

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      gender: user.gender,
      isAdmin: user.isAdmin
    }
  }
}