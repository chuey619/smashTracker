CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user1 VARCHAR,
    user2 VARCHAR,
    winner VARCHAR,
    date VARCHAR,
    loser VARCHAR,
    user1_char VARCHAR,
    user2_char VARCHAR,
    url VARCHAR,
    FOREIGN KEY (user1) REFERENCES users(username),
    FOREIGN KEY (user2) REFERENCES users(username),
    FOREIGN KEY (winner) REFERENCES users(username),
    FOREIGN KEY (loser) REFERENCES users(username),
    FOREIGN KEY (user1_char) REFERENCES characters(name),
    FOREIGN KEY (user2_char) REFERENCES characters(name)
);