const express = require('express');
/* TODO: [9] Finally, routes! Import your genresController
 and inject the middleware in your `/new` and `/edit` as a first function in the chain
*/
// const collectionsController = require('../controllers/collectionsController');
//
// const views = require('../controllers/viewController');
//
const collectionsRouter = express.Router();
//
// /* TODO: [12] Since we already wrote out the model and the controller for our genres.
// We need to inject the middleware function into the '/edit' route.
// */
// collectionsRouter.get('/:id/edit', collectionsController.getOne, views.showEditForm, views.show404);
//
// collectionsRouter.route('/:id')
//   .get(collectionsController.getOne, views.showOne, views.show404)
//   .put(collectionsController.update, views.handleUpdate, views.show406)
//   .delete(collectionsController.destroy, views.handleDelete, views.show404);
//
// collectionsRouter.route('/')
//   .get(collectionsController.index, views.showcollections, views.show404)
//   .post(collectionsController.create, views.handleCreate, views.show406);
//
module.exports = collectionsRouter;
