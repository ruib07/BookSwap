const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  app.use('/auth', app.routes.auths);

  publicRouter.use('/userRegistrations', app.routes.userRegistrations);

  secureRouter.use('/users', app.routes.users);
  secureRouter.use('/books', app.routes.books);
  secureRouter.use('/bookImages', app.routes.bookImages);
  secureRouter.use('/transactions', app.routes.transactions);
  secureRouter.use('/reviews', app.routes.reviews);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
