const express = require("express");
const userController = require("../../controllers/users.controller");
const auth = require("../../middleware/auth");
const { catchHandler } = require("../../middleware/catchHandler");
const upload = require("../../middleware/upload.js");
const { validate } = require("../../middleware/validates");
const { shemaJoiUpdateSubscription, shemaJoiVerifyEmail } = require("../../models/user");

const router = express.Router();

router.get(
  "/current",
  [auth],
  catchHandler(userController.getUserByToken.bind(userController))
);
router.get(
  "/verify/:verificationToken",
  catchHandler(userController.verifyEmail.bind(userController))
);
router.post(
  "/verify",
  [validate(shemaJoiVerifyEmail)],
  catchHandler(userController.sendVerifyEmail.bind(userController))
);
router.get(
  "/verify/:verificationToken",
  catchHandler(userController.verifyEmail.bind(userController))
);
router.put(
  "/subscription",
  [auth, validate(shemaJoiUpdateSubscription)],
  catchHandler(userController.updateUserSubscription.bind(userController))
);
router.patch(
  "/avatars",
  [auth, upload.single("avatar")],
  catchHandler(userController.updateUserAvatar.bind(userController))
);
router.delete(
  "/:userId",
  [auth],
  catchHandler(userController.deleteUser.bind(userController))
);

module.exports = router;
