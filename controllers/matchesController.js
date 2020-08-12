const Match = require("../models/Match");
const User = require("../models/User");
const matchesController = {};
const moment = require("moment");
const Character = require("../models/Character");
const matchHelpers = require("../services/match-helpers");
matchesController.index = (req, res, next) => {
  console.log(req.user.id);
  Match.getAllForUser(1)
    .then((matches) => {
      res.render("matches/index", {
        message: "ok",
        data: { matches },
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
  opponentId = (await opponent.id) || null;
  let user1_char = await Character.getByName(req.body.user1_char);
  user1_charId = (await user1_char.id) || null;
  let user2_char = await Character.getByName(req.body.user2_char);
  user2_charId = (await user2_char.id) || null;
  console.log({
    user1_char,
    user1_charId,
    opponent,
    opponentId,
    user2_char,
    user2_charId,
  });
  await new Match({
    date: moment().format("L"),
    user1_id: req.user.id,
    user2_id: opponentId,
    winner: res.locals.winner,
    loser: res.locals.loser,
    user1_char: user1_charId,
    user2_char: user2_charId,
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
    .catch(next);
};
matchesController.delete = (req, res) => {
  Match.getById(req.params.id)
    .then((animal) => {
      return animal.delete;
    })
    .then(() => {
      req.flash("success", "Successfully deleted the match");
      res.redirect("/matches");
    })
    .catch(next);
};
module.exports = matchesController;
