const Teacher = require('../models/teacherModel');
const User = require('../models/userModel');
const { userIdFromToken } = require('../utils/userIdFromToken');


const createTeacherWithUser = async (req, res) => {
  try {
    const { teacherName, teacherEmail, teacherPhone, gender, subject } = req.body;
    const userId = req.userId; // Get the userId from the request object, set by the middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Check for unique email and phone in Teacher schema
    const isUnique = await Teacher.checkUniqueEmailAndPhone(teacherEmail, teacherPhone);
    if (!isUnique) {
      return res.status(400).json({ message: 'Email or Phone already exists' });
    }

    // Create the teacher with or without a user reference
    const teacher = new Teacher({
      teacherName,
      teacherEmail,
      teacherPhone,
      gender,
      subject,
      user: userId || null, // Link to the user if provided
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTeacherWithUser };

  

const getAllTeachers = async (req, res) => {
    try {
      // Fetch all teachers and populate the user field if it exists
      const teachers = await Teacher.find().populate('user', 'name email role');
      res.status(200).json({ message: 'Teachers fetched successfully', teachers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const updateTeacherProfile = async (req, res) => {
    try {
      const { teacherName, teacherEmail, teacherPhone, gender, subject } = req.body;
      const teacherId = req.userId; // Get the userId from the request object, set by the middleware
  
      // Find the teacher by their userId
      const teacher = await Teacher.findOne({ user: teacherId });
      if (!teacher) {
        return res.status(400).json({ message: 'Teacher not found' });
      }
  
      // Check for uniqueness of the email and phone if they are being updated
      if (teacherEmail && teacherEmail !== teacher.teacherEmail) {
        const isEmailUnique = await Teacher.checkUniqueEmailAndPhone(teacherEmail, null);
        if (!isEmailUnique) {
          return res.status(400).json({ message: 'Email is already taken' });
        }
      }
  
      if (teacherPhone && teacherPhone !== teacher.teacherPhone) {
        const isPhoneUnique = await Teacher.checkUniqueEmailAndPhone(null, teacherPhone);
        if (!isPhoneUnique) {
          return res.status(400).json({ message: 'Phone number is already taken' });
        }
      }
  
      // Update teacher fields if provided
      if (teacherName) teacher.teacherName = teacherName;
      if (teacherEmail) teacher.teacherEmail = teacherEmail;
      if (teacherPhone) teacher.teacherPhone = teacherPhone;
      if (gender) teacher.gender = gender;
      if (subject) teacher.subject = subject;
  
      // Save the updated teacher data
      await teacher.save();
  
      res.status(200).json({ message: 'Teacher profile updated successfully', teacher });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createTeacherWithUser,
    getAllTeachers,
    updateTeacherProfile ,
  };