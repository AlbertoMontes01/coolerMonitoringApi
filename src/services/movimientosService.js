const movimientosRepo = require("../repositories/movimientosRepository");

const getMovimientosByPallet = async (database, palletId) => {
  return await movimientosRepo.getMovimientosByPallet(database, palletId);
};

const getMovimientosByCamara = async (database, camaraId) => {
  return await movimientosRepo.getMovimientosByCamara(database, camaraId);
};

const getOcupacionByCooler = async (database, coolerId) => {
  const registros = await movimientosRepo.getOcupacionByCooler(database, coolerId);

  const agrupado = registros.reduce((acc, item) => {
    const camara = acc.find((c) => c.camara_id === item.camaraId);
    const entry = {
      position: item.position,
      palletId: item.palletId,
      producto: item.producto,
      cajas: item.cajas,
    };

    if (camara) {
      camara.ocupacion.push(entry);
    } else {
      acc.push({
        camara_id: item.camaraId,
        nombre_camara: item.nombre_camara,
        ocupacion: [entry],
      });
    }

    return acc;
  }, []);

  return agrupado;
};

module.exports = {
  getMovimientosByPallet,
  getMovimientosByCamara,
  getOcupacionByCooler
};
