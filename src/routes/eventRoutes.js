const express = require('express');
const { createEvent, getAllEvents } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId
const router = express.Router();

// POST: Create a new event
router.post('/create', authMiddleware, createEvent);

// GET: Get all events
router.get('/getEvents', getAllEvents);

module.exports = router;
