const matchesController = require("../controllers/matchesController");
const matchesRouter = require("express").Router();

matchesRouter.get("/:id([0-9]+)", matchesController.show);
matchesRouter.get("/user/:userId", matchesController.index);
matchesRouter.post("/", matchesController.create);

matchesRouter.put("/:id", matchesController.update);
matchesRouter.delete("/:id", matchesController.delete);
module.exports = matchesRouter;
