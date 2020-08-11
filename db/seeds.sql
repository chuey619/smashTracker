INSERT INTO users
(username, email, password_digest)
VALUES
('test001', 'test@test.com', 'abcdef'),
('test002', 'test@test.com', 'abcdefg'),
('test003', 'test@test.com', 'abcdefgh');

INSERT INTO characters
(name, url)
VALUES
('cloud', 'abc'),
('wolf', 'abc'),
('captain falcon', 'abc');

INSERT INTO matches 
(user1_id, user2_id, winner, date, loser, user1_char, user2_char)
VALUES
(1, 2, 1, 'today', 2, 1, 2),
(1, 2, 2, 'tomorrow', 1, 1, 2),
(1, 2, 1, 'yesterday', 2, 1, 2);