const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const { auth, upload, validateBody } = require("../../middlewares");
const { joiSignupSchema } = require("../../models/user");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBody(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validateBody(joiSignupSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, ctrlWrapper(ctrl.getSubscription));

router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
