const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const { catchHandler } = require("../../middleware/catchHandler");
const { checkRequest, validate } = require("../../middleware/validates");
const { shemaJoiCreate, shemaJoiUpdate, shemaJoiFavorite } = require("../../models/contact");

const router = express.Router();

router.get(
  "/",
  catchHandler(contactController.getAllContacts.bind(contactController))
);

router.get(
  "/:contactId",
  catchHandler(contactController.getContactById.bind(contactController))
);

router.post(
  "/",
  [checkRequest(), validate(shemaJoiCreate)],
  catchHandler(contactController.createContact.bind(contactController))
);

router.delete(
  "/:contactId",
  catchHandler(contactController.deleteContact.bind(contactController))
);

router.put(
  "/:contactId",
  [checkRequest(), validate(shemaJoiUpdate)],
  catchHandler(contactController.updateContact.bind(contactController))
);

router.patch(
  "/:contactId/favorite",
  [checkRequest(), validate(shemaJoiFavorite)],
  catchHandler(contactController.updateContact.bind(contactController))
);

module.exports = router;
