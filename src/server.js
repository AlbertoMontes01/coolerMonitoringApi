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
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`🟢 Cliente conectado: ${socket.id}`);

  // 🧩 Cada cliente indica su cooler al conectar
  socket.on("join_cooler", (coolerId) => {
    socket.join(`cooler_${coolerId}`);
    console.log(`👤 Cliente ${socket.id} unido a room cooler_${coolerId}`);
  });

  // 📦 Pallet actualizado (solo para ese cooler)
  socket.on("update_pallet", (data) => {
    console.log("📦 Evento recibido:", data);
    const room = `cooler_${data.coolerId || "default"}`;
    socket.to(room).emit("pallet_update", data);
  });

  socket.on("update_temperature", (data) => {
    console.log("🌡️ Evento recibido:", data);
    const room = `cooler_${data.coolerId || "default"}`;
    socket.to(room).emit("temperature_update", data);
  });

  socket.on("pallet_moved", (data) => {
    console.log("🚚 Movimiento:", data);
    const room = `cooler_${data.coolerId || "default"}`;
    socket.to(room).emit("pallet_position_update", data);
  });

  socket.on("pallet_exit", (data) => {
    console.log("🔴 Pallet salió:", data);
    const room = `cooler_${data.coolerId || "default"}`;
    socket.to(room).emit("pallet_removed", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});



const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("🚀 Servidor CoolerMonitoring + WebSocket corriendo:");
});
