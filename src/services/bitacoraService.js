const bitacoraRepo = require("../repositories/bitacoraRepository");

const getCamarasActivas = async (database) => {
  return await bitacoraRepo.getCamarasActivas(database);
};

const getPalletsByCamara = async (database, camaraId) => {
  return await bitacoraRepo.getPalletsByCamara(database, camaraId);
};

const getHistorial = async (database) => {
  return await bitacoraRepo.getHistorial(database);
};

module.exports = {
  getCamarasActivas,
  getPalletsByCamara,
  getHistorial,
};
