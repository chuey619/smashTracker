const authRouter = require("express").Router();

const authHelpers = require("../services/auth/authHelpers");
const passport = require("../services/auth/local");

authRouter.get("/login", authHelpers.loginRedirect, (req, res) => {
  res.render("auth/login");
});
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `/users`,
    failureRedirect: "auth/login",
    failureFlash: true,
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  req.flash("sucess", "sucessfully loggged you out!");
  res.redirect("back");
});

module.exports = authRouter;
