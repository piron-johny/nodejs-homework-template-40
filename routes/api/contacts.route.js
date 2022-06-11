const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const auth = require("../../middleware/auth");
const { catchHandler } = require("../../middleware/catchHandler");
const { checkRequest, validate } = require("../../middleware/validates");
const { shemaJoiCreate, shemaJoiUpdate, shemaJoiFavorite } = require("../../models/contact");

const router = express.Router();

router.get(
  "/",
  [auth],
  catchHandler(contactController.getAllContacts.bind(contactController))
);

router.get(
  "/:contactId",
  [auth],
  catchHandler(contactController.getContactById.bind(contactController))
);

router.post(
  "/",
  [auth, checkRequest(), validate(shemaJoiCreate)],
  catchHandler(contactController.createContact.bind(contactController))
);

router.delete(
  "/:contactId",
  [auth],
  catchHandler(contactController.deleteContact.bind(contactController))
);

router.put(
  "/:contactId",
  [auth, checkRequest(), validate(shemaJoiUpdate)],
  catchHandler(contactController.updateContact.bind(contactController))
);

router.patch(
  "/:contactId/favorite",
  [auth, checkRequest(), validate(shemaJoiFavorite)],
  catchHandler(contactController.updateContact.bind(contactController))
);

module.exports = router;
