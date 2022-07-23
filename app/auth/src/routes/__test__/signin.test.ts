import request from 'supertest';
import { app } from '../../app';

it("fails when an email that doesn't exist is supplied", async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(400);
});

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'test123' })
    .expect(400);
});

it('logs in when correct password and email are provided and responds with a cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
