import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Every module used in another module should be passed throgh imports for declearing.
  // forFeature indicates this module is passed to be used only for its feature and not for instanciation.
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
