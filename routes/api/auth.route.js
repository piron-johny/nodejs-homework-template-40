const express = require("express");
const authController = require("../../controllers/auth.controller");
const { catchHandler } = require("../../middleware/catchHandler");
const { checkRequest, validate } = require("../../middleware/validates");
const { shemaJoiCreate } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  [checkRequest(), validate(shemaJoiCreate)],
  catchHandler(authController.signup.bind(authController))
);

router.post(
  "/signin",
  [checkRequest(), validate(shemaJoiCreate)],
  catchHandler(authController.signin.bind(authController))
);


module.exports = router;
