const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('book_images').where(filter);

  const save = (registerBookImage) => {
    if (!registerBookImage.image_url) throw new ValidationError('Image URL is required!');

    return app.db('book_images').insert(registerBookImage, '*');
  };

  const remove = (id) => app.db('book_images')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    remove,
  };
};
