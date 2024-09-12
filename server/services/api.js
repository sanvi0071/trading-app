const axios = require('axios');


const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'FUVDIFX8X53E9QWM';

 const fetchRealTimeStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY
      }
    });

    const timeSeries = response.data['Time Series (1min)'];
    const dataArray = Object.keys(timeSeries).map(time => ({
      time,
      ...timeSeries[time]
    }));
    
    return dataArray;
  } catch (error) {
    console.error('Error fetching real-time stock data:', error);
    throw error;
  }
};
module.exports = { fetchRealTimeStockData };

 const fetchHistoricalStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw error;
  }
};

module.exports = { fetchHistoricalStockData };
