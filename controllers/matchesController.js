const Match = require("../models/match");
const User = require("../models/User");
const matchesController = {};
const moment = require("moment");
const Character = require("../models/Character");
const matchHelpers = require("../services/match-helpers");
matchesController.index = async (req, res, next) => {
  const username = req.user.username;
  let matches = await Match.getAllForUser(username);
  let userMatches = await matches;

  res.render("matches", {
    matches: userMatches,
    user: {
      username: username,
    },
  });
};
matchesController.show = (req, res, next) => {
  Match.getById(req.params.id)
    .then((match) => {
      res.render("matches/show", { match: match });
      next();
    })
    .catch(next);
};
matchesController.create = async (req, res, next) => {
  let opponent = (await User.getByUsername(req.body.opponent)) || null;
  let opponentName;
  let user1CharName;
  let user1CharUrl;
  let user2CharName;
  let user2CharUrl;
  if (opponent) {
    opponentName = await opponent.username;
  } else {
    opponentName = null;
  }
  let user1Char = await Character.getByName(req.body.user1_char);
  if (user1Char) {
    user1CharName = await user1Char.name;
    user1CharUrl = await user1Char.url;
  } else {
    user1CharName = null;
  }
  let user2Char = await Character.getByName(req.body.user2_char);
  if (user2Char) {
    user2CharName = await user2Char.name;
    user2CharUrl = await user2Char.url;
  } else {
    user2CharName = null;
  }
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
matchesController.update = (req, res) => {
  Match.getById(req.params.id)
    .then((match) => {
      return match.update(req.body);
    })
    .then((updatedMatch) => {
      req.flash("success", "Successfully updated the match");
      res.redirect(`/matches/${updatedMatch.id}`);
    })
    .catch(() => {
      res.redirect("back");
    });
};
matchesController.delete = (req, res, next) => {
  Match.getById(req.params.id)
    .then((match) => {
      return match.delete();
    })
    .then(() => {
      req.flash("success", "Successfully deleted the match");
      res.redirect("/users");
    })
    .catch(next);
};

module.exports = matchesController;
