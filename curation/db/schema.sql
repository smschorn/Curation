-- TODO: [2] connect to the proper database
-- TODO: [3] if exist, drop table genres
-- TODO: [4] create table genres with appropriate columns (check out the seed file)
-- TODO: [5] modify the quotes table to comply with the seed as well
-- TODO: [6] run both, the schema file and the seed

\c quotes_db;
DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author VARCHAR(255),
  genre_type VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON quotes (author);
