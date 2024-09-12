const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  holdings: [
    {
      symbol: { type: String, required: true },
      quantity: { type: Number, required: true },
      purchasePrice: { type: Number, required: true },
      type: { type: String, enum: ['stock', 'option'], required: true },
    }
  ],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
