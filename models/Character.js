const db = require("../db/config");
class Character {
  constructor(character) {
    this.id = character.id;
    this.name = character.name;
    this.url = character.url;
  }
  static getById(id) {
    return db.oneOrNone(`SELECT * FROM characters WHERE id = $1`, id);
  }
  static getByName(name) {
    return db.oneOrNone(`SELECT * FROM characters WHERE name = $1`, name);
  }
}

module.exports = Character;
