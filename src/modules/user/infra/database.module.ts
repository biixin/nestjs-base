
import {Module} from "@nestjs/common"
import { IUsersRepository } from "./implements/IUsersRepository";
import { PrismaService } from '../../instances/prisma.service';
import { UsersRepositoryPrisma } from './prisma/repositories/UsersRepositoryPrisma';
import { IPostsRepository } from "../../post/infra/implements/IPostsRepository";
import { PostRepositoryPrisma } from "../../post/infra/prisma/repositories/PostRepositoryPrisma";

@Module({
  providers: [PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepositoryPrisma
    },
    {
      provide: IPostsRepository,
      useClass: PostRepositoryPrisma
    }
  ],
  exports: [IUsersRepository, IPostsRepository]
})
export class DatabaseModule {}