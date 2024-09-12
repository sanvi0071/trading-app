const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const portfolioRoutes = require('./routes/portfolio');
const orderRoutes = require('./routes/orders');
require('dotenv').config(); 


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
