const { User } = require("../../models");

const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(400, "Email not found");
  }

  if (!user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;
