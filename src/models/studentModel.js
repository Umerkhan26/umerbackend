const mongoose = require('mongoose');

// Enum for gender choices
const genderEnum = ['male', 'female', 'other'];

// Student schema
const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: genderEnum,
      required: true,
    },
    // Reference to the User model (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Name of the User model
      required: false, // Optional field
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Method to check if the student email or registration number exists (for uniqueness)
studentSchema.statics.checkUniqueEmailAndRegNumber = async function (email, regNumber) {
  const studentWithEmail = await this.findOne({ email: email });
  const studentWithRegNumber = await this.findOne({ registrationNumber: regNumber });
  if (studentWithEmail || studentWithRegNumber) {
    return false; // Either email or registration number already exists
  }
  return true;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
