import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { matchers } from 'jest-json-schema';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('index', (): void => {
    it('should return the api informations', () => {
      const schema = {
        properties: {
          author: { type: 'string' },
          apiVersion: { type: 'string' },
          apiName: { type: 'string' },
          apiDescription: { type: 'string' },
          apiDocumentation: { type: 'string' },
        },
        required: [
          'author',
          'apiVersion',
          'apiName',
          'apiDescription',
          'apiDocumentation',
        ],
      };

      expect.extend(matchers);
      expect(appController.getIndex()).toMatchSchema(schema);
    });
  });
});
