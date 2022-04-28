import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyNWM2YWEyMDc4YTJkYTJhMDE0YTY1YyIsImVtYWlsIjoibXhuZ2hpYTQ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiVTJGc2RHVmtYMStsRHBJYTNvc0VpODl2VlhTalllS041SW1CallIWE5mND0iLCJmdWxsbmFtZSI6Ik1haSBYdWFuIE5naGlhIFVwZGF0ZSAxIiwiZGF0ZU9mQmlydGgiOiIyMDAwLTA0LTA5VDAwOjAwOjAwLjAwMFoiLCJhZ2UiOjIyLCJhZGRyZXNzIjoiIiwicm9sZSI6IlVzZXIiLCJpc1ZlcmlmeSI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjItMDQtMTdUMTk6Mjk6MzguNjA2WiIsInVwZGF0ZWRBdCI6IjIwMjItMDQtMjZUMjE6NDA6MzguOTM3WiIsImF2YXRhciI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHBwZHVkd3EyL2ltYWdlL3VwbG9hZC92MTY1MDk5ODQyOS9pbWFnZXMvbnN0ODZjbmtodWg1dWFyaHV2anMuanBnIiwiY292ZXIiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RwcGR1ZHdxMi9pbWFnZS91cGxvYWQvdjE2NTAzOTI4ODIvaW1hZ2VzL2dnb2x6cHFqaWZicHQzbmp2Y2h6LmpwZyIsImlzT25saW5lIjp0cnVlLCJzb2NrZXRJZCI6IlF0RU5rT05SNU85WXo0LVZBQUFGIiwidXNlcm5hbWUiOiJteG5naGlhNDkifSwiaWF0IjoxNjUxMDEyMDE3LCJleHAiOjE2NTM2MDQwMTd9.MiFzNi7p6dox0X6eDu6ydckJTDVOHqAep_80rYl7sGI';
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

describe('API/PROFILE Profile API', () => {

  it('GET /api/profile/625c6aa2078a2da2a014a65c | Get user profile', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/profile/625c6aa2078a2da2a014a65c',
    );
    expect(response.statusCode).toBe(200);
  });
  
  it('GET /api/profile/asdasd | Get wrong user profile', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/profile/asdasd')
    expect(response.statusCode).toBe(400);
  });

  it('PUT /api/profile/ | update own profile', async () => {
    const data = {
      username: 'newusername',
    };
    const response = await request(app.getHttpServer())
      .put('/api/profile/')
      .send(data)
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });



});
