const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/byBook/:book_id', (req, res, next) => {
    app.services.review.findAll({ book_id: req.params.book_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/:reviewer_id', (req, res, next) => {
    app.services.review.findAll({ reviewer_id: req.params.reviewer_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.review.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.review.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
