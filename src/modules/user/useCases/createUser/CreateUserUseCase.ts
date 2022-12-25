import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { User } from './../../entities/User';
import {hash} from 'bcrypt'
import { AppError } from '../../../../errors/AppError';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../../user/infra/implements/IUsersRepository';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, password, gender}: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 10)

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if(userAlreadyExists) {
      throw new AppError("Email Already Exists")
    }

    if(!gender || gender !== '') {
      gender = 'male'
    }

    const user = new User()
    Object.assign(user, {
      name,
      email,
      password: passwordHash,
      gender: gender
    })

    await this.usersRepository.create(user)

    return user
  }
}