const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  app.use('/auth', app.routes.auths);
  app.use('/passwordrecovery', app.routes.password_reset_routes);

  publicRouter.use('/userRegistrations', app.routes.userRegistrations);

  publicRouter.use('/books', (req, res, next) => {
    const booksRouter = express.Router();

    booksRouter.get('/', app.routes.books.stack.find((r) => r.route.path === '/').route.stack[0].handle);
    booksRouter.get('/:id', app.routes.books.stack.find((r) => r.route.path === '/:id').route.stack[0].handle);

    return booksRouter(req, res, next);
  });

  publicRouter.use('/bookImages', (req, res, next) => {
    const bookImagesRouter = express.Router();

    bookImagesRouter.get('/:book_id', app.routes.bookImages.stack.find((r) => r.route.path === '/:book_id').route.stack[0].handle);

    return bookImagesRouter(req, res, next);
  });

  publicRouter.use('/reviews', (req, res, next) => {
    const reviewsRouter = express.Router();

    reviewsRouter.get('/byBook/:book_id', app.routes.reviews.stack.find((r) => r.route.path === '/byBook/:book_id').route.stack[0].handle);
    reviewsRouter.get('/:reviewer_id', app.routes.reviews.stack.find((r) => r.route.path === '/:reviewer_id').route.stack[0].handle);

    return reviewsRouter(req, res, next);
  });

  publicRouter.use('/users', (req, res, next) => {
    const usersRouter = express.Router();

    usersRouter.get('/:id', app.routes.users.stack.find((r) => r.route.path === '/:id').route.stack[0].handle);

    return usersRouter(req, res, next);
  });

  secureRouter.use('/users', app.routes.users);
  secureRouter.use('/books', app.routes.books);
  secureRouter.use('/bookImages', app.routes.bookImages);
  secureRouter.use('/transactions', app.routes.transactions);
  secureRouter.use('/reviews', app.routes.reviews);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
