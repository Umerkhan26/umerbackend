const Contact = require('../models/contactModel');

// Create a new Contact message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new contact message
    const contact = new Contact({ name, email, subject, message });

    await contact.save();
    res.status(201).json({ message: 'Your message has been sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Contact messages (Optional, for admin use)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ message: 'Contacts fetched successfully', contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
