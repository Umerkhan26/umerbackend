const mongoose = require('mongoose');

// Enum for gender choices
const genderEnum = ['male', 'female', 'other'];

// Teacher schema
const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
      unique: true,
    },
    parentName: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: genderEnum,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },
    // Reference to the User model (optional)
 
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Method to check if the teacher email or phone exists (for uniqueness)


const Admission = mongoose.model('admission', admissionSchema);

module.exports = Admission;
