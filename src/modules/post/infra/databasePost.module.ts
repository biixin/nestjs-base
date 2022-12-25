
import {Module} from "@nestjs/common"
import { PrismaService } from '../../instances/prisma.service';
import { IPostsRepository } from "./implements/IPostsRepository";
import { PostRepositoryPrisma } from "./prisma/repositories/PostRepositoryPrisma";

@Module({
  providers: [PrismaService,
    {
      provide: IPostsRepository,
      useClass: PostRepositoryPrisma
    }
  ],
  exports: [IPostsRepository]
})
export class DatabasePostModule {}