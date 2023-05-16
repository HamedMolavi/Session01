import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import DBConfig from './db';

@Module({
  imports: [
    DBConfig('test'),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
