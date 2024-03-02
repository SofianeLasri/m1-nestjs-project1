import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    taskService = app.get<TaskService>(TaskService);
  });

  describe('getTasks', () => {
    it('should return an array of tasks', () => {
      const result: any[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', done: false },
      ];
      jest.spyOn(taskService, 'getTasks').mockImplementation(() => result);

      expect(taskController.getTasks()).toBe(result);
    });
  });

  describe('getTask', () => {
    it('should return a single task', () => {
      const taskId = 1;
      const result: any = {
        id: taskId,
        title: 'Task 1',
        description: 'Description 1',
        done: false,
      };
      jest.spyOn(taskService, 'getTask').mockImplementation(() => result);

      expect(taskController.getTask(taskId)).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description',
      };
      const result: any = {
        id: 1,
        ...createTaskDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };
      jest.spyOn(taskService, 'createTask').mockImplementation(() => result);

      expect(taskController.createTask(createTaskDto)).toBe(result);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const updateTaskDto: UpdateTaskDto = {
        id: 1,
        title: 'Updated Task',
        description: 'Updated Description',
        done: true,
      };
      const result: any = {
        id: 1,
        ...updateTaskDto,
        updatedAt: expect.any(Date),
      };
      jest.spyOn(taskService, 'updateTask').mockImplementation(() => result);

      expect(taskController.updateTask(updateTaskDto)).toBe(result);
    });
  });
});
