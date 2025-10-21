const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/ping', (req, res) => res.json({ message: 'Servidor funcionando correctamente ✅' }));
router.post('/login', authController.login);

module.exports = router;
