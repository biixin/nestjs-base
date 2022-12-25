import { UsersRepositoryInMemory } from './../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { AppError } from './../../../../errors/AppError';

let userRepository: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
  })

  it("should be able to create a user", async () => {
    await createUserUseCase.execute(makeUser())

    expect(userRepository.users).toHaveLength(1)
  })

  it("should be able to create a user with gender", async () => {
    await createUserUseCase.execute(makeUser({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test',
      gender: 'woman'
    }))

    expect(userRepository.users).toHaveLength(1)
  })

  it("should not be able to create a user with exists email", async () => {
    
     await createUserUseCase.execute(makeUser({
      email: 'test@gmail.com'
     }))

    try {
      await createUserUseCase.execute(makeUser({email: 'test@gmail.com'}))
    } catch (err) {
      expect(err).toBeInstanceOf(AppError)
      expect(err).toHaveProperty('message', 'Email Already Exists')
      expect(err).toHaveProperty('statusCode', 400)
    }

  })

})