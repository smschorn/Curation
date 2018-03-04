/**
 * @module controllers/collectionsController
 * @author Scott
 */

const collectionDB = require('../models/collections');
/**
 * Create a collectionController
 */
module.exports = {
  /**
   * Middleware function:
   * Get all the collections and set them in res.locals
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  index(req, res, next) {
    collectionDB.findAll()
      .then((collections) => {
        res.locals.collections = collections;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * GetOne Middleware:
   * Get a collection from the DB and set it in res.locals
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  getOne(req, res, next) {
    collectionDB.findById(req.params.id)
      .then((collection) => {
        console.log(collection);
        res.locals.collection = collection;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * Create Middleware:
   * Get collection data from the front-end and set it in the DB
   * Sets the results of the insertion into res.locals.collection
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  create(req, res, next) {
    console.log(req.body, 'body');
    collectionDB.save(req.body)
      .then((collection) => {
        res.locals.collection = collection;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * Update Middleware:
   * Get collection data from the DB;
   * Merge the data from the front-end;
   * Set it in the DB;
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  update(req, res, next) {
    console.log(req.body, 'update controller');
    collectionDB.update(req.body)
      .then((collection) => {
        res.locals.collection = collection;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * @func destroy
   * @desc Destroy the collection at this id
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  destroy(req, res, next) {
    collectionDB.destroy(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },
};
