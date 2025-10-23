const lecturasRepo = require("../repositories/lecturasRepository");

const getTemperaturasByCamara = async (database, camaraId) => {
  return await lecturasRepo.getTemperaturasByCamara(database, camaraId);
};

const getTemperaturasByPallet = async (database, palletId) => {
  return await lecturasRepo.getTemperaturasByPallet(database, palletId);
};

module.exports = {
  getTemperaturasByCamara,
  getTemperaturasByPallet,
};
