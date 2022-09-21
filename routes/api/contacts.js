const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.put("/:id", ctrlWrapper(ctrl.updateContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
