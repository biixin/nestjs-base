import { UsersRepositoryInMemory } from '../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from '../../../../../test/factories/CreateUser-factory';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RequestUserUseCase } from './RequestUserUseCase';
import { RequestUserController } from './RequestUserController';
import { UserViewModel } from '../../viewsModels/CreateUserView';

let userRepository: UsersRepositoryInMemory
let requestUserUseCase: RequestUserUseCase
let requestUserController: RequestUserController

let createUserUseCase: CreateUserUseCase

describe('Auth Test', () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    requestUserUseCase = new RequestUserUseCase(userRepository)
    requestUserController = new RequestUserController(requestUserUseCase)

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    const user = await createUserUseCase.execute(makeUser())
  })

  it("Should return the same user", async () => {
    const user = await userRepository.users[0]
    const result = await requestUserController.request(UserViewModel.toHTTP(user))

    expect(result).toHaveProperty("id", user.id)
  })

})
