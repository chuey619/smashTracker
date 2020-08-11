const Match = require("../models/Match");
const User = require("../models/User");
const matchesController = {};
const moment = require("moment");

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
matchesController.create = (req, res, next) => {
  new Match({
    date: moment().startOf("day").fromNow(),
    user1_id: res.locals.user.id,
    user2_id: User.getIdByName(req.body.opponent) || null,
    winner: req.body.winner,
    loser: req.body.loser,
    user1_char: req.body.user1_char,
    user2_char: req.body.user1_char,
  })
    .save()
    .then(() => {
      res.redirect("/matches");
    })
    .catch(next);
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
