/**
 * @module artworks
 * @desc this module is the interface for the database. It contains
 * CRUD methods in SQL to talk to the database.
 * Each function returns a promise
 */

const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

// execute pgp with our db config, so a connection is made.
const db = pgp(dbConfig);

// @see https://github.com/vitaly-t/pg-promise#query-result-mask

// export a artwork of functions
module.exports = {
  /**
   * @func findAll
   * @desc search through all the artworks
   * @returns {Promise}
   * @hint this
   */
  findAll() {
    return db.many(`
      SELECT *
        FROM artworks
      ORDER BY id
    `);
  },
  /**
   * @func findById
   * @param id {number} the ID of the artwork to search for
   * @desc search through the artworks and find by an ID
   * @returns {Promise}
   */
  findById(id) {
    return db.one(`
      SELECT *
        FROM artworks
        WHERE id = $1
    `, id);
  },
  /**
   * @func save
   * @param artwork {object} artwork record to be saved in the db
   * @desc will create a new record of the new artwork in the database
   * @returns {Promise}
   */

  /*
   TODO: [11]
   Last step: you need to change genre_type in your save artworkDB model to genre_id
   because that's what we refactored it to be!
   */
  save(artwork) {
    return db.one(`
      INSERT INTO artworks (collection_id, title, object_id, image_url)
      VALUES ($/collection_id/, $/title/, $/object_id/, $/image_url/)
      RETURNING *
      `, artwork);
  },
  /**
   * @func update
   * @param artwork {object} artwork record to be updated
   * @desc will update the record in the databse with the new data
   * @returns {Promise}
   */
  /*
   TODO: [14] just like with the `save` functionality,
   update the artworksDB model `update` method to accommodate for the new datatype for genre.
   */
  update(artwork) {
    return db.one(`
      UPDATE artworks
      SET
      collection_id = $/collection_id/,
      title= $/title/,
      object_id = $/object_id/,
      image_url = $/image_url/
      WHERE id = $/id/
      RETURNING *
      `, artwork);
  },
  /**
   * Removes one artwork from DB
   * @param {number} id - the id of a artwork
   * @returns {Promise}
   */
  destroy(id) {
    return db.none(`
      DELETE
        FROM artworks
       WHERE id = $1
    `, id);
  },
};
