const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/contact");

const { auth, validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch("/:id/favorite", isValidId, ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", auth, isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
