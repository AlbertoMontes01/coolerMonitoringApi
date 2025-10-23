const { getConnection, sql } = require("../config/db");

// 🔹 Lecturas más recientes por cámara
const getTemperaturasByCamara = async (database, camaraId) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .input("camaraId", sql.Int, camaraId)
    .query(`
      SELECT palletId, MAX(horaLectura) AS ultimaLectura,
             AVG(temperaturaInf) AS promInf,
             AVG(temperaturaMed) AS promMed,
             AVG(temperaturaSup) AS promSup
      FROM lecturas_temperatura
      WHERE pallet_in_room = @camaraId
      GROUP BY palletId
    `);
  return result.recordset;
};

// 🔹 Historial de lecturas por pallet
const getTemperaturasByPallet = async (database, palletId) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .input("palletId", sql.Int, palletId)
    .query(`
      SELECT * FROM lecturas_temperatura
      WHERE palletId = @palletId
      ORDER BY horaLectura ASC
    `);
  return result.recordset;
};

module.exports = {
  getTemperaturasByCamara,
  getTemperaturasByPallet,
};
