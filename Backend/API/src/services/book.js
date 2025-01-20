const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('books').where(filter);

  const find = (filter = {}) => app.db('books').where(filter).first();

  const save = (registerBook) => {
    if (!registerBook.title) throw new ValidationError('Title is required!');
    if (!registerBook.author) throw new ValidationError('Author is required!');
    if (!registerBook.description) throw new ValidationError('Description is required!');
    if (!registerBook.genre) throw new ValidationError('Genre is required!');
    if (!registerBook.status) throw new ValidationError('Status is required!');

    return app.db('books').insert(registerBook, '*');
  };

  const update = (id, bookRes) => app.db('books')
    .where({ id })
    .update(bookRes, '*');

  const remove = (id) => app.db('books')
    .where({ id })
    .del();

  return {
    findAll,
    find,
    save,
    update,
    remove,
  };
};
