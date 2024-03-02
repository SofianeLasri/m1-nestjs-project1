import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/create (POST) - should create a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/create')
      .send({ username: 'testUser' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'testUser');
    expect(res.body).toHaveProperty('bearerToken');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('/users (GET) - should return an array of users', async () => {
    const res = await request(app.getHttpServer()).get('/users').expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/users/:id (GET) - should return a single user', async () => {
    const res = await request(app.getHttpServer()).get('/users/1').expect(200);

    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('bearerToken');
    expect(res.body).toHaveProperty('createdAt');
  });

  afterAll(async () => {
    await app.close();
  });
});
