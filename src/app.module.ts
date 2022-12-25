import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/user/infra/database.module';
import { HttpModule } from './modules/user/user.module';


@Module({
  imports: [
    HttpModule, DatabaseModule
  ]
})
export class AppModule {}
