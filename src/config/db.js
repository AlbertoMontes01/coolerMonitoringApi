const sql = require('mssql');
require('dotenv').config();

const baseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
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
