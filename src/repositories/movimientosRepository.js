const { getConnection, sql } = require("../config/db");

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

const getOcupacionByCooler = async (database, coolerId) => {
  const pool = await getConnection(database);

  const result = await pool
    .request()
    .input("coolerId", sql.VarChar, coolerId)
    .query(`
      SELECT 
        mp.camaraId,
        c.nombre_camara,
        mp.posicion AS position,
        mp.palletId,
        p.productoAbre AS producto,
        p.cajas AS cajas
      FROM movimiento_pallet mp
      INNER JOIN camara c ON c.camara_id = mp.camaraId
      INNER JOIN pallet p ON p.id = mp.palletId
      WHERE c.cooler_id = @coolerId
      AND mp.id IN (
        SELECT MAX(id)
        FROM movimiento_pallet
        GROUP BY palletId
      )
      ORDER BY c.nombre_camara, mp.posicion
    `);

  return result.recordset;
};

module.exports = {
  getMovimientosByPallet,
  getMovimientosByCamara,
  getOcupacionByCooler,
};
