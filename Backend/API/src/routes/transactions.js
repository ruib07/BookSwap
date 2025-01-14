const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/sent/:sender_id', (req, res, next) => {
    app.services.transaction.findAll({ sender_id: req.params.sender_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/received/:receiver_id', (req, res, next) => {
    app.services.transaction.findAll({ receiver_id: req.params.receiver_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.transaction.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.put('/:id', (req, res, next) => {
    app.services.transaction.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.transaction.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
