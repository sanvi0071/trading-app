const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');


router.post('/', portfolioController.addStockToPortfolio);


router.get('/:userId', portfolioController.getPortfolio);


router.put('/:userId', portfolioController.updatePortfolio);


router.delete('/', portfolioController.removeStockFromPortfolio);

module.exports = router;
