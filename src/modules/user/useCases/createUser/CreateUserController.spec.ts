import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { IUsersRepository } from '../../infra/implements/IUsersRepository';
import { UsersRepositoryInMemory } from '../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';

describe('MyController', () => {
  let myController: CreateUserController;
  let myService: CreateUserUseCase;
  // let userRepository: UsersRepositoryInMemory


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserUseCase, {
        provide: IUsersRepository,
        useClass: UsersRepositoryInMemory
      }],
    }).compile();

    myController = module.get<CreateUserController>(CreateUserController);
    myService = module.get<CreateUserUseCase>(CreateUserUseCase);
    // userRepository = new UsersRepositoryInMemory()

  });

  describe('Create User Controller', () => {
    it('Should be create a user',async () => {
      const result = await myController.create(makeUser())
      expect(result).toHaveProperty("id")
      expect(result).toHaveProperty("email", 'test@gmail.com')
    });
    
  });
});