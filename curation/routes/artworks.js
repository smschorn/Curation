const express = require('express');
const artworksController = require('../controllers/artworksController');
const views = require('../controllers/viewController');

const artworksRouter = express.Router();

artworksRouter.route('/:id')
  .delete(artworksController.destroy, views.show200, views.show404);

artworksRouter.route('/')
  .post(artworksController.create, views.show200, views.show406);

module.exports = artworksRouter;
