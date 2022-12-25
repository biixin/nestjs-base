import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDTO } from '../../DTOs/AuthUserDTO';
import { CreateUserDTO } from './../../DTOs/CreateUserDTO';
import { IUserViewHTTP, UserViewModel } from './../../viewsModels/CreateUserView';
import { AuthUserUseCase } from './AuthUserUseCase';

interface IResponse {
  user: IUserViewHTTP,
  token: string
}

@Controller("/auth")
export class AuthUserController {
  constructor(
    private authUserUseCase: AuthUserUseCase,
    // private jwt: JwtService
  ) {}
  
  @Post("/session")
  async signup(@Body() body: AuthUserDTO): Promise<IResponse> {
    const {email, password, } = body

    const user = await this.authUserUseCase.execute({
      email, password
    })

    return user
  }

  // @Post("/test")
  // @UseGuards(AuthGuard())
  // async test(@Req() req) {
  //   console.log(req.user)
  // }

}