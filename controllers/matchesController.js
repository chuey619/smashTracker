const Match = require("../models/Match");
const User = require("../models/User");
const matchesController = {};
const moment = require("moment");
const Character = require("../models/Character");
const matchHelpers = require("../services/match-helpers");
matchesController.index = (req, res, next) => {
  const username = req.user.username;
  Match.getAllForUser(username)
    .then((matches) => {
      res.render("matches/index", {
        matches,
        username,
      });
    })
    .catch(next);
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
  console.log(req.body);
  let opponent = (await User.getByUsername(req.body.opponent)) || null;
  console.log(`opponent: ${await opponent}`);
  let opponentName;
  if (opponent) {
    opponentName = await opponent.username;
  } else {
    opponentName = null;
  }
  let user1_char = await Character.getByName(req.body.user1_char);
  if (user1_char) {
    user1_charName = await user1_char.name;
    userUrl = await user1_char.url;
  } else {
    user1_char = null;
  }
  let user2_char = await Character.getByName(req.body.user2_char);
  if (user2_char) {
    user2_char = await user2_char.name;
    user2Url = await user2_char.url;
  } else {
    user2_char = null;
  }
  await new Match({
    date: moment().format("L"),
    user1: req.user.username,
    user2: opponentName,
    winner: res.locals.winner,
    loser: res.locals.loser,
    user1_char: user1_charName,
    user2_char: user2_char,
    url1: userUrl,
    url2: user2Url,
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
