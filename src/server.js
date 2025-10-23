const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const coolerRoutes = require("./routes/coolerRoutes");
const bitacoraRoutes = require("./routes/bitacoraRoute");
const lecturasRoutes = require("./routes/lecturasRoutes");
const movimientosRoutes = require("./routes/movimientosRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/coolers", coolerRoutes);
app.use("/api/bitacora", bitacoraRoutes);
app.use("/api/lecturas", lecturasRoutes);
app.use("/api/movimientos", movimientosRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});


io.on("connection", (socket) => {
  console.log(`🟢 Cliente conectado: ${socket.id}`);

  socket.on("update_pallet", (data) => {
    console.log("📦 Evento recibido de MOBILE (update_pallet):", data);
    socket.broadcast.emit("pallet_update", data);
  });

  socket.on("update_temperature", (data) => {
    console.log("🌡️ Evento recibido de MOBILE (update_temperature):", data);
    socket.broadcast.emit("temperature_update", data);
  });

  socket.on("pallet_moved", (data) => {
    console.log("🚚 Pallet movido:", data);
    socket.broadcast.emit("pallet_position_update", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

app.set("io", io);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`🚀 Servidor CoolerMonitoring + WebSocket corriendo en puerto ${PORT}`)
);
