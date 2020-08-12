INSERT INTO users
(username, email, password_digest)
VALUES
('test001', 'test@test.com', 'abcdef'),
('test002', 'test@test.com', 'abcdefg'),
('test003', 'test@test.com', 'abcdefgh');

INSERT INTO characters
(name, url)
VALUES
('cloud', 'https://kuroganehammer.com/images/ultimate/character/cloud.png'),
('wolf', 'https://kuroganehammer.com/images/ultimate/character/wolf.png'),
('captain falcon', 'https://kuroganehammer.com/images/ultimate/character/captain_falcon.png');

INSERT INTO matches 
(user1, user2, winner, date, loser, user1_char, user2_char, url)
VALUES
('test001', 'test002', 'test001', 'today', 'test002', 'wolf', 'cloud', 'https://kuroganehammer.com/images/ultimate/character/wolf.png' ),
('test001', 'test002', 'test001', 'today', 'test002', 'wolf', 'cloud', 'https://kuroganehammer.com/images/ultimate/character/wolf.png'),
('test001', 'test002', 'test001', 'today', 'test002', 'wolf', 'cloud', 'https://kuroganehammer.com/images/ultimate/character/wolf.png');
