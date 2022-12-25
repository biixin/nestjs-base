import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { User } from '../../entities/User';
import {hash} from 'bcrypt'
import { AppError } from '../../../../errors/AppError';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../infra/implements/IUsersRepository';
import { IUserViewHTTP } from '../../viewsModels/CreateUserView';


@Injectable()
export class RequestUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {

    const user = await this.usersRepository.findById(id);
    if(!user) {
      throw new AppError("User not find")
    }

    return user
  }
}