import { CreateUserController } from './useCases/createUser/CreateUserController';
import { DatabaseModule } from './infra/database.module';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';
import { Module } from '@nestjs/common'
import { AuthUserUseCase } from './useCases/authUser/AuthUserUseCase';
import { AuthUserController } from './useCases/authUser/AuthUserController';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UpdateUserUseCase } from './useCases/updateUser/UpdateUserUseCase';
import { UpdateUserController } from './useCases/updateUser/UpdateUserController';
import { RequestUserController } from './useCases/requestUser/RequestUserController';
import { RequestUserUseCase } from './useCases/requestUser/RequestUserUseCase';
import { CreatePostController } from '../post/useCases/CreatePostController';
import { CreatePostUseCase } from '../post/useCases/CreatePostUseCase';
// import { DatabasePostModule } from '../post/infra/databasePost.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [CreateUserController, AuthUserController, UpdateUserController, RequestUserController, CreatePostController
  ],
  providers: [
    CreateUserUseCase,
    AuthUserUseCase,
    UpdateUserUseCase,
    RequestUserUseCase,
    JwtStrategy,
    CreatePostUseCase,
  ],
  exports: [JwtStrategy, PassportModule]
  
})

export class HttpModule {}
