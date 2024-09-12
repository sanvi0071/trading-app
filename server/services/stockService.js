const axios = require('axios');

exports.fetchHistoricalData = async (symbol) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const response = await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: apiKey
    }
  });
  return response.data['Time Series (Daily)'];
};
