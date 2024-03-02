import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { TaskModule } from './task/task.module';
import { LoggerMiddleware } from './logger.middleware';
import { TaskController } from './task/task.controller';

@Module({
  imports: [ConfigurationModule, TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController, TaskController);
  }
}
