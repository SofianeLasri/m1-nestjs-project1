import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Task (e2e)', () => {
  let app;
  let userToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const createUserRes = await request(app.getHttpServer())
      .post('/users/create')
      .send({ username: 'testUser' })
      .expect(201);

    userToken = createUserRes.body.bearerToken;
  });

  it('/tasks/create (POST) - should create a new task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks/create')
      .send({ title: 'New Task', description: 'Description', done: false })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'New Task');
    expect(res.body).toHaveProperty('description', 'Description');
    expect(res.body).toHaveProperty('done', false);
    expect(res.body).toHaveProperty('createdAt');
  });

  it('/tasks (GET) - should return an array of tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('/tasks/:id (GET) - should return a single task', async () => {
    const createTaskRes = await request(app.getHttpServer())
      .post('/tasks/create')
      .send({ title: 'Test Task', description: 'Description', done: false })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);

    const taskId = createTaskRes.body.id;

    const getTaskRes = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(getTaskRes.body).toHaveProperty('id', taskId);
    expect(getTaskRes.body).toHaveProperty('title', 'Test Task');
    expect(getTaskRes.body).toHaveProperty('description', 'Description');
    expect(getTaskRes.body).toHaveProperty('done', false);
  });

  it('/tasks/update (POST) - should update an existing task', async () => {
    const createTaskRes = await request(app.getHttpServer())
      .post('/tasks/create')
      .send({ title: 'Test Task', description: 'Description', done: false })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);

    const taskId = createTaskRes.body.id;

    const res = await request(app.getHttpServer())
      .post(`/tasks/update`)
      .send({
        id: taskId,
        title: 'Updated Task',
        description: 'Updated Description',
        done: true,
      })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);

    expect(res.body).toHaveProperty('id', taskId);
    expect(res.body).toHaveProperty('title', 'Updated Task');
    expect(res.body).toHaveProperty('description', 'Updated Description');
    expect(res.body).toHaveProperty('done', true);
    expect(res.body).toHaveProperty('updatedAt');
  });

  it('/tasks/delete (POST) - should delete an existing task', async () => {
    const createTaskRes = await request(app.getHttpServer())
      .post('/tasks/create')
      .send({ title: 'Test Task', description: 'Description', done: false })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);

    const taskId = createTaskRes.body.id;

    await request(app.getHttpServer())
      .post(`/tasks/delete`)
      .send({
        id: taskId,
      })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
