import { User } from './../../entities/User';
import { UpdateUserDTO } from './../../DTOs/UpdateUserDTO';



export abstract class IUsersRepository {
  abstract create(data: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract updateAdmin(data: UpdateUserDTO, id: string): Promise<User>;
}