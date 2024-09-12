const axios = require('axios');

// Access the API key from environment variables
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Function to fetch real-time stock data
const fetchRealTimeStockData = async () => {
  try {
    // Example API call to fetch stock data
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time stock data:', error);
    throw error; 
  }
};

module.exports = { fetchRealTimeStockData };
