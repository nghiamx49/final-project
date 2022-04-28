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
});

describe('API/VALIDATION Send OTP Via Mail', () => {
  it('POST /api/validation/send-otp | request with incorrect email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/validation/send-otp')
      .send({email: 'mxnghia@gmail.com'})
    expect(response.statusCode).toBe(400);
  });

  it('POST /api/validation/send-otp | request with correct email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/validation/send-otp')
      .send({email: 'mxnghia49@gmail.com'})
    expect(response.statusCode).toBe(201);
  });

});
