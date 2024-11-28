const express = require('express');
const { createTeacherWithUser, getAllTeachers } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware
const router = express.Router();

// POST: Create a new teacher
router.post('/create',authMiddleware, createTeacherWithUser);

// GET: Get all teachers
router.get('/getTeachers', getAllTeachers);

module.exports = router;
