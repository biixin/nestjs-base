
import { randomUUID } from 'crypto';

enum Privacity {
  "public",
  "friends"
}

export class Post {
  id?: string
  body: string;
  privacity?: string;
  date: Date;
  user_id: string;


  constructor() {
    if(!this.id) {
      this.id = randomUUID()
    }
    if(!this.privacity) {
      this.privacity = "public"
    }
    if(!this.date) {
      this.date = new Date()
    }
  }
}