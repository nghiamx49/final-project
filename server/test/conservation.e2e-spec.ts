import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

describe('API/FEED Conservation API', () => {
  it('GET /api/conservation | Request without token', () => {
    return request(app.getHttpServer())
    .get('/api/conservation')
    .expect(401);
  });

  it('GET /api/conservation | Get all user conservation', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/conservation')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const json = JSON.parse(response.text);
    expect(json?.data).toBeTruthy();
    expect(json?.data?.length).toBeGreaterThanOrEqual(0);
  });

  it('GET /api/conservation/single | Get single conservation', async () => {
    const response = await request(app.getHttpServer())
      .get(
        '/api/conservation/single?userId=625c6aa2078a2da2a014a65c&friendId=625fba58ca69662f0162fa93',
      )
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const json = JSON.parse(response.text);
    expect(json?.data).toBeTruthy();
    expect(
      json?.data?.members?.filter(
        (user) => user._id === '625c6aa2078a2da2a014a65c',
      ).length > 0,
    ).toBeTruthy();
  });

  it('POST /api/conservation/ | Send New Message', async () => {
    const data = {
      senderId: '625c6aa2078a2da2a014a65c',
      receiverId: '625fba58ca69662f0162fa93',
      content: 'Message',
      conservationId: '62643a30488b712bf1acbbbf',
    };
    const response = await request(app.getHttpServer())
      .post('/api/conservation/')
      .send(data)
      .set('Authorization', token);
    expect(response.statusCode).toBe(201);
    const json = JSON.parse(response.text);
    expect(json?.data.content).toEqual(data.content);
  });
});
