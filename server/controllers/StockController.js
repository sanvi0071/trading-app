const { fetchRealTimeStockData } = require('../services/api');
const { fetchHistoricalStockData } = require('../services/api'); 
// Controller function to get real-time stock data
exports.getRealTimeData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await fetchRealTimeStockData(symbol);
    res.json(data);
  } catch (error) {
    console.error('Error fetching real-time stock data:', error);
    res.status(500).json({ error: 'Failed to fetch real-time stock data' });
  }
};

// Controller function to get historical stock data
exports.getHistoricalData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await fetchHistoricalStockData(symbol); 
    res.json(data);
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    res.status(500).json({ error: 'Failed to fetch historical stock data' });
  }
};
