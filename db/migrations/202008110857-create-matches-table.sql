CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user1_id INT,
    user2_id INT,
    winner INT,
    date VARCHAR,
    loser INT,
    user1_char INT,
    user2_char INT,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    FOREIGN KEY (winner) REFERENCES users(id),
    FOREIGN KEY (loser) REFERENCES users(id),
    FOREIGN KEY (user1_char) REFERENCES characters(id),
    FOREIGN KEY (user2_char) REFERENCES characters(id)
);