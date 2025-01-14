exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('transactions', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    t.uuid('book_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('sender_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('receiver_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.string('status').defaultTo('pending');
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('transactions');
