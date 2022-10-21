const dotenv = require("dotenv");

dotenv.config();
const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "New user registered",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
