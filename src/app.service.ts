import { Injectable } from '@nestjs/common';
import { ApiInformation } from './types';

@Injectable()
export class AppService {
  getIndex(): ApiInformation {
    const author: string = 'SofianeLasri';
    const apiVersion: string = '1.0.0';
    const apiName: string = 'The Todo List API';
    const apiDescription: string =
      'This is a simple API to manage a todo list. You can create, delete, update and read a todo.';
    const apiDocumentation: string =
      'https://github.com/SofianeLasri/m1-nestjs-project1/wiki';

    return {
      author: author,
      apiVersion: apiVersion,
      apiName: apiName,
      apiDescription: apiDescription,
      apiDocumentation: apiDocumentation,
    };
  }
}
