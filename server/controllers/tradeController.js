const tradeService = require('../services/tradeService');

exports.buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const result = await tradeService.buyStock(stockId, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const result = await tradeService.sellStock(stockId, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
