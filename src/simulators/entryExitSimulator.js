// simulators/entryExitSimulator.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Conectado al servidor WebSocket para ENTRADAS/SALIDAS");
  startSimulation();
});

const camaras = ["Camara PRE-ENFRIO 1", "Camara PRE-ENFRIO 2", "Camara CONSERVACION 1", "Camara CONSERVACION 2"];
const responsables = ["yahir.ceballos", "ricardo.huerta", "mauricio.mendoza"];
let palletCounter = 32000;

function startSimulation() {
  setInterval(() => {
    const camara = camaras[Math.floor(Math.random() * camaras.length)];
    const responsable = responsables[Math.floor(Math.random() * responsables.length)];
    const palletId = ++palletCounter;
    const position = Math.floor(Math.random() * 6) + 1; // 🔹 posición 1–30
    const action = Math.random() > 0.5 ? "entry" : "exit";

    const temps = {
      inf: (Math.random() * 4 + 1).toFixed(1),
      med: (Math.random() * 4 + 1).toFixed(1),
      sup: (Math.random() * 4 + 1).toFixed(1),
    };

    if (action === "entry") {
      socket.emit("pallet_entry", {
        palletId,
        camara,
        position,
        temps,
        responsable,
        time: new Date().toISOString(),
      });
      console.log(`🟢 Pallet ${palletId} ENTRA a ${camara} (pos ${position})`, temps);
    } else {
      socket.emit("pallet_exit", {
        palletId,
        camara,
        position,
        temps,
        responsable,
        time: new Date().toISOString(),
      });
      console.log(`🔴 Pallet ${palletId} SALE de ${camara} (pos ${position})`, temps);
    }
  }, 6000);
}
