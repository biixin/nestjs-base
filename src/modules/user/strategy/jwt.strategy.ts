import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/User";
import { UsersRepositoryPrisma } from './../infra/prisma/repositories/UsersRepositoryPrisma';
import { AppError } from './../../../errors/AppError';
import { IUsersRepository } from "../infra/implements/IUsersRepository";
import { UserViewModel } from "../viewsModels/CreateUserView";
import { IUserViewHTTP } from './../viewsModels/CreateUserView';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: IUsersRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY || 'test',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<IUserViewHTTP> {
    const { id } = payload
    const user = await this.usersRepository.findById(id)

    if(!user) {
      throw new AppError('User not exists')
    }

    return UserViewModel.toHTTP(user)
  }
}