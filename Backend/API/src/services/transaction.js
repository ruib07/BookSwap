const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('transactions').where(filter);

  const save = (registerTransaction) => {
    if (!registerTransaction.status) throw new ValidationError('Status is required!');

    return app.db('transactions').insert(registerTransaction, '*');
  };

  const update = (id, transactionRes) => app.db('transactions')
    .where({ id })
    .update(transactionRes, '*');

  const remove = (id) => app.db('transactions')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    update,
    remove,
  };
};
