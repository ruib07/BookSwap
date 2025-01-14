exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('reviews', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    t.uuid('book_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('reviewer_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.integer('rating').notNull().checkBetween([1, 5]);
    t.text('comment');
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('reviews');
