const passport = require("./passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/User");
const authHelpers = require("./authHelpers");

const options = {};

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.getByUsername(username)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);

module.exports = passport;
