// simulators/temperatureSimulator.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Conectado al servidor WebSocket para TEMPERATURAS");
  startTemperatureSimulation();
});

const camarasConservacion = ["CONSERVACION 1", "CONSERVACION 2", "CONSERVACION 3"];
const pallets = [32680, 32681, 32682, 32683, 32684, 32685];

function startTemperatureSimulation() {
  setInterval(() => {
    const camara = camarasConservacion[Math.floor(Math.random() * camarasConservacion.length)];
    const palletId = pallets[Math.floor(Math.random() * pallets.length)];

    const temps = {
      inf: (Math.random() * 5 + 1).toFixed(1),
      med: (Math.random() * 5 + 1).toFixed(1),
      sup: (Math.random() * 5 + 1).toFixed(1),
    };

    socket.emit("temperature_update", {
      palletId,
      camara,
      temps,
      time: new Date().toISOString(),
    });

    console.log(`🌡️ Lectura -> Pallet ${palletId} en ${camara}`, temps);
  }, 9000); // cada 9 segundos
}
