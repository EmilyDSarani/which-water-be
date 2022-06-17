-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT NOT NULL
);
INSERT INTO songs (title, artist, album)
VALUES (
    'Finish Line',
    'Elton John feat. Stevie Wonder',
    'The Lockdown Sessions(Christmas Edition)'
);