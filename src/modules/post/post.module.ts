// import { Module } from '@nestjs/common'
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from '../user/strategy/jwt.strategy';
// import { DatabasePostModule } from './infra/databasePost.module';
// import { CreatePostController } from './useCases/CreatePostController';
// import { CreatePostUseCase } from './useCases/CreatePostUseCase';

// @Module({
//   imports: [
//     DatabasePostModule,
//     PassportModule.register({defaultStrategy: 'jwt'}),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET_KEY,
//       signOptions: {
//         expiresIn: 3600
//       }
//     })
//   ],
//   controllers: [CreatePostController],
//   providers: [
//     CreatePostUseCase,
//     JwtStrategy
//   ],
//   exports: [JwtStrategy, PassportModule]
  
// })

// export class HttpPostModule {}
