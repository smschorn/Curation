const express = require('express');
const collectionsController = require('../controllers/collectionsController');
const views = require('../controllers/viewController');

const collectionsRouter = express.Router();

collectionsRouter.get('/:id/edit', collectionsController.getOne, views.editCollection, views.show404);

collectionsRouter.route('/:id')
  .get(collectionsController.getOne, views.showCollection, views.show404)
  .put(collectionsController.update, views.updateCollection, views.show406)
  .delete(collectionsController.destroy, views.deleteCollection, views.show404);

collectionsRouter.route('/')
  .get(collectionsController.getAll, views.showAllCollections, views.show404)
  .post(collectionsController.create, views.createCollection, views.show406);

module.exports = collectionsRouter;
