import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from '../DTOs/CreatePostDTO.spec';
import { IPostsRepository } from '../infra/implements/IPostsRepository';
import { AppError } from '../../../errors/AppError';
import { Post } from '../entities/Post';
import { IUsersRepository } from 'src/modules/user/infra/implements/IUsersRepository';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private postRepository: IPostsRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute(data: CreatePostDTO, user_id: string): Promise<Post> {

    const userExists = await this.userRepository.findById(user_id)
    if(!userExists) {
      throw new AppError("User not find")
    }
  
    const post = new Post()
    Object.assign(post, {
      body: data.body
    })
    
    await this.postRepository.create(post, user_id)

    return post
  }
}