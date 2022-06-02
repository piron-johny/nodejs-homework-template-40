const contactService = require("../services/contact.service");

class ContactController {
  contactService;
  constructor(contactService) {
    this.contactService = contactService;
  }

  async getAllContacts(req, res) {
    const contacts = await contactService.listContacts();

    res.status(200).send(contacts);
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);

    if (!contact) res.status(404).send({ message: "Not found" });

    res.status(200).send(contact);
  }

  async createContact(req, res) {
    const contact = req.body;
    const newContact = await this.contactService.addContact(contact);

    res.status(201).send(newContact);
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const existContact = await this.contactService.getContactById(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    await this.contactService.removeContact(existContact.id);

    res.status(200).send({ message: "contact deleted" });
  }

  async updateContact(req, res) {
    const { contactId } = req.params;
    const contact = req.body;
    const existContact = await this.contactService.getContactById(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    const updatedContact = await this.contactService.updateContact(
      contactId,
      contact
    );

    res.status(200).send(updatedContact);
  }

  async updateStatusContact(req, res) {
    const { contactId } = req.params;
    const body = req.body;

    const updatetdContact = await this.contactService.updateStatusContact(contactId, body)

    res.status(200).send(updatetdContact);
  }
}

const contactController = new ContactController(contactService);
module.exports = contactController;
