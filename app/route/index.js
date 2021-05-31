const express = require('express');
const auth = require('./auth');
const device = require('./device')
const userDevice = require('./userDevice')

const router = express.Router();

router.use('/auth', auth);
router.use('/device', device);
router.use('/user/device', userDevice);

module.exports = router;