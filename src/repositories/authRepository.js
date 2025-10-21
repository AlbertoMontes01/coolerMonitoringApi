const { getConnection, sql } = require('../config/db');

exports.findUserByUsername = async (username, database) => {
  const pool = await getConnection(database);
  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query('SELECT * FROM Usuarios WHERE Usuario_Login = @username AND Usuario_Activo = 1');
  return result.recordset[0];
};
