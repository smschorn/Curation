/**
 * @module quoteDB
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
   * @desc search through all the quotes
   * @returns {Promise}
   * @hint this
   */
  findAll() {
    return db.many(`
      SELECT *
        FROM quotes
      ORDER BY id
    `);
  },
  /**
   * @func findById
   * @param id {number} the ID of the quote to search for
   * @desc search through the quotes and find by an ID
   * @returns {Promise}
   */
  findById(id) {
    return db.one(`
      SELECT *
        FROM quotes
        WHERE id = $1
    `, id);
  },
  /**
   * @func save
   * @param quote {object} quote record to be saved in the db
   * @desc will create a new record of the new quote in the database
   * @returns {Promise}
   */

  /*
   TODO: [11]
   Last step: you need to change genre_type in your save quoteDB model to genre_id
   because that's what we refactored it to be!
   */
  save(quote) {
    return db.one(`
      INSERT INTO quotes (author, content, genre_type)
      VALUES ($/author/, $/content/, $/genre_type/)
      RETURNING *
      `, quote);
  },
  /**
   * @func update
   * @param quote {object} quote record to be updated
   * @desc will update the record in the databse with the new data
   * @returns {Promise}
   */
  /*
   TODO: [14] just like with the `save` functionality,
   update the quotesDB model `update` method to accommodate for the new datatype for genre.
   */
  update(quote) {
    return db.one(`
      UPDATE quotes
      SET
      content = $/content/,
      author = $/author/,
      genre_type = $/genre_type/
      WHERE id = $/id/
      RETURNING *
      `, quote);
  },
  /**
   * Removes one quote from DB
   * @param {number} id - the id of a quote
   * @returns {Promise}
   */
  destroy(id) {
    return db.none(`
      DELETE
        FROM quotes
       WHERE id = $1
    `, id);
  },
};
