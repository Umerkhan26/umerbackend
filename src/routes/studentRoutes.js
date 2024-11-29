const express = require('express');
const { createStudentWithUser, getAllStudents } = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware
const router = express.Router();

// POST: Create a new student
router.post('/create', authMiddleware, createStudentWithUser);

// GET: Get all students
router.get('/getStudents', getAllStudents);

module.exports = router;
