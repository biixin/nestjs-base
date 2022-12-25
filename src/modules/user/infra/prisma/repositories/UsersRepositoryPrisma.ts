
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './../../implements/IUsersRepository';
import { PrismaService } from '../../../../instances/prisma.service';
import { User } from './../../../entities/User';
import { PrismaUserMapper } from './../mappers/UserMapperPrisma';
import { UpdateUserDTO } from './../../../DTOs/UpdateUserDTO';

@Injectable()
export class UsersRepositoryPrisma implements IUsersRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)
    
    await this.prisma.user.create({
      data: raw
    })
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async updateAdmin(data: UpdateUserDTO, id: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: data
    })
    return user
  }
  
}