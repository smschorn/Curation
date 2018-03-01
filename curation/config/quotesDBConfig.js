/**
 * @module quotesDBConfig
 * @desc this file contains all the connection strings
 * to connect to the database server
 */

// Our database is either at some URL,
// or configured at some host:port

// TODO: [1] CREATE the DB though the CLI!
module.exports = process.env.DATABASE_URL || {
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'quotes_db',
  /* user:     process.env.DB_USER, */
};
