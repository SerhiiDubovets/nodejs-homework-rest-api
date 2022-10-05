const { Contact, schemas } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    const error = new Error("missing required name field");
    error.status = 400;
    throw error;
  }

  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
