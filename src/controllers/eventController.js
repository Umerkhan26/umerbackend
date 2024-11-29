const Event = require('../models/eventModel');
const User = require('../models/userModel'); // Import User for validation if necessary

const createEvent = async (req, res) => {
  try {
    const { eventId, eventTitle, date, description, location } = req.body;
    const userId = req.userId; // Assume userId is attached to the request by middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Check for unique eventId
    const isUnique = await Event.checkUniqueEventId(eventId);
    if (!isUnique) {
      return res.status(400).json({ message: 'Event ID already exists' });
    }

    // Create a new event
    const event = new Event({
      eventId,
      eventTitle,
      date,
      description,
      location,
      createdBy: userId || null, // Add user reference if available
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    // Fetch all events and populate the `createdBy` field
    const events = await Event.find().populate('createdBy', 'name email role');
    res.status(200).json({ message: 'Events fetched successfully', events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};
