import { Module } from '@nestjs/common'


import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database.module';
import { CreatePostController } from './post/useCases/CreatePostController';
import { CreatePostUseCase } from './post/useCases/CreatePostUseCase';
import { JwtStrategy } from './user/strategy/jwt.strategy';
import { AuthUserController } from './user/useCases/authUser/AuthUserController';
import { AuthUserUseCase } from './user/useCases/authUser/AuthUserUseCase';
import { CreateUserController } from './user/useCases/createUser/CreateUserController';
import { CreateUserUseCase } from './user/useCases/createUser/CreateUserUseCase';
import { RequestUserController } from './user/useCases/requestUser/RequestUserController';
import { RequestUserUseCase } from './user/useCases/requestUser/RequestUserUseCase';
import { UpdateUserController } from './user/useCases/updateUser/UpdateUserController';
import { UpdateUserUseCase } from './user/useCases/updateUser/UpdateUserUseCase';


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
    CreatePostUseCase,
    JwtStrategy,
    
  ],
  exports: [JwtStrategy, PassportModule]
  
})

export class HttpModule {}
