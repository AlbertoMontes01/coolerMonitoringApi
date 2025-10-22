const coolerRepository = require('../repositories/coolerRepository');

exports.getCoolersWithCameras = async (database) => {
  // Coolers desde CorporativoH52
  const coolers = await coolerRepository.getCoolers('CorporativoH52');

  // Cámaras desde la base regional actual
  const cameras = await coolerRepository.getCameras(database);

  // Solo coolers que tienen cámaras en esta base
  const filteredCoolers = coolers.filter(cooler =>
    cameras.some(cam => cam.fk_cooler_id === cooler.cooler_id)
  );

  // Combinar resultados
  return filteredCoolers.map(cooler => ({
    ...cooler,
    camaras: cameras.filter(c => c.fk_cooler_id === cooler.cooler_id),
  }));
};

