const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const { catchHandler } = require("../../middleware/catchHandler");
const { checkContacRequest, validate } = require("../../middleware/validates");
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
  [checkContacRequest(), validate(shemaJoiCreate)],
  catchHandler(contactController.createContact.bind(contactController))
);

router.delete(
  "/:contactId",
  catchHandler(contactController.deleteContact.bind(contactController))
);

router.put(
  "/:contactId",
  [checkContacRequest(), validate(shemaJoiUpdate)],
  catchHandler(contactController.updateContact.bind(contactController))
);

router.patch(
  "/:contactId/favorite",
  [checkContacRequest(), validate(shemaJoiFavorite)],
  catchHandler(contactController.updateContact.bind(contactController))
);

module.exports = router;
