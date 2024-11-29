const express = require('express');
const { createNotice, getAllNotices } = require('../controllers/noticeController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId
const router = express.Router();

// POST: Create a new notice
router.post('/create', authMiddleware, createNotice);

// GET: Get all notices
router.get('/getNotices', getAllNotices);

module.exports = router;
