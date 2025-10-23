const { getConnection, sql } = require("../config/db");

// 🔹 Bitácoras activas (sin hora de salida)
const getCamarasActivas = async (database) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .query(`
      SELECT * FROM bitacora_preenfrios 
      WHERE horaSalida IS NULL 
      ORDER BY palletId DESC
    `);
  return result.recordset;
};

// 🔹 Pallets activos por cámara
const getPalletsByCamara = async (database, camaraId) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .input("camaraId", sql.Int, camaraId)
    .query(`
      SELECT * FROM bitacora_preenfrios
      WHERE camara_id = @camaraId AND horaSalida IS NULL
      ORDER BY horaEntrada DESC
    `);
  return result.recordset;
};

// 🔹 Historial completo
const getHistorial = async (database) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .query(`
      SELECT * FROM bitacora_preenfrios
      ORDER BY horaEntrada DESC
    `);
  return result.recordset;
};

module.exports = {
  getCamarasActivas,
  getPalletsByCamara,
  getHistorial,
};
