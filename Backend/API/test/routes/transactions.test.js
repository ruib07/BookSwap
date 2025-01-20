const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/transactions';
const secret = 'userBookSwap@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let sender;
let receiver;
let book;

beforeAll(async () => {
  const senderRegistration = await app.services.userRegistration.save({
    username: 'Sender',
    email: generateUniqueEmail(),
    password: 'Sender@Created-123',
  });

  sender = { ...senderRegistration[0] };
  sender.token = jwt.encode(sender, secret);

  const receiverRegistration = await app.services.userRegistration.save({
    username: 'Receiver',
    email: generateUniqueEmail(),
    password: 'Receiver@Created-123',
  });

  receiver = { ...receiverRegistration[0] };
  receiver.token = jwt.encode(receiver, secret);

  const bookRegistration = await app.services.book.save({
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    description: 'Set in Middle-earth, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit but eventually developed into a much larger work.',
    genre: 'Adventure',
    owner_id: sender.id,
    status: 'Selling',
  });

  book = { ...bookRegistration[0] };
});

test('Test #29 - Get a transaction by Sender ID', () => app.db('transactions')
  .insert({
    book_id: book.id,
    sender_id: sender.id,
    receiver_id: receiver.id,
    status: 'Completed',
  }, ['sender_id'])
  .then((transactionRes) => request(app).get(`${route}/sent/${transactionRes[0].sender_id}`)
    .set('Authorization', `bearer ${sender.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #30 - Get a transaction by Receiver ID', () => app.db('transactions')
  .insert({
    book_id: book.id,
    sender_id: sender.id,
    receiver_id: receiver.id,
    status: 'Completed',
  }, ['receiver_id'])
  .then((transactionRes) => request(app).get(`${route}/received/${transactionRes[0].receiver_id}`)
    .set('Authorization', `bearer ${receiver.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #31 - Creating a transaction', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${sender.token}`)
    .send({
      book_id: book.id,
      sender_id: sender.id,
      receiver_id: receiver.id,
      status: 'Completed',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Transaction creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${sender.token}`)
    .send({
      book_id: book.id,
      sender_id: sender.id,
      receiver_id: receiver.id,
      status: 'Completed',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #32 - Insert a transaction without a status', () => testTemplate({ status: null }, 'Status is required!'));
});

test('Test #33 - Updating transaction data', () => app.db('transactions')
  .insert({
    book_id: book.id,
    sender_id: sender.id,
    receiver_id: receiver.id,
    status: 'Pending',
  }, ['id'])
  .then((transactionRes) => request(app).put(`${route}/${transactionRes[0].id}`)
    .set('Authorization', `bearer ${sender.token}`)
    .send({
      book_id: book.id,
      sender_id: sender.id,
      receiver_id: receiver.id,
      status: 'Completed',
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #34 - Deleting an transaction', async () => {
  const transaction = await app.db('transactions')
    .insert({
      book_id: book.id,
      sender_id: sender.id,
      receiver_id: receiver.id,
      status: 'Completed',
    }, ['id']);

  const res = await request(app).delete(`${route}/${transaction[0].id}`)
    .set('Authorization', `bearer ${sender.token}`);

  expect(res.status).toBe(204);
});
