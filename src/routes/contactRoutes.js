const express = require('express');
const { createContact, getAllContacts } = require('../controllers/contactController');

const router = express.Router();

// Routes
router.post('/create', createContact);
// url look like http://localhost:3001/api/contact/create


// Post a new message
router.get('/getAllContact', getAllContacts);    // Get all messages (Optional for admin)
// url look like  http://localhost:3001/api/contact/getAllContact
module.exports = router;
