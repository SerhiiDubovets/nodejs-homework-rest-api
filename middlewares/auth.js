const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { User } = require("../models/user");

dotenv.config();
const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    // eslint-disable-next-line no-constant-condition
    if ((error.message = "Invalid signature")) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
