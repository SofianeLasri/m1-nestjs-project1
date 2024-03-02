import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../types';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }
}
