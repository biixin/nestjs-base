
import { randomUUID } from 'crypto';

export class User {
  id?: string
  name: string;
  email: string;
  password: string;
  gender?: string;
  avatar?: string | null;
  isAdmin?: boolean
  createdAt?: Date;

  constructor() {
    if(!this.id) {
      this.id = randomUUID()
    }
    if(!this.gender) {
      this.gender = 'male'
    }
    if(!this.createdAt) {
      this.createdAt = new Date()
    }
    if(!this.avatar || this.avatar == '') {
      this.avatar = process.env.AVATAR
    }
    if(!this.isAdmin) {
      this.isAdmin = false
    }
  }
}