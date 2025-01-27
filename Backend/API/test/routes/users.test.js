const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/users';
const secret = 'userBookSwap@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.userRegistration.save({
    username: 'User1',
    email: userEmail,
    password: 'User1@Created-12',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #7 - Get user by his ID', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      username: 'User2',
      email: userEmail,
      password: 'User2@Created-123',
    }, ['id'])
    .then((userRes) => request(app).get(`${route}/${userRes[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #8 - Updating user data', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      username: 'User2',
      email: userEmail,
      password: 'User2@Created-123',
    }, ['id'])
    .then((userRes) => request(app).put(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send({
        username: 'User3',
        email: userEmail,
        password: 'User3@Created-12',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #9 - Deleting an user', async () => {
  const userEmail = generateUniqueEmail();

  const userDel = await app.db('users')
    .insert({
      username: 'User4',
      email: userEmail,
      password: 'User4@Created-123',
    }, ['id']);

  const res = await request(app).delete(`${route}/${userDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
