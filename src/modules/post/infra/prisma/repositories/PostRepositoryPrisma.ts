import { Post } from "src/modules/post/entities/Post";
import { IPostsRepository } from "../../implements/IPostsRepository";
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../instances/prisma.service';
import { PrismaPostMapper } from "../mapper/PostMapperPrisma";


@Injectable()
export class PostRepositoryPrisma implements IPostsRepository {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(post: Post, user_id: string): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post, user_id)

    await this.prisma.post.create({
      data: raw
    })
  }
  async findById(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id
      }
    })
    return post
  }
  
}