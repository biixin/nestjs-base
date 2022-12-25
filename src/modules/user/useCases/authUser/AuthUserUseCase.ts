import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AuthUserDTO } from "../../DTOs/AuthUserDTO";
import { IUsersRepository } from "../../infra/implements/IUsersRepository";
import { IUserViewHTTP, UserViewModel } from "../../viewsModels/CreateUserView";
import { AppError } from './../../../../errors/AppError';

interface IResponse {
  user: IUserViewHTTP,
  token: string
}

@Injectable()
export class AuthUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private jwt: JwtService
  ) {}

  async execute({email, password}: AuthUserDTO): Promise <IResponse> {

    const user = await this.userRepository.findByEmail(email)
    if(!user) {
      throw new AppError("Email or password is wrong")
    }

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) {
      throw new AppError("Email or password is wrong")
    }

    // const token = sign({email: user.email}, process.env.JWT_SECRET_KEY as string || '8819', {
    //   subject: user.email,
    //   expiresIn: '1h'
    // });

    const token = this.jwt.sign({
      sub: user.id,
      id: user.id
    }, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY as string || '8819'
    });

    const response: IResponse = {
      user: UserViewModel.toHTTP(user),
      token
    }
    
    return response
  }
}