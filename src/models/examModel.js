const mongoose = require('mongoose');

// Exam Schema
const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    examTerm: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // Reference to the User model
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Name of the User model
      required: false, // Optional field, link to user who created the exam
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Static method to check if examName and class already exists
examSchema.statics.checkUniqueExam = async function (examName, className) {
  const existingExam = await this.findOne({ examName, class: className });
  return !existingExam; // Return true if examName and class combination is unique, false otherwise
};

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
