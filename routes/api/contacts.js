const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch("/:id/favorite", isValidId, ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
