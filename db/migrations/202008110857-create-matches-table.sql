CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user1 VARCHAR,
    user2 VARCHAR,
    winner VARCHAR,
    date VARCHAR,
    loser VARCHAR,
    user1char VARCHAR,
    user2char VARCHAR,
    url1 VARCHAR,
    url2 VARCHAR,
    FOREIGN KEY (user1) REFERENCES users(username),
    FOREIGN KEY (user2) REFERENCES users(username),
    FOREIGN KEY (winner) REFERENCES users(username),
    FOREIGN KEY (loser) REFERENCES users(username),
    FOREIGN KEY (user1char) REFERENCES characters(name),
    FOREIGN KEY (user2char) REFERENCES characters(name)
);