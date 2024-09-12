const Notification = require('../models/notificationModel');

exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};
