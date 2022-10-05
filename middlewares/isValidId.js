const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    const error = RequestError(400, `${id} is not a validate`);
    next(error);
  }
  next();
};

module.exports = isValidId;
