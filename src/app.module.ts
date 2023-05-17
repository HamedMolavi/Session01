import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import DBConfig from './db';
import { AuthMiddleware } from './auth/auth.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';

@Module({
  imports: [
    DBConfig('test'),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(''); // { path: 'user', method: RequestMethod.ALL }
  // }
}
