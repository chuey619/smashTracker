CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    url VARCHAR
);