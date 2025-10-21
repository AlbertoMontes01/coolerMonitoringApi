const coolerRepository = require('../repositories/coolerRepository');

exports.getCoolersWithCameras = async (database) => {
  const coolers = await coolerRepository.getCoolers(database);
  const cameras = await coolerRepository.getCameras(database);

  // Combinar los resultados
  return coolers.map((cooler) => ({
    ...cooler,
    camaras: cameras.filter((c) => c.fk_cooler_id === cooler.cooler_id),
  }));
};
