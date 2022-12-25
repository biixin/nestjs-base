import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { HttpModule } from './modules/user.module';



@Module({
  imports: [
    HttpModule, DatabaseModule
  ]
})
export class AppModule {}
