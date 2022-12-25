import { UsersRepositoryInMemory } from './../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { AppError } from './../../../../errors/AppError';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RequestUserUseCase } from './RequestUserUseCase';

let userRepository: UsersRepositoryInMemory
let requestUserUseCase: RequestUserUseCase

let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    requestUserUseCase = new RequestUserUseCase(userRepository)

    createUserUseCase = new CreateUserUseCase(userRepository)
  })

  it("should be able request a user", async () => {
    await createUserUseCase.execute(makeUser())
    const user = userRepository.users[0]

    const result = await requestUserUseCase.execute(user.id)
    expect(result).toHaveProperty("id", user.id)
  })

  it("Return AppError when id not find", async () => {
    try {
      await requestUserUseCase.execute('wrongId')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('message', 'User not find')
      expect(error).toHaveProperty('statusCode', 400)
    }
  })

})