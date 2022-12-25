

import { UsersRepositoryInMemory } from '../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';

import { makeUser } from '../../../../../test/factories/CreateUser-factory';
import { User } from '../../entities/User';
import { UserViewModel } from '../../viewsModels/CreateUserView';
import { AuthUserUseCase } from './AuthUserUseCase';
import { UpdateUserController } from '../updateUser/UpdateUserController';
import { AuthUserController } from './AuthUserController';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let userRepository: UsersRepositoryInMemory
let authUserUseCase: AuthUserUseCase
let authUserController: AuthUserController
let jwtService: JwtService

let createUserUseCase: CreateUserUseCase

describe('Auth Test', () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    jwtService = new JwtService()
    authUserUseCase = new AuthUserUseCase(userRepository, jwtService)
    authUserController = new AuthUserController(authUserUseCase)

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    await createUserUseCase.execute(makeUser())
  })

  it("Return token if data is correct", async () => {
    const result = await authUserController.signup(makeUser())
    expect(result).toHaveProperty("token")
  })

})
