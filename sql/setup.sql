-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS waters;
DROP TABLE IF EXISTS questions;

  CREATE TABLE waters (
    id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    img TEXT NOT NULL,
    answers TEXT NOT NULL,
    questions_id BIGINT NOT NULL
  );

  INSERT INTO waters (brand, img, answers)
  VALUES('Aquafina',
    'http://placekitten.com/200/300'),
    ('A', 'B', 'C', 'C', 'D', 'A');

  CREATE TABLE questions (
    questions_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question TEXT NOT NULL,
    choices TEXT NOT NULL,
  );

  INSERT INTO questions (question, choices)
  VALUES('What is your dream vacation?'),
    ('A. the mountains', 'B. the beach', 'C. the desert', 'D.the forrest');