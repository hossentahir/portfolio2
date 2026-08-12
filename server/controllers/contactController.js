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
// @desc    Get all contact submissions
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching contact messages' });
  }
};

module.exports = {
  createContact,
  getContacts
};
