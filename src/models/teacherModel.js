const mongoose = require('mongoose');

// Enum for gender choices
const genderEnum = ['male', 'female', 'other'];

// Teacher schema
const teacherSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
      unique: true,
    },
    teacherPhone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: genderEnum,
      required: true,
    },
    subject: {
      type: String,
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

// Method to check if the teacher email or phone exists (for uniqueness)
teacherSchema.statics.checkUniqueEmailAndPhone = async function (email, phone) {
  const teacherWithEmail = await this.findOne({ teacherEmail: email });
  const teacherWithPhone = await this.findOne({ teacherPhone: phone });
  if (teacherWithEmail || teacherWithPhone) {
    return false; // Either email or phone already exists
  }
  return true;
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
