const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const find = (filter = {}) => app.db('book_images').where(filter).first();

  const save = (registerBookImage) => {
    if (!registerBookImage.image_url) throw new ValidationError('Image URL is required!');

    return app.db('book_images').insert(registerBookImage, '*');
  };

  const remove = (id) => app.db('book_images')
    .where({ id })
    .del();

  return {
    find,
    save,
    remove,
  };
};
