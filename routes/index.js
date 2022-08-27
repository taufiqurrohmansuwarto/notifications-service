const express = require('express');
const router = express.Router();

router.use('/notifications', require('./notifications.route'));
router.use('/events', require('./events.route'))

module.exports = router;