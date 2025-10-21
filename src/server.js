const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor iniciado en puerto ${PORT}`));
