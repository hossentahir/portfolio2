const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit a new contact message
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields (name, email, message)' });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    const savedContact = await contact.save();

    res.status(201).json({
      message: 'Thank you for reaching out! Your message has been sent successfully.',
      contact: {
        _id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to send contact message' });
  }
};

// @route   GET /api/contact
// @desc    Get all contact submissions sorted by newest first
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching contact messages' });
  }
};

// @route   PUT /api/contact/:id/read
// @desc    Toggle or update read status of a contact message
// @access  Private/Admin
const toggleReadStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    contact.read = req.body.read !== undefined ? Boolean(req.body.read) : !contact.read;
    const updatedContact = await contact.save();

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update read status' });
  }
};

// @route   DELETE /api/contact/:id
// @desc    Delete a contact submission
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete contact message' });
  }
};

module.exports = {
  createContact,
  getContacts,
  toggleReadStatus,
  deleteContact
};
