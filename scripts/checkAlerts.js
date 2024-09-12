const { checkAlerts } = require('../server/utils/alertUtils');

setInterval(checkAlerts, 60000); 
