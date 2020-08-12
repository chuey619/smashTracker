const matchesController = require("../controllers/matchesController");
const matchesRouter = require("express").Router();
const matchesHelpers = require("../services/match-helpers");
const matchHelpers = require("../services/match-helpers");
matchesRouter.get("/:id([0-9]+)", matchesController.show);
matchesRouter.get("/user/:userId", matchesController.index);
matchesRouter.post("/", matchHelpers.decideWinner, matchesController.create);
matchesRouter.get("/new", (req, res) => {
  res.render("matches/new");
});
matchesRouter.put("/:id", matchesController.update);
matchesRouter.delete("/:id", matchesController.delete);
module.exports = matchesRouter;
