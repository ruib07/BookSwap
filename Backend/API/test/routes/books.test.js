const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/books';
const secret = 'userBookSwap@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.userRegistration.save({
    username: 'User1',
    email: userEmail,
    password: 'User1@Created-123',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #14 - Get all books', () => request(app).get(route)
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #15 - Get a book by ID', () => app.db('books')
  .insert({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: user.id,
    status: 'Selling',
  }, ['id'])
  .then((bookRes) => request(app).get(`${route}/${bookRes[0].id}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #16 - Get a book by Owner ID', () => app.db('books')
  .insert({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: user.id,
    status: 'Selling',
  }, ['owner_id'])
  .then((bookRes) => request(app).get(`${route}/byOwner/${bookRes[0].owner_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #17 - Creating a book', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'The Lord of the Rings',
      author: 'JRR Tolkien',
      description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
      genre: 'Adventure',
      owner_id: user.id,
      status: 'Selling',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Book creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'The Lord of the Rings',
      author: 'JRR Tolkien',
      description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
      genre: 'Adventure',
      owner_id: user.id,
      status: 'Selling',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #18 - Insert a book without a title', () => testTemplate({ title: null }, 'Title is required!'));
  test('Test #19 - Insert a book without a author', () => testTemplate({ author: null }, 'Author is required!'));
  test('Test #20 - Insert a book without a description', () => testTemplate({ description: null }, 'Description is required!'));
  test('Test #21 - Insert a book without a genre', () => testTemplate({ genre: null }, 'Genre is required!'));
  test('Test #22 - Insert a book without a status', () => testTemplate({ status: null }, 'Status is required!'));
});

test('Test #23 - Updating book data', () => app.db('books')
  .insert({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: user.id,
    status: 'Selling',
  }, ['id'])
  .then((bookRes) => request(app).put(`${route}/${bookRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'Moby-Dick',
      author: 'Herman Melville',
      description: 'he book is centered on the sailor Ishmaels narrative of the maniacal quest of Ahab, captain of the whaling ship Pequod, for vengeance against Moby Dick, the giant white sperm whale that bit off his leg on the ships previous voyage.',
      genre: 'Adventure Fiction',
      owner_id: user.id,
      status: 'Traded',
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #24 - Deleting an book', async () => {
  const book = await app.db('books')
    .insert({
      title: 'The Lord of the Rings',
      author: 'JRR Tolkien',
      description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
      genre: 'Adventure',
      owner_id: user.id,
      status: 'Selling',
    }, ['id']);

  const res = await request(app).delete(`${route}/${book[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
