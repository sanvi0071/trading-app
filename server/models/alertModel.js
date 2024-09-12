const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Alert = sequelize.define('Alert', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stockSymbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thresholdPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  alertType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Alert;
