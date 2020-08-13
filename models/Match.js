const db = require("../db/config");

class Match {
  constructor(match) {
    this.id = match.id || null;
    this.user1 = match.user1;
    this.user2 = match.user2 || null;
    this.date = match.date;
    this.user1Char = match.user1char || match.user1Char;
    this.user2Char = match.user2char || match.user2Char || null;
    this.winner = match.winner;
    this.loser = match.loser;
    this.url1 = match.url1;
    this.url2 = match.url2;
  }
  static getAllForUser(username) {
    return db
      .manyOrNone(
        `
      SELECT * FROM matches 
      WHERE user1 = $1
      OR user2 = $1
      ORDER BY id DESC
      `,
        username
      )
      .then((matches) => {
        return matches.map((match) => {
          return new this(match);
        });
      });
  }
  static getById(id) {
    return db
      .oneOrNone(`SELECT * FROM matches WHERE id = $1`, id)
      .then((match) => {
        if (match) return new this(match);
        throw new Error("Match not found");
      });
  }
  static getTotalWinsForUser(name) {
    return db
      .manyOrNone(`SELECT COUNT(*) FROM matches WHERE winner = $1`, name)
      .then((count) => {
        return count;
      });
  }
  static getTotalLossesForUser(name) {
    return db
      .manyOrNone(`SELECT COUNT(*) FROM matches WHERE loser = $1`, name)
      .then((count) => {
        return count;
      });
  }
  static getAllForUserAgainstUser(user1, user2) {
    return db
      .manyOrNone(
        `
    SELECT * FROM matches
    WHERE user1 = $1 OR user1 = $2
    AND user2 = $1 OR user2 = $2 
    `,
        [user1, user2]
      )
      .then((matches) => {
        return matches.map((match) => {
          return new this(match);
        });
      });
  }
  static getAllForUserByChar(user, char) {
    return db
      .manyOrNone(
        `
    SELECT * FROM matches
    WHERE user1 = $1 AND user1Char = $2 
    OR user2 = $1 AND user2Char = $2
    `,
        [user, char]
      )
      .then((matches) => {
        return matches.map((match) => {
          return new this(match);
        });
      });
  }
  static getAllWins(user) {
    return db
      .manyOrNone(
        `
    SELECT * FROM matches 
    WHERE winner = $1
    `,
        user
      )
      .then((matches) => {
        return matches.map((match) => {
          return new this(match);
        });
      });
  }
  static getAllLosses(user) {
    return db
      .manyOrNone(
        `
  SELECT * FROM matches 
  WHERE loser = $1
  `,
        user
      )
      .then((matches) => {
        return matches.map((match) => {
          return new this(match);
        });
      });
  }

  save() {
    return db
      .one(
        `
        INSERT INTO matches (user1, user2, date, winner, loser, user1Char, user2Char, url1, url2) 
        VALUES ($/user1/, $/user2/, $/date/, $/winner/, $/loser/, $/user1Char/, $/user2Char/, $/url1/, $/url2/)
            RETURNING *
        `,
        this
      )
      .then((match) => {
        return Object.assign(this, match);
      });
  }
  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
        UPDATE matches
        SET
        user1_id = $/user1_id,
        user2_id = $/user2_id/,
        user1_char, $/user1_char/,
        user2_char, $/user2_char/,
        date = $/date/
        `
      )
      .then((match) => {
        return Object.assign(this, match);
      });
  }
  delete() {
    return db.oneOrNone(`DELETE FROM matches WHERE id = $1`, this.id);
  }
}

module.exports = Match;
