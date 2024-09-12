const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: String,
  stockId: String,
  quantity: Number,
  price: Number,
  action: { type: String, enum: ['buy', 'sell'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
