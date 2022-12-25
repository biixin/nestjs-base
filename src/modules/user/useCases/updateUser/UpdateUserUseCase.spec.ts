import { UsersRepositoryInMemory } from '../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from '../../../../../test/factories/CreateUser-factory';
import { AppError } from '../../../../errors/AppError';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { User } from '../../entities/User';

let userRepository: UsersRepositoryInMemory
let updateUserUseCase: UpdateUserUseCase
let idUser = ''

describe("Update User", () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    updateUserUseCase = new UpdateUserUseCase(
      userRepository
    )
    await userRepository.create(makeUser({
      email: 'test@gmail.com'
    }))
    const user = await userRepository.findByEmail('test@gmail.com')
    idUser = user.id

  })

  it("should be able to update a user", async () => {

    const updated = await updateUserUseCase.execute({
      email: 'updated@gmail.com',
      password: '8819'
    }, idUser)

    expect(userRepository.users).toHaveLength(1)
    expect(updated).toEqual(expect.objectContaining({email: 'updated@gmail.com'}))
  })

  it("Return AppError when send an id that not exists", async () => {

    try {
      await updateUserUseCase.execute({
        email: 'updated@gmail.com'
      }, 'x')
    } catch (err) {
      expect(err).toBeInstanceOf(AppError)
      expect(err).toHaveProperty('message', 'User not find')
      expect(err).toHaveProperty('statusCode', 400)
    }
    
    expect(userRepository.users).toHaveLength(1)
  })

})