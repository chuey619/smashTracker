const Match = require("../models/Match");
const Character = require("../models/Character");
const User = require("../models/User");

const matchHelpers = {};
// gives info about who won match so he user only has to select me or opponent
matchHelpers.decideWinner = async (req, res, next) => {
  if (req.body.result == "Me") {
    res.locals.winner = req.user.username;
    let loser = req.body.opponent;

    if (loser != "") {
      res.locals.loser = loser;
    } else {
      res.locals.loser = null;
    }
    next();
  } else {
    res.locals.loser = req.user.username;
    let winner = req.body.opponent;
    if (winner != "") {
      res.locals.winner = winner;
    } else {
      res.locals.winner = null;
    }
    next();
  }
};

module.exports = matchHelpers;
