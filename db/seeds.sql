INSERT INTO users
(username, email, password_digest)
VALUES
('test001', 'test@test.com', 'abcdef'),
('test002', 'test@test.com', 'abcdefg'),
('test003', 'test@test.com', 'abcdefgh');

INSERT INTO chars
(name, url)
VALUES
('cloud', 'https://kuroganehammer.com/images/ultimate/character/cloud.png'),
('wolf', 'https://kuroganehammer.com/images/ultimate/character/wolf.png'),
('captain falcon', 'https://kuroganehammer.com/images/ultimate/character/captain_falcon.png');

INSERT INTO matches 
(winner_id, loser_id, winner_char_id, loser_char_id, date)
VALUES
(1, 2, 1, 2, 'today'),
(2, 1, 2, 1, 'tomorrow'),
(3, 1, 2, 3, 'yesterday');




INSERT INTO users
(username, email, password_digest)
VALUES
('Unknown', 'test@test.com', 'abcdef');