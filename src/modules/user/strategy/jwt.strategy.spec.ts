import { UsersRepositoryInMemory } from "../infra/prisma/repositories/inMemory/UsersRepositoryInMemory";
import { JwtStrategy } from "./jwt.strategy";
import { makeUser } from './../../../../test/factories/CreateUser-factory';
import { UserViewModel } from "../viewsModels/CreateUserView";
import { AppError } from './../../../errors/AppError';

let userRepository: UsersRepositoryInMemory
let jwt: JwtStrategy

const newUser = makeUser()

describe('Jwt Strategy', () => {
  
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    jwt = new JwtStrategy(
      userRepository
    )
  });

  it('Should be able to create a User', async () => {
    userRepository.create(newUser)
    const users = userRepository.users

    const result = await jwt.validate({
      id: users[0].id
    })

    expect(result).toEqual(UserViewModel.toHTTP(users[0]))
  })

  it('Return AppError when email not find', async () => {
    try {
      await jwt.validate({email: 'test@gmail.com'})
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('message', 'User not exists')
      expect(error).toHaveProperty('statusCode', 400)
    }
  })

 
});
