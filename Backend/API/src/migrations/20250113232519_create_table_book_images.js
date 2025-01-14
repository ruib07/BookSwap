exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('book_images', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    t.uuid('book_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE')
      .notNull();

    t.text('image_url').notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('book_images');
