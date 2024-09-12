const express = require('express');
const Watchlist = require('../models/watchlistModel');
const router = express.Router();

// Add a stock to the watchlist
router.post('/add', async (req, res) => {
  try {
    const { userId, stockId } = req.body;
    const watchlist = await Watchlist.findOneAndUpdate(
      { userId },
      { $addToSet: { stocks: { stockId } } },
      { new: true, upsert: true }
    );
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a stock from the watchlist
router.post('/remove', async (req, res) => {
  try {
    const { userId, stockId } = req.body;
    const watchlist = await Watchlist.findOneAndUpdate(
      { userId },
      { $pull: { stocks: { stockId } } },
      { new: true }
    );
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the watchlist for a user
router.get('/:userId', async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ userId: req.params.userId }).populate('stocks.stockId');
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
