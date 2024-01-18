INSERT INTO "user" (first_name, last_name, username, password, is_instructor) VALUES ('Garrett', 'Ross', 'garrettross', 'Whataburger', true);
INSERT INTO "user" (first_name, last_name, username, password, assigned_to) VALUES ('Michael', 'Heeter', 'cheater', 'hacker', 1);

INSERT INTO question (the_question, the_answer) VALUES ('What is the answer to life, the universe and everything?', '42');

INSERT INTO test (user_id, question_id, response, grade) VALUES (2, 1, 'potato?', 0);