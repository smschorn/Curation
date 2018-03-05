/**
 * @module collections
 * @desc this module is the interface for the database. It contains
 * CRUD methods in SQL to talk to the database.
 * Each function returns a promise
 */

const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);

// @see https://github.com/vitaly-t/pg-promise#query-result-mask

// export a collection of functions
module.exports = {
  /**
   * @func findAll
   * @desc search through all the collections
   * @returns {Promise}
   * @hint this
   */
  findAll() {
    return db.many(`
      SELECT *
        FROM collections
      ORDER BY id
    `);
  },
  /**
   * @func findById
   * @param id {number} the ID of the collection to search for
   * @desc search through the collections and find by an ID
   * @returns {Promise}
   */
  findById(id) {
    return db.one(`
      SELECT *
        FROM collections
        WHERE id = $1
    `, id);
  },
  /**
   * @func save
   * @param collection {object} collection record to be saved in the db
   * @desc will create a new record of the new collection in the database
   * @returns {Promise}
   */

  /*
   TODO: [11]
   Last step: you need to change genre_type in your save collectionDB model to genre_id
   because that's what we refactored it to be!
   */
  save(collection) {
    return db.one(`
      INSERT INTO collections (name)
      VALUES ($/name/)
      RETURNING *
      `, collection);
  },
  /**
   * @func update
   * @param collection {object} collection record to be updated
   * @desc will update the record in the databse with the new data
   * @returns {Promise}
   */
  /*
   TODO: [14] just like with the `save` functionality,
   update the collectionsDB model `update` method to accommodate for the new datatype for genre.
   */
  update(collection) {
    return db.one(`
      UPDATE collections
      SET
      name = $/name/
      WHERE id = $/id/
      RETURNING *
      `, collection);
  },
  /**
   * Removes one collection from DB
   * @param {number} id - the id of a collection
   * @returns {Promise}
   */
  destroy(id) {
    return db.none(`
      DELETE
        FROM collections
       WHERE id = $1
    `, id);
  },
};
