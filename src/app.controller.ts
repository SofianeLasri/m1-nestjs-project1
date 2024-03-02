import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiInformation } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): ApiInformation {
    return this.appService.getIndex();
  }
}
