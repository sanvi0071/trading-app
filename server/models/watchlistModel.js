const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stocks: [
    {
      stockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
      addedAt: { type: Date, default: Date.now }
    }
  ]
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
