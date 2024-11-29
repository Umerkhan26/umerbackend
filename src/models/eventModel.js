const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true, // Each event ID must be unique
    },
    eventTitle: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // Reference to the User model
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Name of the User model
      required: false, // Optional field
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Static method to check if eventId already exists
eventSchema.statics.checkUniqueEventId = async function (eventId) {
  const existingEvent = await this.findOne({ eventId });
  return !existingEvent; // Return true if eventId is unique, false otherwise
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
