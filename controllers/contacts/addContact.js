const contactsOperations = require("../../models/contacts");
const { contactSchema } = require("../../schemas");

const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const error = new Error("missing required name field");
    error.status = 400;
    throw error;
  }
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
