const { Contact } = require("../models/contact");

class ContactService {
  async listContacts() {
    return await Contact.find();
  }

  async getContactById(contactId) {
    return await Contact.findById(contactId);
  }

  async removeContact(contactId) {
    return await Contact.findByIdAndRemove(contactId);
  }

  async addContact(body) {
    return await Contact.create(body);
  }

  async updateContact(contactId, body) {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  }

  async updateStatusContact(contactId, body) {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  }
}

const contactService = new ContactService();
module.exports = contactService;
