import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const result: any[] = [
        {
          id: 1,
          username: 'user1',
          bearerToken: 'token1',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(userService, 'getUsers').mockImplementation(() => result);

      expect(userController.getUsers()).toBe(result);
    });
  });

  describe('getUser', () => {
    it('should return a single user', () => {
      const userId = 1;
      const result: any = {
        id: userId,
        username: 'user1',
        bearerToken: 'token1',
        createdAt: new Date(),
      };
      jest.spyOn(userService, 'getUserById').mockImplementation(() => result);

      expect(userController.getUser(userId)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = { username: 'newUser' };
      const result: any = {
        id: 1,
        username: 'newUser',
        bearerToken: expect.any(String),
        createdAt: expect.any(Date),
      };
      jest.spyOn(userService, 'createUser').mockImplementation(() => result);

      expect(userController.createUser(createUserDto)).toBe(result);
    });
  });
});
