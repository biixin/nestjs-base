
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UsersRepositoryInMemory } from '../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { UpdateUserController } from './UpdateUserController';
import { makeUser } from '../../../../../test/factories/CreateUser-factory';
import { User } from '../../entities/User';
import { UserViewModel } from '../../viewsModels/CreateUserView';




let userRepository: UsersRepositoryInMemory
let updateUserUseCase: UpdateUserUseCase
let updateUserController: UpdateUserController

describe('Update Test', () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    updateUserUseCase = new UpdateUserUseCase(userRepository)
    updateUserController = new UpdateUserController(updateUserUseCase)
  })

  it("Should updated a user", async () => {
    await userRepository.create(makeUser())
    await userRepository.create(makeUser({
      email: 'test2@gmail.com'
    }))
    const users = userRepository.users
    
    const updateUser = await updateUserController.update(
      {email: 'updated@gmail.com'}, 
      {id: users[1].id}, 
      UserViewModel.toHTTP(users[0])
    )
    
    expect(updateUser.user).toEqual((expect.objectContaining({email: 'updated@gmail.com'})))
    expect(users[1].email).toEqual("updated@gmail.com")
  })

})
