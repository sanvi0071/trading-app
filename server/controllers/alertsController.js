const Alert = require('../models/alertModel');

exports.createAlert = async (req, res) => {
  const { userId, stockSymbol, thresholdPrice, alertType } = req.body;
  try {
    const alert = await Alert.create({ userId, stockSymbol, thresholdPrice, alertType });
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Error creating alert' });
  }
};

exports.getAlerts = async (req, res) => {
  const { userId } = req.params;
  try {
    const alerts = await Alert.findAll({ where: { userId } });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
};
