const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('reviews').where(filter);

  const save = (registerReview) => {
    if (!registerReview.rating) throw new ValidationError('Rating is required!');
    if (!registerReview.comment) throw new ValidationError('Comment is required!');

    return app.db('reviews').insert(registerReview, '*');
  };

  const remove = (id) => app.db('reviews')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    remove,
  };
};
