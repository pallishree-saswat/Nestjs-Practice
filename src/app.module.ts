import { Module ,NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './users/user.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { BlogsService } from './blogs/blogs.service';

import {AuthMiddleware} from './middleware/auth'
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http.filter';

@Module({
  imports: [EmployeeModule],
  controllers: [AppController,UserController],
  providers: [AppService, BlogsService,{
    provide: APP_FILTER,
    useClass:HttpExceptionFilter
  }],
})
// export class AppModule {}

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    //.forRoutes('posts')
    // .forRoutes(UserController)
    .forRoutes({
      path:'posts/post', method:RequestMethod.GET
    })
  }
}
