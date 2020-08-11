CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR NOT NULL,
    password_digest VARCHAR NOT NULL
);