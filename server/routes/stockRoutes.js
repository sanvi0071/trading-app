const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to fetch real-time stock data
router.get('/realtime/:symbol', stockController.getRealTimeData);

// Route to fetch historical stock data
router.get('/historical/:symbol', stockController.getHistoricalData);

module.exports = router;




