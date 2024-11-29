const express = require('express');
const { createExam, getAllExams, updateExam } = require('../controllers/examController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId
const router = express.Router();

// POST: Create a new exam
router.post('/create', authMiddleware, createExam);

// GET: Get all exams
router.get('/getExams', getAllExams);

// PUT: Update an existing exam by examId
router.put('/update/:examId', authMiddleware, updateExam);

module.exports = router;
