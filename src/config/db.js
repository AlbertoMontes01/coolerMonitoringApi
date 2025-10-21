const sql = require('mssql');
require('dotenv').config();

const baseConfig = {
  user: process.env.DB_USER || 'sistema-soi',
  password: process.env.DB_PASSWORD || 'S1s73m4.#%!!S01_T102245236',
  server: process.env.DB_SERVER || 'corporativo.h52.mx',
  options: { encrypt: false, trustServerCertificate: true },
};

async function getConnection(databaseName = process.env.DB_DATABASE) {
  const config = { ...baseConfig, database: databaseName };
  const pool = new sql.ConnectionPool(config);
  await pool.connect();
  console.log(`✅ Conectado a la base de datos: ${databaseName}`);
  return pool;
}

module.exports = { getConnection, sql };
