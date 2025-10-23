const movimientosRepo = require("../repositories/movimientosRepository");

const getMovimientosByPallet = async (database, palletId) => {
  return await movimientosRepo.getMovimientosByPallet(database, palletId);
};

const getMovimientosByCamara = async (database, camaraId) => {
  return await movimientosRepo.getMovimientosByCamara(database, camaraId);
};

module.exports = {
  getMovimientosByPallet,
  getMovimientosByCamara,
};
