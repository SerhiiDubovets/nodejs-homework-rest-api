const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  if (!result) {
    throw RequestError(404, "Not found");
  }

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    ResponseBody: {
      user: {
        email: `${email}`,
        subscription: "starter",
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
