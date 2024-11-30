const Notice = require('../models/noticeModel');
const User = require('../models/userModel'); // Import User for validation if necessary

const createNotice = async (req, res) => {
  try {
    const { noticeId, title, date, description } = req.body;
    const userId = req.userId; // Assume userId is attached to the request by middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Check for unique noticeId
    const isUnique = await Notice.checkUniqueNoticeId(noticeId);
    if (!isUnique) {
      return res.status(400).json({ message: 'Notice ID already exists' });
    }

    // Create a new notice
    const notice = new Notice({
      noticeId,
      title,
      date,
      description,
      createdBy: userId || null, // Add user reference if available
    });

    await notice.save();
    res.status(201).json({ message: 'Notice created successfully', notice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNotices = async (req, res) => {
  try {
    // Fetch all notices and populate the `createdBy` field
    const notices = await Notice.find().populate('createdBy', 'name email role');
    res.status(200).json({ message: 'Notices fetched successfully', notices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateNotice = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const { title, date, description } = req.body;
    const userId = req.userId;

    // Check if the user is an admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find the notice by ID
    const notice = await Notice.findOne({ noticeId });
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Update only the fields that are provided in the request body
    if (title) notice.title = title;
    if (date) notice.date = date;
    if (description) notice.description = description;

    await notice.save();
    res.status(200).json({ message: 'Notice updated successfully', notice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Notice (With Admin Check)
const deleteNotice = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const userId = req.userId;

    // Check if the user is an admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find and delete the notice by ID
    const notice = await Notice.findOneAndDelete({ noticeId });
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice deleted successfully', notice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
};