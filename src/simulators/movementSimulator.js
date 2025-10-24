// simulators/movementSimulator.js
const { io } = require("socket.io-client");


const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Conectado al servidor WebSocket para MOVIMIENTOS");
  startMovementSimulation();
});

const camaras = [
  "Camara PRE-ENFRIO 1",
  "Camara PRE-ENFRIO 2",
  "Camara CONSERVACION 1",
  "Camara CONSERVACION 2",
  "Camara CONSERVACION 3",
];
const pallets = [32685, 32686, 32687, 32688, 32689];

function startMovementSimulation() {
  setInterval(() => {
    const palletId = pallets[Math.floor(Math.random() * pallets.length)];
    const from = camaras[Math.floor(Math.random() * camaras.length)];
    let to = camaras[Math.floor(Math.random() * camaras.length)];
    while (to === from) to = camaras[Math.floor(Math.random() * camaras.length)];

    const pos = Math.floor(Math.random() * 24) + 1;
    socket.emit("pallet_move", {
      palletId,
      from,
      to,
      newPosition: pos,
      time: new Date().toISOString(),
    });
    console.log(`🚚 Movimiento -> Pallet ${palletId} de ${from} a ${to} (pos ${pos})`);
  }, 8000); // cada 8 segundos
}
