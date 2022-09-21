const contactsOperations = require("../../models/contacts");

const contactSchema = require("../../schemas");

const updateContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const error = new Error("missing fields");
    error.status = 400;
    throw error;
  }
  const { id } = req.params;
  const result = await contactsOperations.updateContact(id, req.body);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
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
