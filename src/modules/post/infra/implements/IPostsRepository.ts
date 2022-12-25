import { Post } from '../../entities/Post';

export abstract class IPostsRepository {
  abstract create(data: Post, user_id: string): Promise<void>;
  abstract findById(id: string): Promise<Post>;
}