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
      WITH last_move AS (
        SELECT 
          mp.*,
          ROW_NUMBER() OVER (
            PARTITION BY mp.palletId 
            ORDER BY TRY_CONVERT(datetime, mp.fecha) DESC
          ) AS rn
        FROM movimiento_pallet mp
      ),
      last_bitacora AS (
        SELECT 
          b.*,
          ROW_NUMBER() OVER (
            PARTITION BY b.palletId 
            ORDER BY TRY_CONVERT(datetime, b.horaEntrada) DESC
          ) AS rn
        FROM bitacora_preenfrios b
      )
      SELECT 
        lm.camaraId,
        c.nombre_camara,
        lm.posicion AS position,
        lm.palletId,
        p.Pallet_Cajas AS cajas,
        lm.responsable
      FROM last_move lm
      JOIN camara_cooler c 
        ON c.camara_id = lm.camaraId
      JOIN pallet p 
        ON p.Pallet_Cve = lm.palletId  -- ✅ este es el campo real en tu DB
      LEFT JOIN last_bitacora lb 
        ON lb.palletId = lm.palletId AND lb.rn = 1
      WHERE lm.rn = 1
        AND (lb.horaSalida IS NULL OR lb.palletId IS NULL)
        AND c.fk_cooler_id = @coolerId
      ORDER BY c.nombre_camara, lm.posicion;
    `);

  return result.recordset;
};



module.exports = {
  getMovimientosByPallet,
  getMovimientosByCamara,
  getOcupacionByCooler,
};
