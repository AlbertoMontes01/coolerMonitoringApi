const express = require('express');
const router = express.Router();
const coolerController = require('../controllers/coolerController');

router.post('/list', coolerController.getCoolersAndCameras);

module.exports = router;
