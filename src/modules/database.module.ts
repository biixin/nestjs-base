
import {Module} from "@nestjs/common"
import { PrismaService } from "./instances/prisma.service";
import { IPostsRepository } from "./post/infra/implements/IPostsRepository";
import { PostRepositoryPrisma } from "./post/infra/prisma/repositories/PostRepositoryPrisma";
import { IUsersRepository } from "./user/infra/implements/IUsersRepository";
import { UsersRepositoryPrisma } from "./user/infra/prisma/repositories/UsersRepositoryPrisma";

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