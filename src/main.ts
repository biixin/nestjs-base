import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { appErrorHandler } from './errors/appErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: false});
  

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  app.use(appErrorHandler)

  await app.listen(3000);
}

bootstrap();
