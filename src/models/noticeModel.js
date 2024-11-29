const mongoose = require('mongoose');

// Notice Schema
const noticeSchema = new mongoose.Schema(
  {
    noticeId: {
      type: String,
      required: true,
      unique: true, // Each notice ID must be unique
    },
    title: {
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

// Static method to check if a noticeId already exists
noticeSchema.statics.checkUniqueNoticeId = async function (noticeId) {
  const existingNotice = await this.findOne({ noticeId });
  return !existingNotice; // Return true if noticeId is unique, false otherwise
};

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
