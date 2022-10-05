const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ id, owner: _id });

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
