const Match = require("../models/Match");
const Character = require("../models/Character");
const User = require("../models/User");

const matchHelpers = {};
matchHelpers.decideWinner = async (req, res, next) => {
  if (req.body.result == "Me") {
    res.locals.winner = req.user.id;
    let loser = await User.getByUsername(req.body.opponent);
    console.log(loser);
    if (loser != null) {
      res.locals.loser = await loser.id;
    } else {
      res.locals.loser = null;
    }
    next();
  } else {
    res.locals.loser = req.user.id;
    let winner = await User.getByUsername(req.body.opponent);
    console.log(winner);
    if (winner != null) {
      res.locals.winner = await winner.id;
    } else {
      res.locals.winner = null;
    }
    next();
  }
};

module.exports = matchHelpers;
