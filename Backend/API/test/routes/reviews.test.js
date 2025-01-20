const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/reviews';
const secret = 'userBookSwap@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let reviewer;
let book;

beforeAll(async () => {
  const reviewerRegistration = await app.services.userRegistration.save({
    username: 'Reviewer',
    email: generateUniqueEmail(),
    password: 'Reviewer@Created-123',
  });

  reviewer = { ...reviewerRegistration[0] };
  reviewer.token = jwt.encode(reviewer, secret);

  const bookRegistration = await app.services.book.save({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: reviewer.id,
    status: 'Selling',
  });

  book = { ...bookRegistration[0] };
});

test('Test #35 - Get reviews by Reviewer ID', () => app.db('reviews')
  .insert({
    book_id: book.id,
    reviewer_id: reviewer.id,
    rating: 4,
    comment: 'Really good book to read.',
  }, ['reviewer_id'])
  .then((reviewRes) => request(app).get(`${route}/${reviewRes[0].reviewer_id}`)
    .set('Authorization', `bearer ${reviewer.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #36 - Creating a review', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${reviewer.token}`)
    .send({
      book_id: book.id,
      reviewer_id: reviewer.id,
      rating: 4,
      comment: 'Really good book to read.',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Transaction creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${reviewer.token}`)
    .send({
      book_id: book.id,
      reviewer_id: reviewer.id,
      rating: 4,
      comment: 'Really good book to read.',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #37 - Insert a review without a rating', () => testTemplate({ rating: null }, 'Rating is required!'));
  test('Test #38 - Insert a review without a comment', () => testTemplate({ comment: null }, 'Comment is required!'));
});

test('Test #39 - Deleting an transaction', async () => {
  const review = await app.db('reviews')
    .insert({
      book_id: book.id,
      reviewer_id: reviewer.id,
      rating: 4,
      comment: 'Really good book to read.',
    }, ['id']);

  const res = await request(app).delete(`${route}/${review[0].id}`)
    .set('Authorization', `bearer ${reviewer.token}`);

  expect(res.status).toBe(204);
});
