const express = require('express');
const { createNotice, getAllNotices,updateNotice,deleteNotice } = require('../controllers/noticeController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId
const router = express.Router();

// POST: Create a new notice
router.post('/create', authMiddleware, createNotice);

// GET: Get all notices
router.get('/getNotices', getAllNotices);
router.put('/update/:noticeId', authMiddleware, updateNotice);

// DELETE: Delete a notice (Admin only)
router.delete('/delete/:noticeId', authMiddleware, deleteNotice);
module.exports = router;
