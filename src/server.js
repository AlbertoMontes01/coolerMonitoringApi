const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const coolerRoutes = require('./routes/coolerRoutes');
const bitacoraRoutes = require("./routes/bitacoraRoute");
const lecturasRoutes = require("./routes/lecturasRoutes");
const movimientosRoutes = require("./routes/movimientosRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/coolers', coolerRoutes);
app.use("/api", bitacoraRoutes);
app.use("/api", lecturasRoutes);
app.use("/api", movimientosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor iniciado en puerto ${PORT}`));
