const bitacoraService = require("../services/bitacoraService");

exports.getCamarasActivas = async (req, res) => {
  const { database } = req.query;
  try {
    const result = await bitacoraService.getCamarasActivas(database);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error getCamarasActivas:", error);
    res.status(500).json({ message: "Error al obtener cámaras activas" });
  }
};

exports.getPalletsByCamara = async (req, res) => {
  const { database } = req.query;
  const { camaraId } = req.params;
  try {
    const result = await bitacoraService.getPalletsByCamara(database, camaraId);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error getPalletsByCamara:", error);
    res.status(500).json({ message: "Error al obtener pallets por cámara" });
  }
};

exports.getHistorial = async (req, res) => {
  const { database } = req.query;
  try {
    const result = await bitacoraService.getHistorial(database);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error getHistorial:", error);
    res.status(500).json({ message: "Error al obtener historial de bitácora" });
  }
};
