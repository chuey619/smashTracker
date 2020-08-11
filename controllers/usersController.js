const User = require("../models/User"),
  bcrypt = require("bcryptjs");

const Match = require("../models/Match");
const usersController = {};
usersController.index = (req, res, next) => {
  Match.getAllForUser(req.user.id).then((matches) => {
    res.render("users/index", { matches: matches });
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
        res.redirect(`/users/${user.id}`);
      });
    })
    .catch(next);
};

module.exports = usersController;
