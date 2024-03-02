import { Injectable } from '@nestjs/common';
import { Task } from '../types';
import * as fs from 'fs';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

const FILE_PATH: string = 'tasks.json';

@Injectable()
export class TaskService {
  /**
   * Reads the tasks from the file. If the file does not exist, it creates it and returns an empty array.
   * @private
   */
  private readTasks(): Task[] {
    if (!fs.existsSync(FILE_PATH)) {
      this.writeTasks([]);
      return [];
    }

    return JSON.parse(fs.readFileSync(FILE_PATH).toString());
  }

  private writeTasks(tasks: Task[]): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    return this.readTasks();
  }

  getTask(id: number): Task {
    return this.readTasks().find((task) => task.id === id);
  }

  createTask(newTaskDto: CreateTaskDto): Task {
    const tasks = this.readTasks();
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskDto.title,
      description: newTaskDto.description,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    this.writeTasks(tasks);

    return newTask;
  }

  updateTask(updateTaskDto: UpdateTaskDto): Task {
    const tasks = this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === updateTaskDto.id);
    console.log('taskIndex', taskIndex);
    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updateTaskDto,
      updatedAt: new Date(),
    };

    tasks[taskIndex] = updatedTask;
    this.writeTasks(tasks);

    return updatedTask;
  }

  deleteTask(id: number): void {
    const tasks = this.readTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    this.writeTasks(newTasks);
  }
}
