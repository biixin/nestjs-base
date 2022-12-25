import { UsersRepositoryInMemory } from './../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { AppError } from './../../../../errors/AppError';
import { AuthUserUseCase } from './AuthUserUseCase';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';

let userRepository: UsersRepositoryInMemory
let authUserUseCase: AuthUserUseCase
let jwtService: JwtService

let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    jwtService = new JwtService()
    authUserUseCase = new AuthUserUseCase(
      userRepository,
      jwtService
    )
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    await createUserUseCase.execute(makeUser())
    // await userRepository.create(makeUser())
  })

  it("should be able to authenticate a user with correct email and password", async () => {
    const auth = await authUserUseCase.execute(makeUser())
    expect(auth).toHaveProperty("token")
  })

  it("Return AppError when sending an email that does not exist", async () => {
    try {
      const auth = await authUserUseCase.execute(makeUser({
        email: 'wrong@gmail.com',
      }))
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('message', 'Email or password is wrong')
      expect(error).toHaveProperty('statusCode', 400)
    }
  })

  it("Return AppError when sending an wrong password", async () => {
    try {
      const auth = await authUserUseCase.execute(makeUser({
        password: 'wrong',
      }))
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('message', 'Email or password is wrong')
      expect(error).toHaveProperty('statusCode', 400)
    }
  })

})