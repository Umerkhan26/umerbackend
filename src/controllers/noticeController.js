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

module.exports = {
  createNotice,
  getAllNotices,
};
