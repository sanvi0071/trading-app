
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const stockRoutes = require('./routes/stockRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const { fetchRealTimeStockData } = require('./services/api');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());


app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await fetchRealTimeStockData(symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for stock symbol requests from the client
  socket.on('requestStockData', async (symbol) => {
    try {
      console.log(`Fetching real-time data for: ${symbol}`);
      const data = await fetchRealTimeStockData(symbol);
      socket.emit('stockData', data); 
    } catch (error) {
      console.error('Error fetching real-time stock data:', error);
      socket.emit('error', 'Failed to fetch stock data');
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
