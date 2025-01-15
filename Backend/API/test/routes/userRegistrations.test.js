const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/userRegistrations';
const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #3 - Register a user', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      username: 'User1',
      email: userEmail,
      password: 'User1@Created-12',
    });

  expect(res.status).toBe(201);
});

test('Test #3.1 - Save ecripted password', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      username: 'User2',
      email: userEmail,
      password: 'User2@Created-12',
    });

  expect(res.status).toBe(201);

  const { id } = res.body[0];
  const userRegistrationInDb = await app.services.user.find({ id });
  expect(userRegistrationInDb.password).not.toBeUndefined();
  expect(userRegistrationInDb.password).not.toBe('User2@Created-12');
});

describe('User creation validation', () => {
  const userEmail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .send({
      username: 'User3',
      email: userEmail,
      password: 'User3@Created-12',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #4 - Insert a user without username', () => testTemplate({ username: null }, 'Username is required!'));
  test('Test #5 - Insert a user without email', () => testTemplate({ email: null }, 'Email is required!'));
  test('Test #6 - Insert a user without password', () => testTemplate({ password: null }, 'Password is required!'));
});
