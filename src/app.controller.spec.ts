import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiInformation } from './types';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('index', () => {
    it('should return the api informations', () => {
      const apiInfo: ApiInformation = {
        author: 'SofianeLasri',
        apiVersion: '1.0.0',
        apiName: 'The Todo List API',
        apiDescription:
          'This is a simple API to manage a todo list. You can create, delete, update and read a todo.',
        apiDocumentation:
          'https://github.com/SofianeLasri/m1-nestjs-project1/wiki',
      };

      expect(appController.getIndex()).toEqual(apiInfo);
    });
  });
});
