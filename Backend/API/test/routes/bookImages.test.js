const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/bookImages';
const secret = 'userBookSwap@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;
let book;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.userRegistration.save({
    username: 'User1',
    email: userEmail,
    password: 'User1@Created-123',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);

  const bookRegistration = await app.services.book.save({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: user.id,
    status: 'Selling',
  });

  book = { ...bookRegistration[0] };
});

test('Test #25 - Get a book image by Book ID', () => app.db('book_images')
  .insert({
    book_id: book.id,
    image_url: 'https://books.bizmandala.com/media/books/9780261103252/image_vgrjam3.jpeg',
  }, ['book_id'])
  .then((bookImageRes) => request(app).get(`${route}/${bookImageRes[0].book_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #26 - Creating a book image', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      book_id: book.id,
      image_url: 'https://books.bizmandala.com/media/books/9780261103252/image_vgrjam3.jpeg',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Book Image creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      book_id: book.id,
      image_url: 'https://books.bizmandala.com/media/books/9780261103252/image_vgrjam3.jpeg',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #27 - Insert a book image without a image url', () => testTemplate({ image_url: null }, 'Image URL is required!'));
});

test('Test #28 - Deleting an book image', async () => {
  const bookImage = await app.db('book_images')
    .insert({
      book_id: book.id,
      image_url: 'https://books.bizmandala.com/media/books/9780261103252/image_vgrjam3.jpeg',
    }, ['id']);

  const res = await request(app).delete(`${route}/${bookImage[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
