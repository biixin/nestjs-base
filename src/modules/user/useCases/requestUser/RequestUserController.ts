import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user.decorator';
import { CreateUserDTO } from './../../DTOs/CreateUserDTO';
import { IUserViewHTTP, UserViewModel } from './../../viewsModels/CreateUserView';
import { RequestUserUseCase } from './RequestUserUseCase';

@Controller("/auth")
@UseGuards(AuthGuard('jwt'))
export class RequestUserController {
  constructor(
    private requestUserUseCase: RequestUserUseCase,
  ) {}
  
  @Post("/request")
  async request(@GetUser() user: IUserViewHTTP) {

    const userr = await this.requestUserUseCase.execute(user.id)

    return UserViewModel.toHTTP(userr)
  }

}