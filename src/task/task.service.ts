import { Injectable } from '@nestjs/common';
import { Task } from '../types';

@Injectable()
export class TaskService {
  getTasks(): Task[] {
    const tasks: Task[] = [];

    for (let i = 1; i < 11; i++) {
      tasks.push({
        id: i,
        title: `Task ${i}`,
        description: `This is the description for task ${i}`,
        done: false,
      });
    }

    return tasks;
  }
}
