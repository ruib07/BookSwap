exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('books', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('title').notNull();
    t.string('author').notNull();
    t.text('description');
    t.string('genre');

    t.uuid('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
    t.string('status').defaultTo('available');
  });
};

exports.down = (knex) => knex.schema.dropTable('books');
