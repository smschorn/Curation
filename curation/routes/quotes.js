const express = require('express');
/* TODO: [9] Finally, routes! Import your genresController
 and inject the middleware in your `/new` and `/edit` as a first function in the chain
*/
const quotesController = require('../controllers/quotesController');

const views = require('../controllers/viewController');

const quotesRouter = express.Router();

/* TODO: [12] Since we already wrote out the model and the controller for our genres.
We need to inject the middleware function into the '/edit' route.
*/
quotesRouter.get('/:id/edit', quotesController.getOne, views.showEditForm, views.show404);
quotesRouter.get('/new', quotesController.makeBlankQuote, views.showAddForm, views.show404);

quotesRouter.route('/:id')
  .get(quotesController.getOne, views.showOne, views.show404)
  .put(quotesController.update, views.handleUpdate, views.show406)
  .delete(quotesController.destroy, views.handleDelete, views.show404);

quotesRouter.route('/')
  .get(quotesController.index, views.showQuotes, views.show404)
  .post(quotesController.create, views.handleCreate, views.show406);

module.exports = quotesRouter;
