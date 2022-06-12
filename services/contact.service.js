const { Contact } = require("../models/contact");

class ContactService {
  async listContacts(id, skip = 0, limit = 20) {
    return await Contact.find({ owner: id }, '', {skip, limit});
  }

  async favoriteListContacts(id, favorite, skip = 0, limit = 20) {
    return await Contact.find({ owner: id, favorite }, '', { skip, limit });
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
