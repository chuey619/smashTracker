const db = require("../db/config");

class Match {
  constructor(match) {
    this.id = match.id || null;
    this.user1 = match.user1;
    this.user2 = match.user2 || null;
    this.date = match.date || null;
    this.user1_char = match.user1_char;
    this.user2_char = match.user2_char || null;
    this.winner = match.winner;
    this.loser = match.loser;
    this.url = match.url;
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
  save() {
    return db
      .one(
        `
        INSERT INTO matches (user1, user2, date, winner, loser, user1_char, user2_char, url) 
        VALUES ($/user1/, $/user2/, $/date/, $/winner/, $/loser/, $/user1_char/, $/user2_char/, $/url/)
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
  returnWinnerName() {
    return this.name;
  }
}

module.exports = Match;
