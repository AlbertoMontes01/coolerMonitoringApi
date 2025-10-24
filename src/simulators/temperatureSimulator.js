const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Conectado al servidor WebSocket para TEMPERATURAS");
  startTemperatureSimulation();
});

const camarasConservacion = ["Camara CONSERVACION 1", "Camara CONSERVACION 2", "Camara CONSERVACION 3"];
const pallets = [32680, 32681, 32682, 32683, 32684, 32685];

function startTemperatureSimulation() {
  setInterval(() => {
    const camara = camarasConservacion[Math.floor(Math.random() * camarasConservacion.length)];
    const palletId = pallets[Math.floor(Math.random() * pallets.length)];
    const position = Math.floor(Math.random() * 9) + 1; // 🔹 agrega posición 1–9 o según la cámara

    const temps = {
      inf: (Math.random() * 5 + 1).toFixed(1),
      med: (Math.random() * 5 + 1).toFixed(1),
      sup: (Math.random() * 5 + 1).toFixed(1),
    };

    socket.emit("temperature_update", {
      palletId,
      camara,
      position, // ✅ agregado
      temps,
      time: new Date().toISOString(),
    });

    console.log(`🌡️ Lectura -> Pallet ${palletId} en ${camara} (pos ${position})`, temps);
  }, 2000);
}
