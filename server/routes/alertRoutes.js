const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alertsController');

router.post('/set', alertsController.createAlert);
router.get('/:userId', alertsController.getAlerts);

module.exports = router;
