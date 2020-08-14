const User = require("../models/User"),
  bcrypt = require("bcryptjs");

const Match = require("../models/Match");
const usersController = {};
usersController.index = async (req, res, next) => {
  const username = req.user.username;
  let matches = await Match.getAllForUser(username);
  let userMatches = await matches;
  let losses = await Match.getTotalLossesForUser(username);
  let userLosses = await losses[0].count;
  let wins = await Match.getTotalWinsForUser(username);
  let userWins = await wins[0].count;
  res.render("users/index2", {
    matches: userMatches,
    user: {
      wins: userWins,
      losses: userLosses,
      username: username,
    },
  });
};
usersController.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  new User({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  })
    .save()
    .then((user) => {
      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect(`/users`);
      });
    })
    .catch(next);
};

module.exports = usersController;
