const express = require("express");
const userController = require("../../controllers/users.controller");
const auth = require("../../middleware/auth");
const { catchHandler } = require("../../middleware/catchHandler");
const { validate } = require("../../middleware/validates");
const { shemaJoiUpdateSubscription } = require("../../models/user");

const router = express.Router();

router.get(
  "/current",
  [auth],
  catchHandler(userController.getUserByToken.bind(userController))
);
router.put(
  "/subscription",
  [auth, validate(shemaJoiUpdateSubscription)],
  catchHandler(userController.updateUserSubscription.bind(userController))
);
router.delete(
  "/:userId",
  [auth],
  catchHandler(userController.deleteUser.bind(userController))
);

module.exports = router;
