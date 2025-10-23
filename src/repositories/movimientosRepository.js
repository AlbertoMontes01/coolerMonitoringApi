const { getConnection, sql } = require("../config/db");

// 🔹 Movimientos por pallet
const getMovimientosByPallet = async (database, palletId) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .input("palletId", sql.Int, palletId)
    .query(`
      SELECT * FROM movimiento_pallet
      WHERE palletId = @palletId
      ORDER BY fecha DESC
    `);
  return result.recordset;
};

// 🔹 Últimos movimientos por cámara (opcional)
const getMovimientosByCamara = async (database, camaraId) => {
  const pool = await getConnection(database);
  const result = await pool
    .request()
    .input("camaraId", sql.VarChar, camaraId)
    .query(`
      SELECT * FROM movimiento_pallet
      WHERE camaraId = @camaraId
      ORDER BY fecha DESC
    `);
  return result.recordset;
};

module.exports = {
  getMovimientosByPallet,
  getMovimientosByCamara,
};
