module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Emit stock data updates
    setInterval(() => {
     
      const stockData = { symbol: 'AAPL', price: Math.random() * 150 };
      socket.emit('stockData', stockData);
    }, 5000);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
