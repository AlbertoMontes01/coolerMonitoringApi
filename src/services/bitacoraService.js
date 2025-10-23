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

const getHistorialByCamara = async (database, camaraId) => {
  return await bitacoraRepo.getPalletsByCamara(database, camaraId);
};

const getHistorialByPallet = async (database, palletId) => {
  return await bitacoraRepo.getHistorialByPallet(database, palletId);
};
module.exports = {
  getCamarasActivas,
  getPalletsByCamara,
  getHistorial,
  getHistorialByCamara,
  getHistorialByPallet,
};
