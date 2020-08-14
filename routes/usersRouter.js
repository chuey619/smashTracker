const usersController = require("../controllers/usersController");

const usersRouter = require("express").Router();
const authHelpers = require("../services/auth/authHelpers");

usersRouter.get("/", authHelpers.loginRequired, usersController.index);
usersRouter.get("/:id([0-9]+)", usersController.index);
usersRouter.post("/", usersController.create);
usersRouter.get("/new", (req, res) => {
  res.render("auth/register");
});
module.exports = usersRouter;
