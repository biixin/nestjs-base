import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { User } from '../../entities/User';
import {hash} from 'bcrypt'
import { AppError } from '../../../../errors/AppError';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../infra/implements/IUsersRepository';
import { UpdateUserDTO } from '../../DTOs/UpdateUserDTO';


@Injectable()
export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: UpdateUserDTO, id: string): Promise<User> {

    const findUser = await this.usersRepository.findById(id as string)
    if(!findUser) {
      throw new AppError("User not find")
    }
    
    if(data.password) {
      const passwordHash = await hash(data.password, 10)
      data.password = passwordHash
    }

    const updatedUser = await this.usersRepository.updateAdmin(data, id)

    return updatedUser
  }
}