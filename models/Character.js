const db = require("../db/config");
class Character {
  constructor(character) {
    this.id = character.id;
    this.name = character.name;
    this.url = character.url;
  }
  static getById(id) {
    return db
      .oneOrNone(`SELECT * FROM characters WHERE id = $1`, id)
      .then((char) => {
        return new this(char);
      });
  }
  static getByName(name) {
    return db
      .oneOrNone(`SELECT * FROM characters WHERE name = $1`, name)
      .then((char) => {
        return new this(char);
      })
      .catch(() => {
        return null;
      });
  }
  static getIdByName(name) {
    return db
      .oneOrNone(`SELECT * FROM characters WHERE name = $1`, name)
      .then((char) => {
        return new this(char);
      })
      .then((char) => {
        return char.id;
      });
  }
  save() {
    return db
      .one(
        `
      INSERT INTO characters (name, url) 
      VALUES ($/name/, $/url/)
          RETURNING *
      `,
        this
      )
      .then((char) => {
        return Object.assign(this, char);
      });
  }
}

module.exports = Character;
