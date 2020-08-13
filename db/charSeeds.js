const Character = require("../models/Character");

const fetch = require("node-fetch");

const charList = [];
const getChars4 = async () => {
  let res = await fetch("https://api.kuroganehammer.com/api/characters");
  let chars = await res.json();
  chars.forEach((char) => {
    charList.push(
      new Character({ name: char.DisplayName, url: char.ThumbnailUrl })
    );
  });
};
const getCharsUlt = async () => {
  let res = await fetch(
    "https://api.kuroganehammer.com/api/characters?game=ultimate"
  );
  let chars = await res.json();
  chars.forEach((char) => {
    charList.push(
      new Character({ name: char.DisplayName, url: char.ThumbnailUrl })
    );
  });
};

const main = async () => {
  await getCharsUlt();
  await getChars4();

  await charList.map((char) => {
    return new Character(char);
  });
  charList.forEach((char) => {
    char.save();
  });
};

main();
setTimeout(() => {
  console.log(charList);
}, 10000);
