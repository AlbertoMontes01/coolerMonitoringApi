const express = require('express');
const router = express.Router();

// Temporalmente una ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente ✅' });
});

module.exports = router;
