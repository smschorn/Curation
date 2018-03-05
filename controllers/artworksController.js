const artworkDB = require('../models/artworks');
/**
 * Create a artworkController
 */
module.exports = {

  /**
   * Create Middleware:
   * Get artwork data from the front-end and set it in the DB
   * Sets the results of the insertion into res.locals.artwork
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  create(req, res, next) {
    console.log(req.body, 'body');
    artworkDB.save(req.body)
      .then((artwork) => {
        res.locals.artwork = artwork;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * @func destroy
   * @desc Destroy the artwork at this id
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  destroy(req, res, next) {
    artworkDB.destroy(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },
};
