import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { IUserViewHTTP, UserViewModel } from '../../viewsModels/CreateUserView';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user.decorator';
import { ensureAdmin } from '../../ensureAdmin.guard';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserDTO } from '../../DTOs/UpdateUserDTO';
import { PassportModule } from '@nestjs/passport';

interface IPayload {
  id: string
}

@Controller("/users")
@UseGuards(AuthGuard('jwt'))
export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}
  
  @Post("/update/:id")
  // @UseGuards(ensureAdmin)
  async update(@Body() body: UpdateUserDTO, @Param() params: IPayload, @GetUser() user: IUserViewHTTP) {
    const {name, email, password, gender, avatar, isAdmin} = body
    let data = {}
    
    if(name !== '') {data = {...data, name }}
    if(email !== '') {data = {...data, email}}
    if(password !== '') {data = {...data, password}}
    if(gender !== '') {data = {...data, gender}}
    if(avatar !== '') {data = {...data, avatar}}
    data = {...data, isAdmin}

    // console.log('ideeeeee,', params)
    const userr = await this.updateUserUseCase.execute(data, params.id)

    return {user: UserViewModel.toHTTP(userr), }
  }

}