CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR,
    password VARCHAR,
    is_instructor BOOLEAN DEFAULT false,
    assigned_to INT,
    FOREIGN KEY (assigned_to) REFERENCES "user"(id) ON DELETE SET NULL,
    current_tester BOOLEAN DEFAULT false
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    the_question TEXT,
    the_answer TEXT
);

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    user_id INT,
    question_id INT,
    response TEXT,
    grade INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);