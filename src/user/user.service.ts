import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreateUserDto } from './user.dto';
import { User } from '../types';

const FILE_PATH: string = 'users.json';

@Injectable()
export class UserService {
  private readUsers(): User[] {
    if (!fs.existsSync(FILE_PATH)) {
      this.writeUsers([]);
      return [];
    }

    return JSON.parse(fs.readFileSync(FILE_PATH).toString());
  }

  private writeUsers(users: User[]): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
  }

  getUsers(): User[] {
    return this.readUsers();
  }

  getUserById(userId: number): User {
    return this.readUsers().find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const users: User[] = this.readUsers();

    const generateUniqueBearerToken = (): string => {
      const bearerToken: string =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      if (users.some((user) => user.bearerToken === bearerToken)) {
        return generateUniqueBearerToken();
      }
      return bearerToken;
    };

    const newUser: User = {
      id: users.length + 1,
      ...createUserDto,
      bearerToken: generateUniqueBearerToken(),
      createdAt: new Date(),
    };

    users.push(newUser);
    this.writeUsers(users);

    return newUser;
  }
}
