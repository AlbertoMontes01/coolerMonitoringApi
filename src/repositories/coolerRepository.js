const { getConnection, sql } = require('../config/db');

exports.getCoolers = async () => {
  const pool = await getConnection('CorporativoH52');
  const result = await pool.request().query('SELECT * FROM cooler');
  return result.recordset;
};

exports.getCameras = async (database) => {
  const pool = await getConnection(database);
  const result = await pool.request().query('SELECT * FROM camara_cooler');
  return result.recordset;
};
