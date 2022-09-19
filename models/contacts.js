const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === id);
  return contactById || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts(id);
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  let updateContact = null;
  const contactById = contacts.map((contact) => {
    if (contact.id === id) {
      contact = { id: id, ...body };
      updateContact = contact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(contactById));
  return updateContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
