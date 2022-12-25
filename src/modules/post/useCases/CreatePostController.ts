import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserViewHTTP } from '../../../modules/user/viewsModels/CreateUserView';
import { GetUser } from '../../../modules/user/user.decorator';
import { CreatePostDTO } from '../DTOs/CreatePostDTO.spec';
import { CreatePostUseCase } from './CreatePostUseCase';

@Controller("/posts")
@UseGuards(AuthGuard('jwt'))
export class CreatePostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
  ) {}
  
  @Post("/create")
  async create(@Body() _body: CreatePostDTO, @GetUser() user: IUserViewHTTP) {
    const {body: body} = _body

    const post = await this.createPostUseCase.execute({body}, user.id)

    return post
  }

}