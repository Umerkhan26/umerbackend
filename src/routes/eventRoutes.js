const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId
const router = express.Router();

// POST: Create a new event
router.post('/create', authMiddleware, createEvent);

// GET: Get all events
router.get('/getEvents', getAllEvents);
router.put('/update/:eventId', authMiddleware, updateEvent); // Update specific event by ID
router.delete('/delete/:eventId', authMiddleware, deleteEvent); // Delete specific event by ID
module.exports = router;
