-- TODO: [2] connect to the proper database
-- TODO: [3] if exist, drop table genres
-- TODO: [4] create table genres with appropriate columns (check out the seed file)
-- TODO: [5] modify the quotes table to comply with the seed as well
-- TODO: [6] run both, the schema file and the seed

\c curation_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON users (name);

DROP TABLE IF EXISTS collections;

CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  user_id INTEGER,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON collections (name);
CREATE INDEX ON collections (user_id);

DROP TABLE IF EXISTS artworks;

CREATE TABLE artworks (
  id SERIAL PRIMARY KEY,
  collection_id INTEGER,
  title VARCHAR(255),
  object_id VARCHAR(255),
  image_url VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON artworks (title);
CREATE INDEX ON artworks (collection_id);
CREATE INDEX ON artworks (object_id);
