const Exam = require('../models/examModel');
const User = require('../models/userModel'); // Import User for validation if necessary

// Create a new Exam
const createExam = async (req, res) => {
  try {
    const { examName, class: className, examTerm, startDate, endDate } = req.body;
    const userId = req.userId; // Assume userId is attached to the request by middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Check if the exam already exists for the given name and class
    const isUnique = await Exam.checkUniqueExam(examName, className);
    if (!isUnique) {
      return res.status(400).json({ message: 'Exam for this class already exists' });
    }

    // Create a new Exam
    const exam = new Exam({
      examName,
      class: className,
      examTerm,
      startDate,
      endDate,
      createdBy: userId || null, // Optional user reference
    });

    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Exams
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('createdBy', 'name email role');
    res.status(200).json({ message: 'Exams fetched successfully', exams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Exam
const updateExam = async (req, res) => {
    try {
      const { examId } = req.params;
      const { examName, class: className, examTerm, startDate, endDate } = req.body;
  
      // Find the exam by ID
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
  
      // Update only the fields that are provided in the request body
      if (examName) exam.examName = examName;
      if (className) exam.class = className;
      if (examTerm) exam.examTerm = examTerm;
      if (startDate) exam.startDate = startDate;
      if (endDate) exam.endDate = endDate;
  
      await exam.save();
      res.status(200).json({ message: 'Exam updated successfully', exam });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteExam = async (req, res) => {
    try {
      const { examId } = req.params;
      const userId = req.userId; // Assume userId is attached to the request by middleware
  
      // Check if the user is an admin
      const user = await User.findById(userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      // Find and delete the exam
      const deletedExam = await Exam.findByIdAndDelete(examId);
      if (!deletedExam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
  
      res.status(200).json({ message: 'Exam deleted successfully', exam: deletedExam });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createExam,
    getAllExams,
    updateExam,
    deleteExam,
  };