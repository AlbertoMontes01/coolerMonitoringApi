const lecturasService = require("../services/lecturasService");

exports.getTemperaturasByCamara = async (req, res) => {
  const { database } = req.query;
  const { camaraId } = req.params;
  try {
    const data = await lecturasService.getTemperaturasByCamara(database, camaraId);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error getTemperaturasByCamara:", err);
    res.status(500).json({ message: "Error al obtener temperaturas por cámara" });
  }
};

exports.getTemperaturasByPallet = async (req, res) => {
  const { database } = req.query;
  const { palletId } = req.params;
  try {
    const data = await lecturasService.getTemperaturasByPallet(database, palletId);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error getTemperaturasByPallet:", err);
    res.status(500).json({ message: "Error al obtener lecturas por pallet" });
  }
};
