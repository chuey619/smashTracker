const db = require("../db/config");

class User {
  constructor(user) {
    (this.id = user.id || null),
      (this.username = user.username),
      (this.email = user.email),
      (this.password_digest = user.password_digest);
  }
  static getByUsername(username) {
    return db
      .oneOrNone("SELECT * FROM users WHERE username = $1", username)
      .then((user) => {
        if (user) return new this(user);
        else return null;
      });
  }
  static getIdByName(name) {
    return db
      .oneOrNone("SELECT * FROM users WHERE username = $1", name)
      .then((user) => {
        return new this(user);
      });
  }
  save() {
    return db
      .one(
        `
          INSERT INTO users
          (username, email, password_digest)
          VALUES ($/username/,$/email/, $/password_digest/)
          RETURNING *`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }
  // getAllMatches() {
  //   return db
  //     .manyOrNone(
  //       `
  //   SELECT * FROM matches
  //   WHERE user1_id = $1
  //   or user2_id = $1
  //   `,
  //       this.id
  //     )
  //     .then((matches) => {
  //       matches.map((match) => {});
  //     });
  // }
}

module.exports = User;
