

import { IUsersRepository } from '../../../implements/IUsersRepository';
import { User } from './../../../../entities/User';
import { CreateUserDTO } from './../../../../DTOs/CreateUserDTO';
import { UpdateUserDTO } from 'src/modules/user/DTOs/UpdateUserDTO';


export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: CreateUserDTO): Promise<void> {
    this.users.push(data)
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((i) => i.id === id)
    if(!user) {
      return null
    }
    return user
  }
  async updateAdmin(data: UpdateUserDTO, id: string): Promise<User> {
    const userIndex = this.users.findIndex((i) => i.id === id)
    
    this.users[userIndex] = Object.assign(this.users[userIndex], data)
    return this.users[userIndex]
    
  }

}