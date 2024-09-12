const { getStockPrice } = require('../services/stockService');
const { sendEmailNotification } = require('../services/notificationService');

const checkAlerts = async () => {
  try {
    const alerts = await Alert.findAll();
    for (const alert of alerts) {
      const stockPrice = await getStockPrice(alert.stockSymbol);
      if (stockPrice >= alert.thresholdPrice) {
        if (alert.alertType === 'email') {
          const user = await User.findByPk(alert.userId);
          sendEmailNotification(user.email, 'Price Alert', `The price of ${alert.stockSymbol} has reached ${stockPrice}`);
        } else if (alert.alertType === 'in-app') {
          await Notification.create({ userId: alert.userId, message: `The price of ${alert.stockSymbol} has reached ${stockPrice}` });
        }
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};

module.exports = { checkAlerts };
