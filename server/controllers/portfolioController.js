const Portfolio = require('../models/Portfolio');


exports.addStockToPortfolio = async (req, res) => {
  const { userId, symbol, quantity, purchasePrice, type } = req.body;
  try {
   
    let portfolio = await Portfolio.findOne({ userId });

    // Create a new portfolio if one doesn't exist
    if (!portfolio) {
      portfolio = new Portfolio({ userId, holdings: [] });
    }

    // Add the new stock/option to holdings
    portfolio.holdings.push({ symbol, quantity, purchasePrice, type });
    await portfolio.save();

  
    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error adding stock to portfolio:', error);
    res.status(500).json({ message: error.message });
  }
};

// Retrieve user's portfolio
exports.getPortfolio = async (req, res) => {
  try {
    // Find portfolio by userId
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });

 
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.updatePortfolio = async (req, res) => {
  const { userId, symbol, quantity, purchasePrice, type } = req.body;
  try {
    // Find the user's portfolio
    const portfolio = await Portfolio.findOne({ userId });

    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Find the index of the stock/option to update
    const holdingIndex = portfolio.holdings.findIndex(
      (holding) => holding.symbol === symbol && holding.type === type
    );

    // If the holding does not exist, return an error
    if (holdingIndex === -1) {
      return res.status(404).json({ message: 'Holding not found' });
    }

    // Update the specific stock/option details
    portfolio.holdings[holdingIndex] = {
      symbol,
      quantity,
      purchasePrice,
      type,
    };

    await portfolio.save();


    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.removeStockFromPortfolio = async (req, res) => {
  const { userId, symbol, type } = req.body;
  try {
    // Find the user's portfolio
    const portfolio = await Portfolio.findOne({ userId });

   
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    
    portfolio.holdings = portfolio.holdings.filter(
      (holding) => !(holding.symbol === symbol && holding.type === type)
    );

    await portfolio.save();

    
    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error removing stock from portfolio:', error);
    res.status(500).json({ message: error.message });
  }
};
