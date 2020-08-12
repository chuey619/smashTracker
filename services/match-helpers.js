const Match = require("../models/Match");
const Character = require("../models/Character");
const User = require("../models/User");

const matchHelpers = {};
matchHelpers.decideWinner = (req, res, next) => {
  if (req.body.result == "Me") {
    res.locals.winner = req.user.id;
    User.getByUsername(req.body.opponent)
      .then((user) => {
        res.locals.loser = user.id || null;
      })
      .then(next);
  } else {
    res.locals.loser = req.user.id;
    User.getByUsername(req.body.opponent)
      .then((user) => {
        res.locals.winner = user.id || null;
      })
      .then(next);
  }
};

module.exports = matchHelpers;
