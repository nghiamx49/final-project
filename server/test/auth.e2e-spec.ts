import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
    await app.close();
})

describe('API/AUTH Authentication API', () => {
  
  it('POST /auth/login | login with correct credential', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'account4@gmail.com', password: 'abc123@' })
      .expect(200);
  });

  it('POST /auth/login | login with incorrect credential', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'incorrect@gmail.com', password: 'abc123@' })
      .expect(401);
  });

  it('POST /auth/register | register new account with correct data', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: 'account8@gmail.com', password: 'abc123@', fullname: 'End to End Testing', dateOfBirth: new Date(2000, 4 , 9) })
      .expect(201);
  });

  it('POST /auth/register | register new account with already existed email', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: 'account4@gmail.com', password: 'abc123@', fullname: 'End to End Testing', dateOfBirth: new Date(2000, 4 , 9) })
      .expect(400);
  });

  it('POST /auth/register | register new account with incorrect data', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: 'account4@gmail.com', password: 'abc123@', dateOfBirth: new Date(2000, 4 , 9) })
      .expect(400);
  });
});
