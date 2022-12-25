
import { Post } from '../../../entities/Post';


export class PrismaPostMapper {
  static toPrisma(post: Post, user_id: string) {
    return {
      id: post.id,
      body: post.body,
      privacity: post.privacity,
      date: post.date,
      user_id: user_id
    }
  }
}