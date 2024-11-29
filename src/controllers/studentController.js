const Student = require('../models/studentModel');
const User = require('../models/userModel');

const createStudentWithUser = async (req, res) => {
  try {
    const { studentName, registrationNumber, class: studentClass, section, email, gender } = req.body;
    const userId = req.userId; // Get the userId from the request object, set by the middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Check for unique email and registration number in Student schema
    const isUnique = await Student.checkUniqueEmailAndRegNumber(email, registrationNumber);
    if (!isUnique) {
      return res.status(400).json({ message: 'Email or Registration Number already exists' });
    }

    // Create the student with or without a user reference
    const student = new Student({
      studentName,
      registrationNumber,
      class: studentClass,
      section,
      email,
      gender,
      user: userId || null, // Link to the user if provided
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Fetch all students and populate the user field if it exists
    const students = await Student.find().populate('user', 'name email role');
    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudentWithUser,
  getAllStudents,
};
