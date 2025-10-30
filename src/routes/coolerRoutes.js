const express = require('express');
const router = express.Router();
const coolerController = require('../controllers/coolerController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/list', authenticateToken, coolerController.getCoolersAndCameras);
router.get('/public', coolerController.getCoolersPublic);

module.exports = router;
