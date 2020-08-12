const db = require("../db/config");

class Match {
  constructor(match) {
    this.id = match.id || null;
    this.user1_id = match.user1_id;
    this.user2_id = match.user2_id || null;
    this.date = match.date || null;
    this.user1_char = match.user1_char;
    this.user2_char = match.user2_char || null;
    this.winner = match.winner;
    this.loser = match.loser;
  }
  static getAllForUser(userId) {
    return db
      .manyOrNone(
        `
      SELECT * FROM matches 
      WHERE user1_id = $1
      OR user2_id = $1
      `,
        userId
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
  save() {
    return db
      .one(
        `
        INSERT INTO matches (user1_id, user2_id, date, winner, loser, user1_char, user2_char) 
        VALUES ($/user1_id/, $/user2_id/, $/date/, $/winner/, $/loser/, $/user1_char/, $/user2_char/)
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
