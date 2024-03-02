import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../types';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id', new ParseIntPipe()) id: number): Task {
    return this.taskService.getTask(id);
  }

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Post('update')
  updateTask(@Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Post('delete')
  deleteTask(@Body() id: number): void {
    return this.taskService.deleteTask(id);
  }
}
