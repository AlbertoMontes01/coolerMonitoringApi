const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 🧩 Importación de rutas
const authRoutes = require('./routes/authRoutes');
const coolerRoutes = require('./routes/coolerRoutes');
const bitacoraRoutes = require("./routes/bitacoraRoute");
const lecturasRoutes = require("./routes/lecturasRoutes");
const movimientosRoutes = require("./routes/movimientosRoutes");

// 🚀 Inicialización de Express
const app = express();
app.use(cors());
app.use(express.json());

// 🧭 Rutas principales (agrupadas por prefijo)
app.use('/api/auth', authRoutes);
app.use('/api/coolers', coolerRoutes);
app.use("/api/bitacora", bitacoraRoutes);
app.use("/api/lecturas", lecturasRoutes);
app.use("/api/movimientos", movimientosRoutes);

// 🧱 Puerto y arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor CoolerMonitoring corriendo en puerto ${PORT}`));
