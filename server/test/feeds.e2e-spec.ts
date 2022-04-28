import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ok } from 'assert';

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

describe('API/FEED New Feed API', () => {  
  it('GET /api/feeds/ | Request without token', () => {
    return request(app.getHttpServer())
      .get('/api/feeds')
      .expect(401);
  });

  it('GET /api/feeds/ | Get all posts in new feed', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/feeds')
      .set('Authorization', token)
      expect(response.statusCode).toBe(200);
      const json = JSON.parse(response.text);
      expect(json?.data).toBeTruthy();
      expect(json?.data?.length).toBeGreaterThanOrEqual(0);
  });

  it('GET /api/feeds/:userId | Get all posts of an user', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/feeds/625c6aa2078a2da2a014a65c')
      .set('Authorization', token)
      expect(response.statusCode).toBe(200);
      const json = JSON.parse(response.text);
      expect(json?.data).toBeTruthy();
      expect(json?.data?.length).toBeGreaterThanOrEqual(0);
  });

  it('GET /api/feeds/posts/:postId | Get single post', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/feeds/posts/6260705ddee289620c6589d7')
      .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      const json = JSON.parse(response.text);
      expect(json?.data).toBeTruthy();
  });

  it('POST /api/feeds | Create New Post', async () => {
      const content = 'New Content';
    const response = await request(app.getHttpServer())
      .post('/api/feeds/')
      .send({content})
      .set('Authorization', token);
      expect(response.statusCode).toBe(201);
      const json = JSON.parse(response.text);
      expect(json?.data.content).toEqual(content);
  });


  it('POST /api/feeds/posts/:postId/comment | Comment to a Post', async () => {
      const content = 'New Comment Content';
    const response = await request(app.getHttpServer())
      .post('/api/feeds/posts/6260705ddee289620c6589d7/comment')
      .send({ content })
      .set('Authorization', token);
      expect(response.statusCode).toBe(201);
      const json = JSON.parse(response.text);
      expect(json?.data?.filter(message => message.content === content).length > 0).toBeTruthy();
  });

  it('POST /api/feeds/posts/:postId/reaction | Comment to a Post', async () => {
      const reactionType = 'Love';
    const response = await request(app.getHttpServer())
      .post('/api/feeds/posts/6260705ddee289620c6589d7/comment')
      .send({ reactionType })
      .set('Authorization', token);
      expect(response.statusCode).toBe(201);
      const json = JSON.parse(response.text);
      expect(json?.data?.length).toBeTruthy();
  });

});
