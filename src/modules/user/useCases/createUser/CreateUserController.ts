import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from './../../DTOs/CreateUserDTO';
import { UserViewModel } from './../../viewsModels/CreateUserView';

@Controller("/auth")
export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}
  
  @Post("/signup")
  async create(@Body() body: CreateUserDTO) {
    const {name, email, password, gender} = body

    const userr = await this.createUserUseCase.execute({
      name, email, password, gender
    })

    return UserViewModel.toHTTP(userr)
  }

}