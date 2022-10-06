const { Contact, schemas } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    const error = new Error("missing fields");
    error.status = 400;
    throw error;
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
