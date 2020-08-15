const matchesController = require("../controllers/matchesController");
const matchesRouter = require("express").Router();
const matchesHelpers = require("../services/match-helpers");
const matchHelpers = require("../services/match-helpers");
const authHelpers = require("../services/auth/authHelpers");
matchesRouter.get(
  "/:id([0-9]+)",
  authHelpers.loginRequired,
  matchesController.show
);
matchesRouter.get("/", authHelpers.loginRequired, matchesController.index);
matchesRouter.post(
  "/",
  authHelpers.loginRequired,
  matchHelpers.decideWinner,
  matchesController.create
);
matchesRouter.get("/new", authHelpers.loginRequired, (req, res) => {
  res.render("matches/new");
});
matchesRouter.get("/:id/edit", authHelpers.loginRequired, (req, res) => {
  res.render("matches/edit", { match: { id: req.params.id } });
});
matchesRouter.put("/:id", authHelpers.loginRequired, matchesController.update);
matchesRouter.delete(
  "/:id",
  authHelpers.loginRequired,
  matchesController.delete
);

module.exports = matchesRouter;
