const movimientosService = require("../services/movimientosService");

exports.getMovimientosByPallet = async (req, res) => {
  const { database } = req.query;
  const { palletId } = req.params;
  try {
    const data = await movimientosService.getMovimientosByPallet(database, palletId);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error getMovimientosByPallet:", err);
    res.status(500).json({ message: "Error al obtener movimientos del pallet" });
  }
};

exports.getMovimientosByCamara = async (req, res) => {
  const { database } = req.query;
  const { camaraId } = req.params;
  try {
    const data = await movimientosService.getMovimientosByCamara(database, camaraId);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error getMovimientosByCamara:", err);
    res.status(500).json({ message: "Error al obtener movimientos de cámara" });
  }
};
