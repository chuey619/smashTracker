const Match = require("../models/Match");
const User = require("../models/User");
const matchesController = {};
const moment = require("moment");
const Character = require("../models/Character");
const matchHelpers = require("../services/match-helpers");
// gets all matches for a user and siplays them
// need to get information about all users and matches to fill in options for the search form
matchesController.index = async (req, res, next) => {
  const username = req.user.username;
  let matches = await Match.getAllForUser(username);
  let userMatches = await matches;
  let chars = await Character.getAll();
  let charNames = chars.map((char) => {
    return char.name;
  });
  let users = await User.getAll();
  let usernames = users.map((user) => {
    return user.username;
  });
  res.render("matches", {
    matches: userMatches,
    user: {
      username: username,
    },
    chars: charNames,
    opponents: usernames,
  });
};
//shows a single match
matchesController.show = (req, res, next) => {
  let username = req.username;
  Match.getById(req.params.id)
    .then((match) => {
      res.render("matches/show", { match: match, user: username });
    })
    .catch(next);
};
//creates a new match
matchesController.create = async (req, res, next) => {
  let opponent = (await User.getByUsername(req.body.opponent)) || null;
  let opponentName;
  let user1CharName;
  let user1CharUrl;
  let user2CharName;
  let user2CharUrl;
  //if opponent is a user on the site set them as opponent else opponent is null
  if (opponent) {
    opponentName = await opponent.username;
  } else {
    opponentName = null;
  }
  //gets info about the logged in user
  let user1Char = await Character.getByName(req.body.user1_char);
  if (user1Char) {
    user1CharName = await user1Char.name;
    user1CharUrl = await user1Char.url;
  } else {
    user1CharName = null;
  }
  //gets info about the opponent
  let user2Char = await Character.getByName(req.body.user2_char);
  if (user2Char) {
    user2CharName = await user2Char.name;
    user2CharUrl = await user2Char.url;
  } else {
    user2CharName = null;
  }
  //saves the new match
  await new Match({
    date: moment().format("L"),
    user1: req.user.username,
    user2: opponentName,
    winner: res.locals.winner,
    loser: res.locals.loser,
    user1Char: user1CharName,
    user2Char: user2CharName,
    url1: user1CharUrl,
    url2: user2CharUrl,
  }).save();
  await res.redirect("/users");
};
//deletes a match
matchesController.delete = (req, res, next) => {
  Match.getById(req.params.id)
    .then((match) => {
      return match.delete();
    })
    .then(() => {
      res.redirect("/users");
    })
    .catch(next);
};

module.exports = matchesController;
